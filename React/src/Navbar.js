import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faBell } from '@fortawesome/free-solid-svg-icons';
import { faHome}  from '@fortawesome/free-solid-svg-icons';
import profile from './assets/images/profile.jpg'
import { faMessage}  from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Navbar = () => {
    let baseURL = 'http://localhost:1000'
    let [pfp,setPfp] = useState('')
    useEffect(()=>{
        async function getUser(){
            axios.defaults.withCredentials = true
            let response = await axios.post(`${baseURL}/getUser`)
            if(response.data.success)
                setPfp(response.data.profilePic)
        }
        getUser()
    },[])
    const logout = async()=>{
        let response = await axios.delete(`${baseURL}/logout`)
        if(response.data.success)
            window.location.href = `/login`
    }
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
        #sc-n{\
            visibility: hidden;\
            text-align: start;\
            padding: 0.7rem 1rem;\
            border:1px solid #DBE0E4;\
            border-radius: 1em;\
            background-color: white;\
        }\
            #s-user-n:focus + #sc-n, #sc-n:focus + #sc-n{\
            visibility: visible;\
        }\
        .search-sug-n{\
            text-align: start;\
            width: 100%;\
            cursor: pointer;\
            padding: 0.2em 0;\
            font-weight: 450;\
            transition:all 200ms;\
            background:none;\
            border:none;\
        }\
        .search-sug-n:hover{\
            color:rgb(26, 243, 30)\
        }\
    "
    }</style>
        <div className="navbar__">
        <noscript auth="{{isAuth}}" id="isAuth"></noscript>
        <div className="navbar__elements">
        <div className="logo_company">
            <a href="/" className="au">

            <h3 style={mystyle}>Otnem</h3>

            </a>
        </div>
        <div className="navbar_links">
            <ul>
            <a href="/" className="au">
                <li id="home">Home</li>
            </a>
            <a href="/construction" className="au">
                <li id="community">Community</li>
            </a>
            <a href="/construction" className="au">
                <li id="fine">Partner</li>
            </a>
            <a href="/construction" className="au">
                <li id="support">Support</li>
            </a>
            
            </ul>
        </div>
        <form action="" className="navbar_Form mx-3 mx-xl-0">
            <div className="Navbar_SearchBar">
            <input
                id="s-user-n"
                type="text"
                placeholder="Search User"
                autoComplete="off"
            />
        <div id="sc-n" style={{position: "absolute",marginTop: "3.5em"}}></div>

            </div>
        </form>

        <div className="navbar_section">
            <a href="/chat" className="au">
            <i className="fa-solid fa-envelope" id="Emails"></i>
            </a>
            
            <a href="/chat" id="chat2" className="au">
            <FontAwesomeIcon style={{fontSize:'25px',color:'#9E9EA7'}} icon={faMessage} />

            </a>
            <a href="/notification" className="au">
            <FontAwesomeIcon  id="bell" style={{fontSize:'25px',color:'#9E9EA7'}} icon={faBell} />

            </a>
            <a href="/search" id="search" className="au">
                <FontAwesomeIcon style={{fontSize:'25px',color:'#9E9EA7'}} icon={faSearch} />
            </a>
            {(pfp !== '')?(<div style={{cursor:'pointer'}} onClick={logout}>
                <FontAwesomeIcon style={{fontSize:'25px',color:'#9E9EA7'}} icon={faArrowRightFromBracket}/>
            </div>):''}
            <div className="profile me-2 me-xl-0">
            <a className="UserImage" href={"/profile"}>
                <img src={(pfp !== '')?pfp:profile} alt="User Profile Image"></img>
            </a>
            </div>
        </div>
        <div className="navbar_Post_Link">
            <a href="/upload" className="au">
            <button className="navbar_Post">
                Upload
            </button>
            </a>
        </div>
        </div>
        </div>
        <div className="navbar_mobile">
    <ul className="items">
        <a href="/feed"  className="au  " >
        <li style={{fontSize:"26px"}}><FontAwesomeIcon id='house' icon={faHome} /></li>
        </a>
        <li style={{fontSize:"26px"}}>
        <a href="/chat" id="chat" className="au"><FontAwesomeIcon icon={faMessage} /></a>
        </li>

    </ul>
    <a href="/upload">
        <button className="btn_createPost" style={{fontSize:"1.2rem"}}>
        Upload
        </button>
    </a>
    <ul className="items">

        <a href="/notifications" id="noti" className="au">
        <li style={{fontSize:"26px"}}>

        <FontAwesomeIcon  icon={faBell} />

        </li>
        </a>
        <a href="/profile" id="profile" className="au">
        <li style={{fontSize:"26px"}}>      <FontAwesomeIcon  icon={faUser} /></li>
        </a>

    </ul>
    </div>

        </div>
    )
}

export default Navbar