import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar.js';

import '../assets/css/all.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeartBroken }  from '@fortawesome/free-solid-svg-icons';
import { faMessage }  from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck }  from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft }  from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useSearchParams } from 'react-router-dom';


import '../assets/css/boostrap.min.css'
import image from '../assets/images/image.jpg'
import profile from '../assets/images/profile.jpg'
import axios from 'axios';

const ViewPage = () => {
    const baseURL = 'http://localhost:1000'
    const loadGif = 'https://i.gifer.com/PG23.gif'
    const history = useNavigate()
    const [post, setPost] = useState({})
    const [searchParams, setSearchParams] = useSearchParams()
    const [commentTxt, setComment] = useState('')
    const [commentArr, setCommentArr] = useState([])
    useEffect(()=>{
        async function getPost(){
            const response = await axios.get(`${baseURL}/postData?postNum=${(searchParams.get('postNum'))?searchParams.get('postNum'):''}&&user=${(searchParams.get('user'))?searchParams.get('user'):''}`)
            if(response.data.success){
                let postData = response.data
                setPost({...postData})
                console.log(post.commentsArray)
                setCommentArr([...postData.commentsArray])
                console.log(postData)
            }
        }
        getPost()
    },[])
    async function comment(postNum,postUser){
        if(commentTxt !== ''){
            let response = await axios.post('/comment',{comment:commentTxt,postNum,postUser})
            if(response.data.middleware)
                window.location.href = response.data.redirect
            const userObj = response.data.userData
            let newPost = post
            newPost.commentsArray.push({user:userObj.userName,content:commentTxt,commentNum:response.data.commentNum,profilePic:userObj.profilePic,own:true})
            console.log(post.commentsQty)
            newPost.commentsQty+=1
            setCommentArr([...newPost.commentsArray])
            setPost({...newPost})
            console.log(post.commentsQty)
        }
    }
    async function deleteComment(postNum,postUser){

    }
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
        <div className="posts_cards">
    <div className="top d-lg-none d-flex">
        <div className="container bg-white">
        <div className="row justify-content-between">
            <div className="col-5" style={{marginLeft:"20px",fontSize:"40px"}}>
                <button onClick={()=> history(-1)}  style={{background: "none",border:"none"}}> <FontAwesomeIcon icon={faArrowLeft} /></button>
                
            </div>
            <div className="col-5" style={{display: "flex",justifyContent: "end",alignItems: "center",fontSize: "25px",fontWeight:"bold",marginRight:"25px"}} >
            View post 
            </div>
        </div>
        </div>
    </div>
    <div className="container-fluid px-0 px-lg-3 " style={{overflow:"hidden",marginTop:"100px"}}>
        <div className="grid_postsx row justify-content-center align-items-center  " style={{gap: "3.5rem"}}>
        <div className="row "style={{gap:"5rem",display:"flex",justifyContent:"end"}}>
        <div className="col-12 col-lg-7 bg-white p-3" style={{background:"#fff", borderLeft: "1.7px solid rgb(224, 224, 224)", borderRight: "1.7px solid rgb(224, 224, 224)"}}>
            {(()=>{
                if(post.fields){
                    return post.fields.map((field,i)=>{
                        return(
                        <div key={i} className="post_boxx px-0 px-lg-3" data-type="art">
                        <h2 style={{fontSize:"25px",fontWeight:"bold"}}>{(field)?field.title:"LOOOOL"}</h2>
                        <br></br>
                        <div className="index_image mt-2" style={{height:"500px"}}>
                            <img src={(field)?field.img:loadGif} style={{objectFit:"cover",borderRadius:"30px",height:"100%"}} alt=""></img>
                        </div>
                        <br></br>
                        <div className="desc">
                            <p style={{fontSize:"25px"}}>{(field)?field.disc:"LOOOOL"}</p>
                        </div>
                    
                        <div className="bottom">
                            <a className="UserDetails" style={{cursor:"pointer"}} href={`/profile?user=${post.postUser}&redirect=true`}>
                            <div className="name_time">
                            </div>
                            </a>
            
                        </div>
                        </div>)
                    })
                }
            })()}
        </div>
            <div className="col-12 col-lg-4  vh-100 xc " style={{background:"#fff", borderBottom: "1.7px solid rgb(224, 224, 224)"}} >
            <div className="row" >
            <div className="col-12" style={{borderTop: "1.7px solid rgb(224, 224, 224)"}}>
                <div className="cardxx p-3">
                    <div className="d-flex flex-row align-items-center">
                        <div className="profile_image d-flex align-items-center justify-content-center rounded-circle overflow-hidden ">
                        <img className="fit_obj" onClick={()=>{window.location.href = `/profile?user=${post.postUser}`}}  src={post.posterProfilePic} style={{height:"50px",width:"50px",cursor:'pointer'}} alt=""></img>
                        </div>
                        <div className="text_protex ms-2">
                        <div className="protex_name d-flex align-items-center gap-1">
                            <a className="mb-0"  style={{fontWeight:"bold"}} href={`/profile?user=${post.postUser}`}>{post.postUser}</a>
                            
                            <i className="fa-solid fa-circle-check verified_user"></i>
                                            
                        </div>
                        <p className="protex_date">{post.date}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="post-info">
            <div>
            <h2></h2>
            <p style={{textAlign:"center"}}>{post.likes} Likes | {post.commentsQty} Comments</p>
            </div>
        </div>
            </div>
            <div className="col-12">
                <div className="cardxx mt-4" style={{ borderTop: "2px solid rgb(224, 224, 224)"}} data-type="art">
                <div className="topx py-2">
                    <h2 style={{textAlign:"center",fontSize:"30px",fontWeight:"bold"}}>Opinions</h2>
                </div>
                    <div className="flex-grow-0 py-3 px-3 ">
                    <div className="inp-f d-flex gap-3">
                        <input name="comment" defaultValue={commentTxt} className="comment_input" id="comment-inp"  style={{width:"100%",padding:"10px",background:"#F0EEF6",borderRadius:"50px"}} rows="1" onKeyUp={(event)=>{
                                if(event.key === 'Enter'){
                                    comment(post.postNum,post.postUser)
                                }
                                setComment(event.target.value)
                            }
                        }
                    placeholder="Enter your Opinions"></input>
                    <button type="submit" className="sub-chat" onClick={()=>{comment(post.postNum,post.postUser)}} > Send</button>
                    </div>
                </div>
                <div className="comments_container" style={{background:"#E3E3E4",padding:"10px",borderRadius:"20px"}}>
                    <div className="comment_c">
                        {(()=>{
                            if(commentArr){
                                return commentArr.map((comment)=>{
                                    if(!comment)
                                        return
                                    return(
                                        <div key={comment.commentNum} className="comment_item">
                                            <div className="d-flex flex-warp align-items-center justify-content-between pe-3r">
                                                <div className="item_d d-flex align-items-center gap-1">
                                                    <div className="img_container">
                                                    <img src={comment.profilePic} style={{height:"50px",width:"50px",borderRadius:"50px"}}></img>
                                                    </div>
                                                <div className='mt-2' style={{position:'relative'}}>
                                                <div className="username_post" style={{fontSize:"20px",fontWeight:"bold"}} onClick={()=>{window.location.href = `/profile?user=${comment.user}`}}>{comment.user}
                                                    </div> 
                                                    <div className="comment_post">
                                                {comment.content}</div>
                                            </div>
                                                </div>
                                            </div>
                                            <div className="items_tools">
                                                <i className="fa-solid fa-trash-can delete_comment_button text-danger me-3" title="Delete Comment"
                                                onClick={()=>{deleteComment(comment.commentNum,comment.user)}}></i>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            else{
                                return(<h1 style={{textAlign:'center'}}>No comments</h1>)
                            }
                        })()}
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