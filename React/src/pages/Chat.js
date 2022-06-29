import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Navbar from '../Navbar';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/boostrap.min.css'
import profile from '../assets/images/profile.jpg'
import { faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import '../assets/css/all.css'
import axios from 'axios';
import { io } from "socket.io-client"

const Chat = () => {
	const baseURL = 'http://localhost:1000'
	const [chatUsers,setChatUsers] = useState([])
	const [chats,setChats] = useState([])
	const [currUserData,setCurrUser] = useState({})
	const [myData, setMyData] = useState({})
	const [msg,addMsg] = useState({})
	const chatContainer = useRef(null)
	useEffect(() => {
		const socket = io(baseURL,{withCredentials: true})
		async function main(){
			axios.defaults.withCredentials = true
			let response = await axios.get(`${baseURL}/chatMem`)
			if(response.data.middleware)
				window.location.href = response.data.redirect
			setChatUsers([...response.data.chats])
			let userRes = await axios.post(`${baseURL}/getUser`)
			setMyData({...userRes.data})
			if(response.data.chats[0]){
				setCurrUser(response.data.chats[0].userData)
				socket.emit('joinRoom',response.data.chats[0].userData.userName)
				let chatResponse = await axios.get(`${baseURL}/chats?packet=1&&user=${response.data.chats[0].userData.userName}`)
				if(chatResponse.data.middleware)
					window.location.href = chatResponse.data.redirect
				setChats([...chatResponse.data.chats])
			}
		}
		socket.on('message',(message)=>{
			message['user'] = message.userName
			addMsg({...message})
		})
		main()
	}, []);
	useEffect(()=>{
		setChats([...chats,msg])
	},[msg])
	useEffect(()=>{
		const socket = io(baseURL,{withCredentials: true})
		socket.emit('joinRoom',currUserData.userName)
	},[currUserData])
	const joinChat = async(user,userData)=>{
		const socket = io(baseURL,{withCredentials: true})
		socket.emit('joinRoom',user)
		let chatResponse = await axios.get(`${baseURL}/chats?packet=1&&user=${user}`)
		if(chatResponse.data.middleware)
		window.location.href = chatResponse.data.redirect
		setCurrUser(userData)
		setChats([...chatResponse.data.chats])
	}
	const sendMsg = async(msg)=>{
		const socket = io(baseURL,{withCredentials: true})
		socket.emit('chatMsg',currUserData.userName,msg)
	}
	return (
	<div>
		<style>{"\
		@media screen and (max-width: 991px)  {\
		.navbar__  {\
			display:none;\
		}\
		body {\
			padding-bottom: 0;\
			padding-top:0px\
		}\
		.content{\
		padding-top:0px\
		}\
		.chat-messages{\
		height:82vh;\
		}\
		#chat-messages{\
			max-height: calc(var(--vh, 1vh) * 100);\
		}\
		#chat{\
			color:#000;\
		}\
		.chats{\
			color: #000;\
			max-height: 90vh;\
		}\
		#back{\
			display: block !important;\
		}\
		.non-chat-c{\
			display: none;\
		}\
	}\
	#chat{\
	color:#23F649\
	}\
	body {\
	padding-bottom:0px;\
	padding-top:0px\
	}\
		#sc{\
			visibility: hidden;\
			text-align: start;\
			padding: 0.7rem 1rem;\
			border:1px solid #DBE0E4;\
			border-radius: 1em;\
			background-color: white;\
		}\
		#s-user:focus + #sc, #sc:focus + #sc{\
			visibility: visible;\
		}\
		.search-sug{\
			text-align: start;\
			width: 100%;\
			cursor: pointer;\
			padding: 0.2em 0;\
			font-weight: 450;\
			transition:all 200ms;\
			background:none;\
			border:none;\
		}\
		.search-sug:hover{\
			color:rgb(26, 243, 30)\
		}\
		.chat-messages{\
			height:64.5vh;\
			display: flex;\
			flex-direction: column;\
			overflow-y: scroll;\
			}\
	"
	}</style>
		<Navbar>

		</Navbar>
		<main className="content "  >
	<div className="container p-0" style={{marginTop:'2px'}}>


		<div className="card">
			<div className="row g-0">
				<div className="col-12 col-lg-5 col-xl-3 border-right">

					<div className="px-4 ">
						<div className="d-flex align-items-center mt-3">
							<div className="flex-grow-1">
							<h1 className="h3 mb-3">Messages</h1>

								<input type="text" className="form-control my-3" placeholder="Search..."></input>
							</div>
						</div>
					</div>
					{(chatUsers[0])?(<h1>Users</h1>):(<h1>No Users</h1>)}
					{
					chatUsers.map(chat=>{
						return(	
						<div key={chat.id} style={{cursor:'pointer'}} onClick={()=>{joinChat(chat.userData.userName,chat.userData)}} className="list-group-item list-group-item-action border-0 ">
							<div className="d-flex align-items-start">
								<img src={chat.userData.profilePic} className="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40"></img>
								<div className="flex-grow-1 ml-3">
									{chat.userData.userName}
									<div className="small text-start font-weight-bold " style={{fontWeight:'bold'}}><span className="fas fa-circle chat-online "></span></div>
								</div>
							</div>
						</div>
						)
					})
					}
				</div>
				<div id='panel' className="col-12 col-lg-7 col-xl-9 d-lg-block d-none">
				<div className="py-2 px-4 border-bottom d-lg-block">
						<a href={`/profile?user=${currUserData.userName}`} className="d-flex align-items-center py-1">
							<div className="position-relative" style={{height:"50px",width:"50px",objectFit:"cover"}}>
							<img src={currUserData.profilePic} className="rounded-circle mr-1" alt="Sharon Lessman" style={{height:"100%",width:"100%"}}></img>
							</div>
							<div className="flex-grow-1 pl-3">
								<strong>{currUserData.userName} </strong>
							</div>
							<div>
								<button className="btn btn-light border btn-lg px-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-horizontal feather-lg"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg></button>
							</div>
						</a>
					</div>
					<div className="position-relative">
						<div className="chat-messages p-4" ref={chatContainer} style={{overflow:"scroll",overflowX:"hidden"}}>
							{(chats[0])?"":<h1>No Chats</h1>}
							{
								chats.map((chat,i)=>{
									return(
									<div key={i} className={(currUserData.userName === chat.user)?"chat-message-left pb-4":"chat-message-right mb-4"}>
										<div style={{display:'inline-flex',flexDirection:'row',cursor:'pointer'}} onClick={()=>{window.location.href = `/profile?user=${(currUserData.userName === chat.user)?chat.user:""}`}}>
										<img src={(currUserData.userName === chat.user)?currUserData.profilePic:myData.profilePic} className="rounded-circle mr-1" alt={(currUserData.userName === chat.user)?chat.user:"You"} width="40" height="40"></img>
										<div className="font-weight-bold mb-1" style={{fontWeight:'bolder',lineHeight:'2em',cursor:'pointer'}}>{(currUserData.userName === chat.user)?chat.user:"You"}</div>
										<div className={(currUserData.userName === chat.user)?"text-muted small text-nowrap mt-2":"text-muted small text-nowrap ml-3"} style={{lineHeight:'2.5em'}}>{(()=>{
											let date = new Date(Number(chat.time))
											return `${(date.getHours() < 12)?date.getHours():date.getHours()-12}:${date.getMinutes()} ${(date.getHours() < 12)?"am":'am'}`
										})()}</div>
										</div>
										<div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
											{chat.msg}
										</div>
									</div>)
								})
							}
						</div>
						<div className="flex-grow-0 py-3 px-4 border-top  w-100"  >
						<div className="input-group gap-3 ">
							<input autoFocus type="text" onKeyUp={(e)=>{
								if(e.key === 'Enter' && e.target.value !== ''){
									sendMsg(e.target.value)
									e.target.value = ''
								}
							}} className="form-control" placeholder="Type your message"></input>
							<button className="">
								<FontAwesomeIcon style={{fontSize:'25px',color:'#7BF992'}} icon={faPaperPlane}/>
							</button>
						</div>
					</div>

					</div>

				
				</div>
			</div>
		</div>
	</div>

	</main>



	</div>
	)
	}

	export default Chat