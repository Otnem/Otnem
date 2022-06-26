import Navbar from '../Navbar.js';
import '../assets/css/all.css'
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeartBroken }  from '@fortawesome/free-solid-svg-icons';
import { faMessage }  from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck }  from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import '../assets/css/boostrap.min.css'
import image from '../assets/images/image.jpg'
import profile from '../assets/images/profile.jpg'

const Feed = () => {
    const baseURL = `http://localhost:1000`
    const [posts,setPosts] = useState([])
    useEffect(async() => {
        axios.defaults.withCredentials = true
        document.title = "Feed | Otnem - Share your project with the world"
        let mainResponse = await axios.get(`${baseURL}/?packet=1`)
        setPosts(mainResponse.data.posts)
        setPosts([{
            postName:'lol',
            user:"lol",
            likes:20,
            comments:['lsdas','lsdas','lsdas','lsdas'],
            verified:false,
            profilePic:profile,
            img:image,
            title:"title test",
            time:'1000'
        },
        {
            postName:'lol',
            user:"Pravith B A",
            likes:80,
            comments:['lsdas','lsdas','lsdas','lsdas','lsdas','lsdas','lsdas','lsdas','lsdas','lsdas','lsdas','lsdas',],
            verified:true,
            profilePic:profile,
            img:image,
            title:"title test",
            time:1000
        }])
    }, []);
    
    const no = {
        marginLeft:"0vw",
        fontSize:"1.5em",
        fontWeight: "bold",
        width:"100%",
        textAlign:"center",
        color:"#757575",
        display:"inline-block",
        padding:"0.5em 1em",
        borderRadius:"0.5em 1em",
        display:(posts[0])?"none":"block"
    }
    const mystyle = {
        paddingTop:'85px'
    };
    const active ={
        background:'#23F649'
    }
    const postStyle = {
        width:"20em",
        height:"24em",
        position:"absolute",
        marginLeft:"0",
        borderRadius:"3em 3em 0 0" ,
        cursor:"pointer",
        zIndex:"2",
    }
    const iconStyle = {
        zIndex:"3"
    }
    return (
    <div style={mystyle}>
        <Navbar>

    </Navbar>
    <style>
    {"\
    #house{\
    color:#23F649\
    }\
    "}
    </style>
    <div class="containerx" >
        <div class="Selector_Links">
        <div class="SC_Item" onclick='location.href = `/?attr=cat&&element=${this.getAttribute("data-type")}`' id="SC_IT" data-type="all" >
            <p >All</p>
        </div>
        <div class="SC_Item" onclick='location.href = `/?attr=cat&&element=${this.getAttribute("data-type")}`' id="SC_IT" data-type="art">
            <p>Art</p>
        </div>
        <div class="SC_Item" onclick='location.href = `/?attr=cat&&element=${this.getAttribute("data-type")}`' id="SC_IT" data-type="tech">
            <p>Tech</p>
        </div>
        <div class="SC_Item" onclick='location.href = `/?attr=cat&&element=${this.getAttribute("data-type")}`' id="SC_IT" data-type="uiux">
            <p>UI/UX</p>
        </div>
        <div class="SC_Item" onclick='location.href = `/?attr=cat&&element=${this.getAttribute("data-type")}`' id="SC_IT" data-type="amvs">
            <p>Amvs</p>
        </div>
        <div class="SC_Item" onclick='location.href = `/?attr=cat&&element=${this.getAttribute("data-type")}`' id="SC_IT" data-type="photoshop">
            <p>Photoshop</p>
        </div>
        <div class="SC_Item" onclick='location.href = `/?attr=cat&&element=${this.getAttribute("data-type")}`' id="SC_IT" data-type="games">
            <p>Games</p>
        </div>
        <div class="SC_Item" onclick='location.href = `/?attr=cat&&element=${this.getAttribute("data-type")}`' id="SC_IT" data-type="other">
            <p>Other</p>
        </div>
        </div>
    </div>
    <div style={no}>
    <h2>Sorry, No Posts Available!</h2>
    </div>
    <div class="posts_cards">
    <div class="container-fluid"   >
    <div class="grid_posts" >
    {posts.map(post=>{
        return(
            <div class="full_post" style={{height:'100%'}}>
            <a style={postStyle} href={`/post?postNum=${post.postName}&&user=${post.user}`}></a>
            <a> <div class="post_box" data-type="art">
                <div class="index_image" >
                    <img src={image} width="100%" height="100%" alt="Image Not Available"></img>
                </div>
                <div class="top">
                    <div class="items">
                    <a style={iconStyle} class="item sned"  href={`/chatRoom?user=${post.user}}&redirect=true`}>  <FontAwesomeIcon  icon={faMessage} /> </a>
                    <div style={iconStyle} class="item star"  id="{{postName}}-id" postNum="{{postName}}" user="{{userName}}" onclick="removeLike('{{user}}','{{postName}}')">
                    <FontAwesomeIcon  icon={faHeart} />
                    </div>
                    {/* <div style={iconStyle} class="item star" id="{{postName}}-id" postNum="{{postName}}" user="{{userName}}" onclick="addLike('{{user}}','{{postName}}')">
                    <FontAwesomeIcon  icon={faHeartBroken} />
                    </div> */}
                    </div>
                </div>
                <div class="bottom">
                <div class="UserDetails" style={{cursor:'pointer'}} onclick="window.location.href = '/profile?user={{userName}}'">
                    <div class="UserImage">
                    <img src={post.profilePic} alt="User Profile Image"></img>
                    </div>
                    <div class="name_time">
                    <div class="name">
                        <h6 style={{width:'auto',height:'1.3em',overflow:'hidden !important',textOverflow:'ellipsis',whiteSpace: 'nowrap' ,textAlign:'end' , marginRight:'0.5em',fontWeight:'bold'}}>{post.user}</h6>
                        <FontAwesomeIcon icon={(post.verified)?faCircleCheck:""} />
                    </div>
                    <h6>{Date.parse(post.time)}</h6>
                    </div>
                </div>
                    <div class="post_name">
                        <h5 style={{width:'4rem',height:'1.3em',overflow:'hidden !important',textOverflow:'ellipsis',whiteSpace: 'nowrap' ,textAlign:'end' , }}> </h5>
                    </div>
                </div>
            </div></a>
            <div class="bottom-post">
            <div>
                <h2></h2>
                <p style={{color:"#9e9ea7",textAlign:'center',fontWeight:'bold'}}> {(post.likes)} Likes | {post.comments.length} Comments </p>
            </div>
            </div>
        </div>
        )
    })}
    </div>
    </div>
    </div>
    </div>
    )
}

export default Feed