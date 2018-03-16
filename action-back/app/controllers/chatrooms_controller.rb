class ChatroomsController < ApplicationController

	def create
		chatroom = Chatroom.create(password: params[:password], name: Faker::Hobbit.location)
		render json: prepare_chatroom(chatroom)
	end

	def index
		render json: Chatroom.all.map { |chatroom| prepare_chatroom(chatroom)  }
	end

	def open
		chatroom = Chatroom.find(params[:chatroom_id])
		if chatroom
			render json: prepare_chatroom(chatroom, true)
		else
			render json: {error: "You dun goofed!"}
		end
	end

	def add_message
		chatroom = Chatroom.find(params[:chatroom_id])
		user = User.find(params[:user_id])



		if chatroom && user
			message = Message.create(chatroom: chatroom, user: user, content: params[:content])

			ChatroomChannel.broadcast_to(chatroom, {
				type: 'ADD_MESSAGE',
				payload: prepare_message(message)
			})

			render json: prepare_message(message)
		else
			render json: {error: "You dun goofed!"}
		end

	end

	def delete_message

		Message.find(params["message_id"]).destroy

		chatroom = Chatroom.find(params["chatroom_id"])

		ChatroomChannel.broadcast_to(chatroom, {
				type: "DELETE_MESSAGE",
				payload: {message_id: params["message_id"]} 
			})
	end

	private 

	def prepare_chatroom(chatroom, with_messages = false)
		chatroom_hash = {
			name: chatroom.name,
			id: chatroom.id
		}
		if with_messages
			chatroom_hash[:messages] = chatroom.messages.map {|message| prepare_message(message)}
		end
		chatroom_hash
		
	end

	def prepare_message(message)
		message_hash = {
			id: message.id,
			content: message.content,
			username: message.user.username
		}
	end
	
end