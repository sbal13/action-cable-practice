import React from 'react'

class ChatroomList extends React.Component {

	render(){
		return this.props.chatrooms.map(chatroom => {
			return (
				<li key={chatroom.id} onClick={()=> this.props.selectRoom(chatroom.id)}>
					{chatroom.name}
				</li>

			)
		})
	}
}

export default ChatroomList