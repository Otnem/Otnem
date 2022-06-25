	import video from '../assets/videos/video.mp4';
	import '../assets/css/main.css'
	import { Link } from "react-router-dom";
	import React, { useState, useEffect } from 'react';
	import axios from 'axios'


const Login = () => {
	const [email,setEmail] = useState('')
	const [password,setPassword] = useState('')
	let baseURL = "http://localhost:1000"
	useEffect(() => {
	document.title = "Login | Otnem - Share your project with the world"
	}, []);
	useEffect(()=>{
		if(email != '' && password != '')
			document.querySelector('#loginFunCode').ariaDisabled = false
		else
			document.querySelector('#loginFunCode').ariaDisabled = true
		console.log(email,password)
	},[email,password])
	const login = async(e)=>{
		e.preventDefault()
		let { data } = await axios.post(`${baseURL}/login`,{email,password})
		console.log(data)
	}
	const top ={
	marginTop:"4rem"
	};

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
	fontSize: "0.875rem",
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
			<p>Share your work with the wolrd and get paid. </p>

		</section>
		</div>
		<div className='right mt-lg-5' style={top}>
			<form>

				<section className='copy'>
				<h2 className="text-2xl  " style={{fontWeight:"bold"}}>Sign in</h2>
			
			</section>
			<div className="input-container email">
				<label for="email" >Email</label>
				<input id="email" style={mystyle} onChange={e=>setEmail(e.target.value)} placeholder="Enter your email" required  className="login_signup_textfield" name="email"  type="email"></input>
			</div>
			<div className="input-container password">
				<label for="password">Password</label>
				<input id="password" style={mystyle} onChange={e=>setPassword(e.target.value)} placeholder="Must be at least 6 characters" required  className="login_signup_textfield" name="password"  type="password"></input>
			</div>
			<div className="input-container cta">
			
			</div>
			<div className="login-container">
				<p>Be a part of our family | <a href="/register" className="text-decoration-none"> <strong>Sign up</strong></a>
				</p>
				</div>
				<button onClick={login} className="signup-btn bg-priamry mt-3" name="submit" id="loginFunCode">
					Sign In
				</button>
				<p className="mt-1 w-full text-right"><a href="forgot-password.html" className='mt-1 d-block text-right'>Forgot Password?</a></p>
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