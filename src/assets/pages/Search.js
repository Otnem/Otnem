import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Navbar from '../Navbar';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Search = () => {

  return (
    
   <div>
       
   <style>{"\
     .navbar__{\
       display:none \
     }\
     .top {\
      position: fixed;\
      left: 0;\
      top: 0;\
      width: 100%;\
      display: flex;\
      flex-direction: row;\
      align-items: center;\
      justify-content: center;\
      background: #fff;\
      height: var(--navHight);\
      z-index: 120;\
      border-bottom: 1px solid rgb(224, 224, 224);\
      }\
   "
  }</style>
       <div class="top d-lg-none d-flex">
 <div class="container bg-white">
 <div class="row justify-content-between">
     <div class="col-5" style={{marginLeft:"20px",fontSize:"40px "}}>
       <a href='/feed'>
       <button onclick="history.back()" style={{background:'none',border:'none'}}>  <FontAwesomeIcon style={{fontSize:'30px',color:'#000'}} icon={faArrowLeft} />
      </button>
       </a>
     </div>
     <div class="col-5" style={{display:'flex' ,justifyContent:'end',alignItems:'center',fontSize:'25px',fontWeight:'bold',marginRight:'25px'}} >
      Search
     </div>
 </div>
 </div>
 </div>
      <Navbar/>
      <div className='d-flex content-center	justify-center ' style={{marginTop:'6rem'}}>
      <h1 style={{fontSize:"25px",fontWeight:'bold'}}>Explore our best creator's</h1>
    
      </div>
      <form action="" class="navbar_Form mx-3 mx-xl-0">
   
     <div class="Navbar_SearchBar">
       <input
         id="s-user-n"
         style={{fontSize:'0.9rem',borderRadius:'30px',color:'#757575',backgroundColor:'#f0eef6',height:'46px',padding:'1.2rem',fontWeight:'500',outline:'none',width:'100%'}}
         type="text"
         placeholder="Search User"
         className='mt-3'
         onkeypress=""
         autocomplete="off"
       />
       <div id="sc-n" ></div>

     </div>
   </form>
 </div>
  )
}

export default Search