import React, { useState, useEffect, useRef } from 'react';
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
import axios from 'axios';

const Upload = () => {
    const baseURL = 'http://localhost:1000'
    const [fileInp,setFileInp] = useState([])
    const [title,setTitle] = useState([])
    const [disc,setDisc] = useState([])
    const [category,setCat] = useState('')
    const [tags,setTags] = useState('')
    const [fields,setFields] = useState(0)
    const [isPost,setIsPost] = useState(true)
    const contRef = useRef(null)
    const history = useNavigate()
    useEffect(()=>{
		contRef.current.scrollTo({
			top: contRef.current.scrollHeight
	})
	},[fields])
    useEffect(() => {
        (fields+1 === title.length && title.length === fileInp.length && !title.some(t=>(t.length < 5 || t.length > 50)) && !fileInp.some(f=>f === undefined))?setIsPost(false):setIsPost(true)
    }, [fields,title,fileInp]);
    const post = async()=>{
        const data = new FormData()
        title.forEach((title,i)=>{data.append(`title-${i+1}`,title)})
        fileInp.forEach((file,i)=>{data.append(`upload_file`,file)})
        data.append('upload_files',fileInp)
        disc.forEach((disc,i)=>{data.append(`disc-${i+1}`,disc)})
        data.append('category',category)
        data.append('tags',tags)
        let response = await axios.post(`${baseURL}/upload`,data)
        if(response.data.middleware)
            return window.location.href = response.data.redirect
        if(!response.data.success)
            return alert(response.data.msg)
        if(response.data.success)
            return window.location.href = `/post?postNum=${response.data.num}&&user=${response.data.user}`
    }
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
    <div className="top d-lg-none d-flex">
    <div className="container bg-white">
    <div className="row justify-content-between">
        <div className="col-5" style={{marginLeft:"20px",fontSize:"40px"}}>
            <button onClick={()=> history(-1)}  style={{background: "none",border:"none"}}> <FontAwesomeIcon icon={faArrowLeft}/></button>
        </div>
        <div className="col-5" style={{display: "flex",justifyContent: "end",alignItems: "center",fontSize: "25px",fontWeight:"bold",marginRight:"25px",textAlign:'end'}} >
        <h2>Upload Project</h2>
        </div>
    </div>
    </div>
    </div>
    <div className="container-fluid field-c p-lg-5 p-0 mt-lg-4 "  >
    <div ref={contRef} className=" bor field field-1 bg-white gap-5 g-0"  style={{justifyContent:'center',alginItems:'center',flexDirection:'column'}} >
    <div className="col-md-12 col-xs-12">
        <div className="row " style={{rowGap: "2rem"}} >
            <div className="col-12 col-lg-6 col-xl-6">      
            <input onChange={(e)=>{setFileInp(()=>{
                fileInp[0] = e.target.files[0]
                return fileInp
            })}} type="file" name="file-1" id="" className="inp-file file-1" ></input>
        <div className="content content-1"  style={{paddingTop:'0px'}}>
            <h2 style={{fontSize:"25px"}}>Title</h2>

            <input onChange={(e)=>{
                let newTitle = title
                newTitle[0] = e.target.value
                setTitle([...newTitle])
            }} type="text" name="title-1" id="" placeholder="Please Enter your project title " className="inp-title title-1" style={{marginTop:"10px"}}></input>

                <div className="d-flex gap-3 mt-3">
                    <input type="text" onChange={(e)=>{setTags(e.target.value)}} name="tags" id="tags" placeholder="Tags"></input>

                        <select onChange={(e)=>{setCat(e.target.value)}} name="cars" id="opts" className="inp-opt title-1cat-inp-post">
                            <option value="all">All</option>
                            <option value="art">Art</option>
                            <option value="uiux">UI/UX</option>
                            <option value="tech">Tech</option>
                            <option value="amvs">Amvs</option>
                            <option value="photoshop">Photoshop</option>
                            <option value="games">Games</option>
                            <option value="other">Other</option>
                        </select>
                </div>
            <h2 style={{fontSize:"25px"}}>Description</h2>
            <textarea onChange={(e)=>{
                let newDisc = disc
                newDisc[0] = e.target.value
                setDisc([...newDisc])}} name="disc-1" id="" cols="30" rows="12" placeholder="Describe your project"  style={{marginTop:"10px"}} className="inp-disc disc-1"></textarea>
        </div>
            </div>
            <div className="col-12 col-lg-6 col-xl-6">
                <div className="display  display-1"style={{height:'7.15em',width:'8.1em'}}><FontAwesomeIcon style={{color:'#23F649'}} icon={faCamera}/></div>
            </div>
            </div>
    </div>
    {(()=>{
        let i
        let arr = []
        for(i = 0;i < fields; i++){
            arr.push(
                <div key={i} className="col-md-12 col-xs-12">
                    <div className="row " style={{rowGap: "2rem"}} >
                        <div className="col-12 col-lg-6 col-xl-6">      
                        <input onChange={(e)=>{setFileInp(()=>{
                            fileInp[i] = e.target.files[0]
                            return fileInp
                        })}} type="file" name="file-1" id="" className="inp-file file-1" ></input>
                    <div className="content content-1"  style={{paddingTop:'0px'}}>
                        <h2 style={{fontSize:"25px"}}>Title</h2>
                        <input onChange={(e)=>{
                            let newTitle = title
                            newTitle[i] = e.target.value
                            setTitle([...newTitle])}} type="text" name="title-1" id="" placeholder="Please Enter your project title " className="inp-title title-1" style={{marginTop:"10px"}}></input>
                        <h2 style={{fontSize:"25px"}}>Description</h2>
                        <textarea onChange={(e)=>{
                            let newDisc = disc
                            newDisc[i] = e.target.value
                            setDisc([...newDisc])}} name="disc-1" id="" cols="30" rows="16" placeholder="Describe your project"  style={{marginTop:"10px"}} className="inp-disc disc-1"></textarea>
                    </div>
                    </div>
                        <div className="col-12 col-lg-6 col-xl-6">
                            <div className="display  display-1" style={{height:'7.15em',width:'8.1em'}}><FontAwesomeIcon style={{color:'#23F649'}} icon={faCamera}/></div>
                        </div>
                    </div>
            </div>
        )
    }
    return arr
    })()}
    </div>
    <div id="btn-c" className='py-2 px-4 '>
        <div className="delete deletex" onClick={()=>{
            if(fileInp[fields])setFileInp((()=>{
                fileInp.pop(fields-1,1)
                return fileInp
            })())
            if(title[fields])setTitle((()=>{
                title.pop(fields-1,1)
                return title
            })())
            if(disc[fields])setDisc((()=>{
                disc.pop(fields-1,1)
                return disc
            })())
            setFields(fields - 1)
        }} style={{display:(fields > 0)?'flex':'none',cursor:"pointer",color:"rgb(255, 255, 255)",background: "rgb(255, 43, 43)",}}><FontAwesomeIcon icon={faTrash}/></div>
        {(fields < 10)?(<button id="add-field "  className="addpost" style={{margin: "0 0 0 0"}} onClick={()=>{
            (fields < 10)?setFields(fields + 1):alert('No more fields available')
        }} ><FontAwesomeIcon icon={faPlus}/></button>):''}
        <button id="post-btn" onClick={post} disabled={isPost} className="btn">Post</button>
    </div>
    </div>

    </div>
)
}

export default Upload