import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeartBroken }  from '@fortawesome/free-solid-svg-icons';
import { faMessage }  from '@fortawesome/free-solid-svg-icons';
import Navbar from '../Navbar';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';

import image from '../assets/images/image.jpg'
import profile from '../assets/images/profile.jpg'
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck }  from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
  const cover = {
    paddingLeft:"0px",
    paddingRight:"0px"
  }
  const no = {
    marginLeft:"0vw",
    fontSize:"1.5em",
    fontWeight: "bold",
    width:"100%",
    textAlign:"center",
    color:"#757575",
    display:"inline-block",
    padding:"0.5em 1em",
    borderRadius:"0.5em 1em"
  }
useEffect(() => {
  document.title = "Feed | Otnem - Share your project with the world"
}, []);
const mystyle = {
  paddingTop:'85px'
  };
  const active ={
    background:'#23F649'
  }
  const post = {
    width:"21.5em",
    height:"24em",
    position:"absolute",
    marginLeft:"0",
    borderRadius:"3em 3em 0 0" ,
    cursor:"pointer",
  }

  return (
    
   <div>
       
   <style>{"\
     @media screen and (max-width: 991px){\
       .navbar__ {\
          display:none\
       }\
     }\
     #profile{\
      color:#23F649\
    }\
   "
   
  }</style>
    
      <Navbar></Navbar>
      <div class="posts_cards mb-5 mt-lg-6 ">
  <div class="container-fluid " >
      <div class="row align-items-center">
        <div class="col-12" style={cover}>
          <div class="cover" >
            <img src={image} />
          </div>
        </div>
        <div className="col-10 col-lg-5 mt--4 " style={{ margin: "-4rem auto 0 auto"}} >
          <div class="user">
            <div class="pd-left">
              <div class="pd-row">
                <img src={profile} class="pd-image" alt="Profile Image" style={{objectFit:"cover",width: "5em",height: "5em",border: "1px solid #DBDBDB"}}></img>
              <div>
                  <div style={{display:"flex",gap:"0.5rem",placeItems:"center",justifyContent:'center',alignItems:'center'}}>
                  <h3 style={{marginBottom:"0",fontSize:'25px',fontWeight:'bold'}}>Eyad Gomaa </h3>
                
                 <FontAwesomeIcon style={{color:" gb(0, 191, 255)", fontSize:"24px"}}icon={faCircleCheck} />
                  </div>
                  <p> 10 Followers | 2k Following</p>
                 
                  <h4 id="bio" className='mt-1' style={{fontWeight:"bold",textAlign:"center"}}>"Hey there im a front-end developer "</h4>
                </div>
              </div>
            </div>
            <div class="pd-right mt-3">
                <a href="./settings">
                  <div class="settings">
                  <FontAwesomeIcon icon={faGear} className="hover:text-white" />
                  </div>
                </a>
          
                <noscript id="userName" name="{{userName}}"></noscript>
                    <div class="followBtn" style={{cursor: "pointer"}} onclick="follow()">
                      <i class="fa-solid fa-user-plus"></i>
                    </div>
               
                    <div class="unFollowBtn" style={{cursor: "pointer"}} onclick="unFollow()">
                      <i class="fa-solid fa-user-slash"></i>
                    </div>
                 
            </div>
          </div>
        </div>
      </div>
      
    </div>
    
  </div>
  <div class="posts_cards">
  <div class="container-fluid"   >
    <div class="grid_posts" >
      
    <div class="full_post" style={{height:'100%'}}>
      <div style={post} onclick="location.href='/postPreview?postNum={{postName}}&&user={{user}}'"></div>
        <div class="post_box" data-type="art">
          <div class="index_image" >
              <img src={image} s width="100%" height="100%" alt="Image Not Available"></img>
          </div>
          <div class="top">
              <div class="items">
                <div class="item sned"  onclick="location.href = `/chatRoom?user={{userName}}&redirect=true`">  <FontAwesomeIcon icon={faMessage} /> </div>
                  <div class="item star"  id="{{postName}}-id" postNum="{{postName}}" user="{{userName}}" onclick="removeLike('{{user}}','{{postName}}')">
                  <FontAwesomeIcon icon={faHeart} />
                  </div>
             
                  <div class="item star" id="{{postName}}-id" postNum="{{postName}}" user="{{userName}}" onclick="addLike('{{user}}','{{postName}}')">
                  <FontAwesomeIcon icon={faHeartBroken} />

                  </div>
               
              </div>
          </div>
          <div class="bottom">
            <div class="UserDetails" style={{cursor:'pointer'}} onclick="window.location.href = '/profile?user={{userName}}'">
              <div class="UserImage">
                <img src={profile} alt="User Profile Image"></img>
              </div>
              <div class="name_time">
                <div class="name">
                  <h6 style={{width:'auto',height:'1.3em',overflow:'hidden !important',textOverflow:'ellipsis',whiteSpace: 'nowrap' ,textAlign:'end' , marginRight:'0.5em',fontWeight:'bold'}}>Eyad Gomaa</h6>
                  <FontAwesomeIcon icon={faCircleCheck} />
                </div>
                <h6>Yesterday , 2022</h6>
              </div>
            </div>
              <div class="post_name">
                    <h5 style={{width:'4rem',height:'1.3em',overflow:'hidden !important',textOverflow:'ellipsis',whiteSpace: 'nowrap' ,textAlign:'end' , }}> </h5>
              </div>
          </div>
        </div>
      <div class="bottom-post">
        <div>
          <h2></h2>
          <p style={{color:"#9e9ea7",textAlign:'center',fontWeight:'bold'}}> Likes | Comments </p>
        </div>
      </div>
    </div>
      
    </div>
  </div>
</div>
 </div>
  )
}

export default Profile