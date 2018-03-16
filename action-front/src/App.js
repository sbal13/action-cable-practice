import React, { Component } from 'react';
import ChatroomList from './components/ChatroomList'
import Chatroom from './components/Chatroom'
import './App.css';

class App extends Component {

	state = {
		chatrooms: [],
		openChatroom: null,
		password: ""
	}

	componentDidMount(){
		fetch('http://localhost:3000/chatrooms')
		.then(res => res.json())
		.then(chatrooms => {
			this.setState({
				chatrooms: chatrooms
			})
		})
	}

	createChatroom = () => {
		fetch(`http://localhost:3000/chatrooms`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				password: this.state.password
			})
		})
		.then(res => res.json())
		.then(chatroom => {
			this.setState({
				password: "",
				chatrooms: [...this.state.chatrooms, chatroom]
			})
		})
	}

	removeMessage = (messageId) => {
		let newMessages = this.state.openChatroom.messages.filter(message => message.id !== messageId)

		let newChatroom = {...this.state.openChatroom}

		newChatroom.messages = newMessages

		this.setState({
			openChatroom: newChatroom
		})

	}

	selectRoom = (chatroomId) => {
		fetch(`http://localhost:3000/chatrooms/${chatroomId}/authorize`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				password: this.state.password
			})
		})
		.then(res => res.json())
		.then(chatroom => {
			this.setState({
				openChatroom: chatroom
			})
		})
	}
	handleChange = (event) => {
		this.setState({
			password: event.target.value
		})
	}

	leaveRoom = () => {
		this.setState({
			openChatroom: null
		})
	}

	addMessage = (message) => {
		let copyChat = {...this.state.openChatroom}
		copyChat.messages.push(message)
		this.setState({
			openChatroom: copyChat
		})
	}



	render() {
		console.log(this.state)
		return (
			<div className="App">
				<input value={this.state.password} placeholder={this.state.password} onChange={this.handleChange}/>
				<button onClick={this.createChatroom} >Create Chatroom</button>
				{this.state.openChatroom ? <Chatroom removeMessage={this.removeMessage} addMessage={this.addMessage} leaveRoom={this.leaveRoom} chatroom={this.state.openChatroom}/> : <ChatroomList chatrooms={this.state.chatrooms} selectRoom={this.selectRoom}/>}
			</div>
		);
	}
}

export default App;
