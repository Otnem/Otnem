import React from 'react'
import Navbar from '../Navbar.js';

import '../assets/css/all.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeartBroken }  from '@fortawesome/free-solid-svg-icons';
import { faMessage }  from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck }  from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft }  from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


import '../assets/css/boostrap.min.css'
import image from '../assets/images/image.jpg'
import profile from '../assets/images/profile.jpg'

const ViewPage = () => {
  const history = useNavigate()

  return (
    <div>
  
     <Navbar>

     </Navbar>
     <style>{"\
     @media screen and (max-width: 991px)  {\
      .navbar__  {\
          display:none;\
      }\
      .navbar_mobile {\
        display: none;\
      }\
      body {\
          padding-bottom: 0;\
          padding-top:0px\
      }\
	  .content{\
        padding-top:0px\
	  }\
  }\
  body {\
    padding-bottom:20px;\
    padding-top:0px\
  }\
  #loading-c{\
    width: 100vw;\
    height:100vh;\
    z-index: 10;\
    display: grid;\
    place-items: center;\
    position: fixed;\
    font-size: 5em;\
    background:#23F649;\
    display:none;\
    transition: all 400ms;\
}\
#loading{\
    text-align: center;\
}\
.field-c  {\
    margin-top: 70px;\
}\
.top {\
position: fixed;\
left: 0;\
top: 0;\
width: 100%;\
display: flex;\
flex-direction: row;\
align-items: center;\
border-bottom: 1px solid rgb(224, 224, 224);\
justify-content: center;\
background: #fff;\
height: var(--navHight);\
z-index: 120;\
}\
.bor {\
    border-radius:0px    \
}\
.navbar_mobile {\
    display: none;\
}\
.field{\
    display:flex;\
    background-color: #fff;\
    padding: 2rem;\
    border-radius:0.1em;\
    gap:1.4rem;\
}\
.bor {\
    border-radius: 1rem;\
    border: none;\
}\
#btn-c{\
    display: flex;\
    justify-content: center;\
    align-items: center;\
    gap: 2rem;\
}\
.btn{\
    display: grid;\
    place-items: center;\
    grid-auto-flow: column;\
    gap:0.4em;\
    padding:0.3em;\
    background-color: transparent;\
    border:0.1em solid #23F649;\
    color:#4cca63;\
    font-weight: bold;\
    font-size:1.5em;\
    border-radius: 0.5em;\
    transition: all 300ms;\
    width:9em;\
}\
   "
  }</style>
     <div class="posts_cards">
<div class="top d-lg-none d-flex">
    <div class="container bg-white">
      <div class="row justify-content-between">
        <div class="col-5" style={{marginLeft:"20px",fontSize:"40px"}}>
            <button onClick={()=> history(-1)}  style={{background: "none",border:"none"}}> <FontAwesomeIcon icon={faArrowLeft} /></button>
            
        </div>
        <div class="col-5" style={{display: "flex",justifyContent: "end",alignItems: "center",fontSize: "25px",fontWeight:"bold",marginRight:"25px"}} >
          View post 
        </div>
      </div>
    </div>
</div>
  <div class="container-fluid px-0 px-lg-3 " style={{overflow:"hidden auto",marginTop:"100px"}}>

    <div class="grid_postsx row justify-content-center align-items-center  " style={{gap: "3.5rem"}}>


      <div class="row "style={{gap:"5rem",display:"flex",justifyContent:"end"}}>

      <div class="col-12 col-lg-7 bg-white p-3" style={{background:"#fff", borderLeft: "1.7px solid rgb(224, 224, 224)", borderRight: "1.7px solid rgb(224, 224, 224)"}}>
        <div class="post_boxx px-0 px-lg-3" data-type="art">

          <h2 style={{fontSize:"25px",fontWeight:"bold"}}>Why im so good at front-end ?</h2>
          <br></br>
          <div class="index_image mt-2" style={{height:"500px"}}>
            <img src={image} style={{objectFit:"cover",borderRadius:"30px",height:"100%"}} alt=""></img>
          </div>
          <br></br>
          <div class="desc">
            <p style={{fontSize:"25px"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

</p>
          </div>
       
          <div class="bottom">
            <div class="UserDetails" style={{cursor:"pointer"}}
              onclick="window.location.href = '/profile?user={{postUser}}'">
              <div class="name_time">
              </div>
            </div>

          </div>
      </div>
        

      </div>
        <div class="col-12 col-lg-4  vh-100 xc " style={{background:"#fff", borderBottom: "1.7px solid rgb(224, 224, 224)"}} >
        <div class="row" >
          <div class="col-12" style={{borderTop: "1.7px solid rgb(224, 224, 224)"}}>
            <div class="cardxx p-3">
                <div class="d-flex flex-row align-items-center">
                    <div class="profile_image d-flex align-items-center justify-content-center rounded-circle overflow-hidden ">
                      <img class="fit_obj"   onclick="window.location.href = '/profile?user={{postUser}}'"  src={profile} style={{height:"50px",width:"50px"}} alt=""></img>
                    </div>
                    <div class="text_protex ms-2">
                      <div class="protex_name d-flex align-items-center gap-1">
                        <h4 class="mb-0"  style={{fontWeight:"bold"}} onclick="window.location.href = '/profile?user={{user}}'">Eyad Gomaa</h4>
                        
                        <i class="fa-solid fa-circle-check verified_user"></i>
                                          
                      </div>
                      <p class="protex_date">Yesterday , 2022</p>
                    </div>
                </div>
            </div>
          </div>
          <div class="col-12">
            <div class="post-info">
        <div>
          <h2></h2>
          <p style={{textAlign:"center"}}>0 Likes | 0 Comments</p>
        </div>
      </div>
          </div>
          <div class="col-12">
            <div class="cardxx mt-4" style={{ borderTop: "2px solid rgb(224, 224, 224)"}} data-type="art">
              <div class="topx py-2">
                <h2 style={{textAlign:"center",fontSize:"30px",fontWeight:"bold"}}>Opinions</h2>
              </div>
                  <div class="flex-grow-0 py-3 px-3 ">
                <div class="inp-f d-flex gap-3">
                    <input name="comment" class="comment_input" id="comment-inp"  style={{width:"100%",padding:"10px",background:"#F0EEF6",borderRadius:"50px"}} rows="1" onkeyup="if(event.key === 'Enter') comment('{{postNum}}','{{postUser}}')"
                  placeholder="Enter your Opinions"></input>
                <button type="submit" class="sub-chat" onclick="comment('{{postNum}}','{{postUser}}')" > Send</button>
                </div>
              </div>
              <div class="comments_container" style={{background:"#E3E3E4",padding:"10px",borderRadius:"20px"}}>
                <div class="comment_c">
                  <div class="comment_item">
                    <div class="d-flex flex-warp align-items-center justify-content-between pe-3r">
                      <div class="item_d d-flex align-items-center gap-1">
                        <div class="img_container">
                          <img src={profile} style={{height:"50px",width:"50px",borderRadius:"50px"}} onclick="window.location.href = '/profile?user={{user}}'"></img>
                        </div>
                       <div className='mt-2' style={{position:'relative'}}>
                       <div class="username_post" style={{fontSize:"20px",fontWeight:"bold"}} onclick="window.location.href = '/profile?user={{user}}'">Eyad Gomaa
                        </div> 
                        <div class="comment_post">
                     Ya you are so fucking amazing in fornt-end bero </div>
                  </div>
                       </div>
                      </div>
                      <div class="items_tools">
                        <i class="fa-solid fa-trash-can delete_comment_button text-danger me-3" title="Delete Comment"
                          onclick="deleteComment('{{commentNum}}','{{user}}')"></i>
                      </div>
                    </div>
                 
                </div>
              </div>
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

export default ViewPage