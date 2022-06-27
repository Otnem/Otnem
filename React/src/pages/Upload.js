import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Navbar from '../Navbar';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/boostrap.min.css'
import profile from '../assets/images/profile.jpg'
import { faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import { faCamera} from '@fortawesome/free-solid-svg-icons';
import { faTrash} from '@fortawesome/free-solid-svg-icons';
import { faPlus} from '@fortawesome/free-solid-svg-icons';


import '../assets/css/all.css'

const Upload = () => {
    const history = useNavigate()
    useEffect(() => {
        
    }, []);
    
return (
    <div>
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
@media screen and (max-width: 991px)  {\
.navbar__  {\
display:none;\
}\
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
.deletex{\
    display: grid;\
    place-items: center;\
    grid-auto-flow: column;\
    gap:0.4em;\
    padding:1.2em;\
    background-color: transparent;\
    color:#4cca63;\
    font-weight: bold;\
    font-size:1.5em;\
    border-radius: 1.2em;\
    transition: all 300ms;\
}\
.addpost{\
    display: grid;\
    place-items: center;\
    grid-auto-flow: column;\
    gap:0.4em;\
    padding:1.2em;\
    background-color: #23F649;\
    color:#fff;\
    font-weight: bold;\
    font-size:1.5em;\
    border-radius: 1.2em;\
    transition: all 300ms;\
}\
.btn:disabled{\
    background-color: transparent;\
    cursor: not-allowed;\
    border-color: black;\
    padding:1rem;\
    border-radius: 0.5em;\
    color: black;\
    font-style: oblique;\
}\
.btn:hover{\
    background-color: #23F649;\
    color:white;\
}\
.btn:active{\
    background-color: #1fe243;\
    border-color:#1fe243;\
    color:white;\
}\
h2{\
    font-weight: bolder;\
}\
.content{\
    display:flex;\
    flex-direction: column;\
    width: 100%;\
}\
.inp-title,#tags{\
    padding:1rem;\
    border-radius: 0.5em;\
    border: 1.5px solid rgba(22, 24, 35, 0.12);\
    font-size:1.2rem; \
    margin-bottom: 0.5rem;\
    font-weight: bold;\
}\
.inp-disc{\
    padding:1rem;\
    resize:none;\
    border: 1.5px solid rgba(22, 24, 35, 0.12);\
    color: #757575;\
    border-radius: 0.5em;\
    font-weight: bold;\
}\
.inp-opt{\
    padding:1rem;\
    border-radius: 0.1em;\
    border: 1.5px solid rgba(22, 24, 35, 0.12);\
    margin-bottom: 0.5rem;\
    font-weight: bold;\
}\
.display{\
    width:100%;\
    height:100%;\
    padding: 0.1em;\
    border:2px solid #23F649;\
    border-radius: 0.1em;\
    display: grid;\
    border-style:dashed;\
    place-items: center;\
    cursor:pointer;\
}\
.fa-camera{\
    font-size: 5rem;\
}\
"
}</style>
    <Navbar>

    </Navbar>
    <div class="top d-lg-none d-flex">
    <div class="container bg-white">
    <div class="row justify-content-between">
        <div class="col-5" style={{marginLeft:"20px",fontSize:"40px"}}>
            <button onClick={()=> history(-1)}  style={{background: "none",border:"none"}}> <FontAwesomeIcon icon={faArrowLeft}/></button>
        </div>
        <div class="col-5" style={{display: "flex",justifyContent: "end",alignItems: "center",fontSize: "25px",fontWeight:"bold",marginRight:"25px",textAlign:'end'}} >
        <h2>Upload Project</h2>
        </div>
    </div>
    </div>
    </div>
    <div class="container-fluid field-c p-lg-5 p-0 mt-lg-4 "  >
    <div class=" bor field field-1 bg-white gap-5 g-0"  style={{justifyContent:'center',alginItems:'center'}} >
    <div class="col-md-12 col-xs-12">
        <div class="row " style={{rowGap: "2rem"}} >
            <div class="col-12 col-lg-6 col-xl-6">      
            <input type="file" name="file-1" id="" class="inp-file file-1" style={{display: "none",visibility:" visible",}}></input>
        <div class="content content-1"  style={{paddingTop:'0px'}}>
            <h2 style={{fontSize:"25px"}}>Title</h2>

            <input type="text" name="title-1" id="" placeholder="Please Enter your project title " class="inp-title title-1" style={{marginTop:"10px"}}></input>

                <div class="d-flex gap-3 mt-3">
                    <input type="text" name="tags" id="tags" placeholder="Tags"></input>

                        <select name="cars" id="opts" class="inp-opt title-1cat-inp-post">
                            <option value="volvo">All</option>
                            <option value="volvo">Art</option>
                            <option value="saab">UI/UX</option>
                            <option value="opel">Tech</option>
                            <option value="audi">Amvs</option>
                            <option value="volvo">Photoshop</option>
                            <option value="volvo">Games</option>
                            <option value="volvo">Other</option>
                        </select>
                </div>
            <h2 style={{fontSize:"25px"}}>Description</h2>
            <textarea name="disc-1" id="" cols="30" rows="12" placeholder="Describe your project"  style={{marginTop:"10px"}} class="inp-disc disc-1"></textarea>
        </div>
            </div>
            <div class="col-12 col-lg-6 col-xl-6">
                <div class="display  display-1"><FontAwesomeIcon style={{color:'#23F649'}} icon={faCamera}/></div>
            </div>
            </div>
    </div>
    </div>
    <div id="btn-c" className='py-2 px-4 '>
        <div class="delete deletex" style={{cursor:"pointer",color:"rgb(255, 255, 255)",background: "rgb(255, 43, 43)",}}><FontAwesomeIcon icon={faTrash}/></div>
        <button id="add-field "  class="addpost" style={{margin: "0 0 0 0"}} onclick='createField()'><FontAwesomeIcon icon={faPlus}/></button>
        <button id="post-btn" disabled onclick="post()" class="btn">Post</button>
    </div>
    </div>

    </div>
)
}

export default Upload