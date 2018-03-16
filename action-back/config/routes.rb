Rails.application.routes.draw do
	resources :users
	resources :messages
	resources :chatrooms

	post '/login', to: 'auth#create'
	get '/current_user', to: 'auth#show'

	post '/chatrooms/:chatroom_id/authorize', to: 'chatrooms#open'
	post '/chatrooms/:chatroom_id/add_message', to: 'chatrooms#add_message'
	post '/chatrooms/delete_message', to: 'chatrooms#delete_message'

	mount ActionCable.server => '/cable'
end
