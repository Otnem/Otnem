import video from '../assets/videos/video.mp4';
import '../assets/css/main.css'
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';


const Register = () => {
  const body = {
    background:"#fff"
  };
  const top ={
    marginTop:"2rem"   
  };
  useEffect(() => {
    document.title = "Register | Otnem - Share your project with the world"
 }, []);
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
          <p>Share your work with the wolrd and get paid. </p>

        </section>
        </div>
        <div className='right mt-lg-0 ' style={top}>
          <form action='/login' method='post'>
  
             <section className='copy'>
             <h2 className="text-2xl " style={{fontWeight:'bold'}}>Sign up</h2>
           
           </section>
           <div className="input-container email">
              <label for="name">Name</label>
              <input id="name" style={mystyle}  placeholder="Enter your name  " required  className="login_signup_textfield" name="email"  type="email"></input>
           </div>
           <div className="input-container email">
              <label for="email">Email</label>
              <input id="email" style={mystyle}  placeholder="Enter your email" required  className="login_signup_textfield" name="email"  type="email"></input>
           </div>
           <div className="input-container password">
              <label for="password">Password</label>
              <input id="password" style={mystyle}  placeholder="Must be at least 6 characters" required  className="login_signup_textfield" name="password"  type="password"></input>
           </div>
           <div className="input-container cta">
          
          </div>
          <div className="login-container">
               <p>Already a member ? | <a href="/login" className="text-decoration-none"> <strong>Sign in</strong></a>
             </p>
             </div>
             <button className="signup-btn bg-priamry mt-3" type="submit" name="submit" id="loginFunCode">
                    Sign Up
                </button>
                <p className="mt-1 w-full text-right"><a href="forgot-password.html" className='mt-1 d-block text-right'>Forgot Password?</a></p>
                <section class="copy legal w-full text-center" >
            </section>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register