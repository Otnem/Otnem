import React, { useEffect, useState } from 'react'
import animationData from './error.json';
import '../assets/css/all.css'
import Lottie from 'react-lottie';

import { useNavigate, useSearchParams } from 'react-router-dom';

const construction = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
  return (
    <div >
        <div className='w-100 ' style={{textAlign:'center'}}>
        <Lottie 
	    options={defaultOptions}
        height={400}
        width={400}
      />
      <h2 style={{fontWeight:"bold",fontSize:"30px"}}>Sorry but this page under Construction</h2>
      <a href='/'>
      <button className='btn  mt-6'   style={{backgroundColor:"#23F649",borderRadius:"50px",fontSize:"20px"}}>Go Back</button>

      </a>
        </div>
      
    </div>
  )
}

export default construction