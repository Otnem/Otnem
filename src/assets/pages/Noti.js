import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Navbar from '../Navbar';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/boostrap.min.css'
import profile from '../assets/images/profile.jpg'
import { faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import '../assets/css/all.css'

const Noti = () => {
	
	useEffect(() => {
		
	  }, []);
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
  #noti{\
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
   "
  }</style>
      <Navbar>

      </Navbar>

      <div class="container-fluid">

<div class="posts_cards">
  <div class="container-fluid p-3">
      <h2 style={{fontSize:'30px'}}>Notification</h2>
    <div class="grid_postsx" style={{flexWrap:"wrap",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <div class="card mt-3" onclick="window.location.href='{{link}}'" style={{cursor: "pointer",width:"500px"}}>
            <div class="pd-left">
                <div class="pd gap-3 d-flex">
                    <img src={profile} class="pd-image" style={{height:"50px",width:"50px"}}></img>
                   <div style={{position:"relative"}}>
                   <h2 style={{fontSize:"25px",fontWeight:"bold",right:"0"}}>Troy</h2>
                    <p>Has Started Following you </p>
                   </div>
                    <div>  
                    </div>
                </div>
              </div>
        </div>
  
    </div>
  </div>
</div>
</div>


    </div>
  )
}

export default Noti