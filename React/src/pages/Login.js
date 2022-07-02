	import video from '../assets/videos/video.mp4';
	import '../assets/css/main.css'
	import React, { useState, useEffect } from 'react';
	import axios from 'axios'


const Login = () => {
	const [email,setEmail] = useState('')
	const [password,setPassword] = useState('')
	const [errorMsg,setErrorMsg] = useState('')
	const [subBtnDisable,setSubBtnDisable] = useState(true)	
	let baseURL = "http://localhost:1000"
	
	useEffect(async() => {
		axios.defaults.withCredentials = true
		document.title = "Login | Otnem - Share your project with the world"
		let loginResponse = await axios.get(`${baseURL}/login`)
		if(loginResponse.data.middleware)
			window.location.href = loginResponse.data.redirect
	}, []);
	useEffect(()=>{
		if(email != '' && password != '')
			setSubBtnDisable(false)
		else
			setSubBtnDisable(true)
	},[email,password])
	const login = async(e)=>{
		e.preventDefault()
		let loginResponse = await axios.post(`${baseURL}/login`,{email,password})
		if(loginResponse.data.success)
			return window.history.back()
		else
			setErrorMsg(loginResponse.data.msg)
	}
	const top ={
	marginTop:"5rem"
	};
	const errStyle = {
		fontSize:"1.5em",
		padding:"0.5em 1em",
		background:"red",
		color:"white",
		borderRadius:"0.2em",
		display:(errorMsg !== '')?"block":"none"
	}
	const background = {
	background:"#fff"
	}
	const mystyle = {
	display: "block",
	width: "100%",
	borderRadius: "8px",
	border: "1px solid #c4c4c4",
	padding: "1em",
	marginBottom:"1.25rem" ,
	fontSize: "1.0rem",
	};
	return (
	<div >
		<style>{"\
		body {\
			padding-bottom:0px;\
		}\
	"
	}</style>
		<div className='split-screen'>
		<div className='left'>
			<video id='background-video'  autoPlay loop muted >
				<source src={video}></source>
			</video>
			<section class="copy">
			<h1 className="font-medium text-4xl">Explore Amazing projects</h1>

		</section>
		</div>
		<div className='right mt-lg-5' style={top}>
			<form>
				<div className='err' style={errStyle}>{errorMsg}</div>
				<section className='copy'>
				<h2 className="text-2xl  " style={{fontWeight:"bold"}}>Sign in</h2>
			
			</section>
			<div className="input-container email">
				<label for="email" >Email</label>
				<input autoFocus id="email" style={mystyle} onChange={e=>setEmail(e.target.value)} placeholder="Enter your email" required  className="login_signup_textfield" name="email"  type="email"></input>
			</div>
			<div className="input-container password">
				<label for="password">Password</label>
				<input id="password" style={mystyle} onChange={e=>setPassword(e.target.value)} placeholder="Must be at least 6 characters" required  className="login_signup_textfield" name="password"  type="password"></input>
			</div>
			<div className="input-container cta">
			
			</div>
			<div className="login-container">
				<p style={{fontSize:"1.2rem"}}>Be a part of our family | <a href="/register" className="text-decoration-none"> <strong>Sign up</strong></a>
				</p>
				</div>
				<button onClick={login} disabled={subBtnDisable} className="signup-btn bg-priamry mt-3" name="submit" id="loginFunCode">
					Sign In
				</button>
				<p className="mt-1 w-full text-right"><a href="forgot-password.html" className='mt-1 d-block text-right' style={{fontSize:"1.2rem",fontWeight:"bold"}}>Forgot Password?</a></p>
				<section class="copy legal w-full text-center" >
				<p className="text-center"><span className='small'>By continuing, you agree to accept our <br></br><a href="#" className="color:black">Privacy Policy</a> &amp; <a href="#" className="text-color-black">Terms of Service</a></span></p>
			</section>
			</form>
		</div>
		</div>
	</div>
	)
	}

	export default Login