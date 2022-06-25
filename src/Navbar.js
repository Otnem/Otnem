import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faHome}  from '@fortawesome/free-solid-svg-icons';
import profile from './assets/images/profile.jpg'
import { faMessage}  from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const mystyle = {
      fontSize:"25px"
    };
  return (
    <div>
        <style>{"\
     @media screen and (max-width: 991px){\
       #chat2{\
          display:none\
       }\
       #bell{\
        display:none\
     }\
     }\
   "
  }</style>
      <div class="navbar__">
    <noscript auth="{{isAuth}}" id="isAuth"></noscript>
    <div class="navbar__elements">
      <div class="logo_company">
        <a href="/" class="au">
  
          <h3 style={mystyle}>Otnem</h3>
  
        </a>
      </div>
      <div class="navbar_links">
        <ul>
          <a href="/" class="au">
            <li id="home">Home</li>
          </a>
          <a href="/construction" class="au">
            <li id="community">Community</li>
          </a>
          <a href="/construction" class="au">
            <li id="fine">Partner</li>
          </a>
          <a href="/construction" class="au">
            <li id="support">Support</li>
          </a>
        
        </ul>
      </div>
      <form action="" class="navbar_Form mx-3 mx-xl-0">
        <div class="Navbar_SearchBar">
          <input
            id="s-user-n"
            type="text"
            placeholder="Search User"
            onkeypress=""
            autocomplete="off"
          />
          <div id="sc-n" ></div>
  
        </div>
      </form>
  
      <div class="navbar_section">
        <a href="/chat" class="au">
          <i class="fa-solid fa-envelope" id="Emails"></i>
        </a>
        
        <a href="/chat" id="chat2" class="au">
        <FontAwesomeIcon style={{fontSize:'25px',color:'#9E9EA7'}} icon={faMessage} />

        </a>
        <a href="/notification" class="au">
        <FontAwesomeIcon  id="bell" style={{fontSize:'25px',color:'#9E9EA7'}} icon={faBell} />

        </a>
        <a href="/search" id="search" class="au">

      <FontAwesomeIcon style={{fontSize:'25px',color:'#9E9EA7'}} icon={faSearch} />

    </a>
        
          <i id="logout" class="fa-solid fa-arrow-right-from-bracket" onclick="axios.delete('/logout');location.href = `/login`" 
          ></i>
        <div class="profile me-2 me-xl-0">
          <div class="UserImage" onclick="location.href = '/profile'">
            <a href='/profile'>
            <img src={profile}  alt="User Profile Image"></img>
            </a>
          </div>
        </div>
      </div>
      <div class="navbar_Post_Link">
        <a href="/upload" class="au">
          <button class="navbar_Post">
            Upload
          </button>
        </a>
      </div>
    </div>
    </div>
    <div class="navbar_mobile">
  <ul class="items">
    <a href="/feed"  class="au  " >
      <li style={{fontSize:"26px"}}><FontAwesomeIcon id='house' icon={faHome} /></li>
    </a>
    <li style={{fontSize:"26px"}}>
    <a href="/chat" id="chat" class="au"><FontAwesomeIcon icon={faMessage} /></a>
    </li>

  </ul>
  <a href="/upload">
    <button class="btn_createPost">
      Upload
    </button>
  </a>
  <ul class="items">
 
    <a href="/notifications" id="noti" class="au">
      <li style={{fontSize:"26px"}}>

      <FontAwesomeIcon  icon={faBell} />

      </li>
    </a><a href="/profile" id="profile" class="au">
      <l style={{fontSize:"26px"}}i>      <FontAwesomeIcon  icon={faUser} /></l>
    </a>

  </ul>
  </div>
 
    </div>
  )
}

export default Navbar