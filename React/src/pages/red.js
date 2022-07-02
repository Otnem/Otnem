import React from 'react'
import Lottie from 'react-lottie';
import animationData from './success.json';

const red = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
        return (
    <div className='col-12'>
         <div style={{display:"flex",justifyContent:"center",alignItems:"center"}} >
   
         <div className='green' style={{padding:"19px"}}>
         <Lottie 
	    options={defaultOptions}
        height={400}
        width={400}
      />
          <div className='mt-2' style={{color:'#7BF992',fontWeight:"bold"}}>
          <h2>You have been successfully activated, you can login now Press here to <strong style={{color:"#0d6efd",textDecoration:"underline"}}><a href='/login'>Login now</a></strong></h2>
          </div>
         </div>
    </div>
    </div>
  )
}

export default red