    import video from '../assets/videos/video.mp4';
    import '../assets/css/main.css'
    import { Link } from "react-router-dom";
    import React, { useState, useEffect } from 'react';
    import axios from 'axios';


const Register = () => {
	let baseURL = "http://localhost:1000"
	const [email,setEmail] = useState('')
	const [password,setPassword] = useState('')
	const [name,setName] = useState('')
	const [errorMsg,setErrorMsg] = useState('')
    
	const [subBtnDisable,setSubBtnDisable] = useState(true)
	const register = async(e)=>{
       
		e.preventDefault()
		let registerResponse = await axios.post(`${baseURL}/register`,{name,email,password})
        
		if(registerResponse.data.success === true)
			window.location.href = registerResponse.data.redirect
		else
			setErrorMsg(registerResponse.data.msg)
	}
	useEffect(()=>{
		if(email != '' && password != '' && name != '')
			setSubBtnDisable(false)
		else
			setSubBtnDisable(true)
	},[email,password,name])
    const body = {
    background:"#fff"
    };
    const top ={
    marginTop:"2rem"   
    };
    useEffect(async() => {
        axios.defaults.withCredentials = true
        document.title = "Register | Otnem - Share your project with the world"
        let registerResponse = await axios.get(`${baseURL}/register`)
        if(registerResponse.data.middleware)
            window.location.href = registerResponse.data.redirect
    }, []);
    const mystyle = {
    display: "block",
    width: "100%",
    borderRadius: "8px",
    border: "1px solid #c4c4c4",
    padding: "1em",
    marginBottom:"1.25rem" ,
    fontSize: "1rem",
    };
	const errStyle = {
		fontSize:"1.5em",
		padding:"0.5em 1em",
		background:"red",
		color:"white",
		borderRadius:"0.2em",
		display:(errorMsg !== '')?"block":"none"
	}
    return (
    <div >
        <style>{"\
        body {\
            padding-bottom:0px;\
            overflow:hidden\
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
        <div className='right mt-lg-0 ' style={top}>
            <form>
            <div className='err' style={errStyle}>{errorMsg}</div>
                <section className='copy'>
                <h2 className="text-2xl " style={{fontWeight:'bold'}}>Sign up</h2>
            
            </section>
            <div className="input-container email">
                <label for="name">Name</label>
                <input id="name" style={mystyle} onChange={e=>setName(e.target.value)} placeholder="Enter your name  " required  className="login_signup_textfield" name="name"  type="name"></input>
            </div>
            <div className="input-container email">
                <label for="email">Email</label>
                <input id="email" style={mystyle} onChange={e=>setEmail(e.target.value)} placeholder="Enter your email" required  className="login_signup_textfield" name="email"  type="email"></input>
            </div>
            <div className="input-container password">
                <label for="password">Password</label>
                <input id="password" style={mystyle} onChange={e=>setPassword(e.target.value)} placeholder="Must be at least 6 characters" required  className="login_signup_textfield" name="password"  type="password"></input>
            </div>
            <div className="input-container cta">
            
            </div>
            <div className="login-container">
                <p style={{fontSize:"1.2rem"}}>Already a member ? | <a href="/login" className="text-decoration-none"> <strong>Sign in</strong></a>
                </p>
                </div>
                <button disabled={subBtnDisable} onClick={register} className="signup-btn bg-priamry mt-3" type="submit" name="submit" id="loginFunCode">
                    Sign Up
                </button>
                <p className="mt-1 w-full text-right"><a href="forgot-password.html" className='mt-1 d-block text-right' style={{fontSize:"1.2rem"}}>Forgot Password?</a></p>
                <section class="copy legal w-full text-center" >
            </section>
            </form>
        </div>
        </div>
    </div>
    )
    }

export default Register