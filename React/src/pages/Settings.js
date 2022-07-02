import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeader, faHeart, faUserPlus, faUserSlash } from '@fortawesome/free-solid-svg-icons';
import { faHeartBroken }  from '@fortawesome/free-solid-svg-icons';
import { faMessage }  from '@fortawesome/free-solid-svg-icons';
import Navbar from '../Navbar';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';

import image from '../assets/images/image.jpg'
import profile from '../assets/images/profile.jpg'
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck }  from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';


const Settings = () => {
  return (
    <div>
   <Navbar>

   </Navbar>
   <style>{"\
      label {\
	   font-size:1.0rem;\
       color:#000\
	  }\
    "
    }</style>
<section style={{marginTop:"100px"}}>

		<div class="container">
			<div class="bg-white  rounded-lg d-sm-flex" style={{border:"2px solid #F0EEF6"}}>
				<div class="profile-tab-nav border-right">
					<div class="p-4">
						<div class="img-circle text-center mb-3" style={{display:"flex",justifyContent: "center",alignItems: "center"}}>

							<img src={profile} alt="Image" class="shadow" style={{position: "relative",height:"60px",width:"60px",borderRadius:"50px"}}></img>
                            <div class="pen" style={{cursor: "pointer"}}>
                                <i class="fa-solid fa-pen-to-square" ></i>
                            </div>

						</div>
						<h4 class="text-center"></h4>
					</div>
					<div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
						<div style={{cursor: "pointer" , padding: "0.625rem 6rem"}} class="nav-link active" id="account-tab" data-toggle="pill" role="tab" aria-controls="account" aria-selected="true">
							<h2>Account</h2>
						</div>
							<div style={{cursor: "pointer"}} class="nav-link" id="banner-tab" data-toggle="pill" role="tab" aria-controls="banner" aria-selected="false">
							<i class="fa-solid fa-user mr-1"></i> 
							Banner
						</div>
						<div style={{cursor: "pointer" }} class="nav-link" id="password-tab" data-toggle="pill" role="tab" aria-controls="password" aria-selected="false">
							<i class="fa fa-key text-center mr-1"></i> 
							Password
						</div>
					

					</div>
				</div>
				<div class="tab-content p-4 p-md-5 w-100" id="v-pills-tabContent">
					<div class="tab-pane acc-set fade show active" id="account" role="tabpanel" aria-labelledby="account-tab">
						<h1 class="mb-4  " style={{fontSize:"24px",fontWeight:"bold",color:"#000"}}>Account Settings</h1>
            			<h1 class="err err-pay"></h1>
						<div class="row">
							<div class="col-md-6">
									<div class="form-group">
								<label>Name</label>
								<input type="text" class="form-control inp-paypal" placeholder="Enter your name"></input>
								
								</div>
								<div class="form-group">
								<label>Password</label>
								<input type="text" class="form-control inp-paypal" placeholder="Enter your password"></input>
								
								</div>
							</div>
							<div class="col-md-6">
							
							<div class="form-group">
								<label>Paypal</label>
								<input type="text" class="form-control inp-paypal" placeholder="Enter your paypal"></input>
								
								</div>
								<div class="form-group">
								<label>Bio</label>
								<textarea type="text" class="form-control inp-bio" placeholder="Bio"  style={{resize: "none"}}></textarea>
								</div>
							</div>
						</div>
						<div style={{display: "flex",marginTop:"20px"}}>
							<button class="btn btn-account" style={{backgroundColor: "#000",color:"#fff"}}>Update</button>
							<button onclick="javascript:window.history.back(-1);return false;" class="btn btn-light">Cancel</button>
						</div>
					</div>
					<div class="tab-pane acc-set fade " id="pfp" role="tabpanel" aria-labelledby="account-tab">
						<h3 class="mb-4">Profile Pic Settings</h3>
            			<h1 class="err err-pfp"></h1>
						<div class="row pfp-row" >
							<input type="file" name="pfp" id="pfp-inp" style={{display: "none"}} ></input>
							<div class="pfp-file-inp" onclick="$('#pfp-inp').click()"><i class="fa fa-camera pfp-icon"></i></div>
						</div>
						<div style={{display: "flex"}}>
							<button class="btn btn-pfp" style={{backgroundColor: "#000",color:"#fff"}}>Update</button>
							<button onclick="javascript:window.history.back(-1);return false;" class="btn btn-light">Cancel</button>
						</div>
					</div>
					<div class="tab-pane acc-set fade " id="banner" role="tabpanel" aria-labelledby="account-tab">
						<h3 class="mb-4">Change Banner </h3>
            			<h1 class="err err-banner"></h1>
						<div class="row banner-row" >
							<input type="file" name="banner" id="banner-inp" style={{display: "none"}} ></input>
							<div class="banner-file-inp" onclick="$('#banner-inp').click()"><i class="fa fa-camera banner-icon"></i></div>
						</div>
						<div style={{display: "flex"}}>
							<button class="btn btn-banner" style={{backgroundColor: "#000",color:"#fff"}}>Update</button>
							<button onclick="javascript:window.history.back(-1);return false;" class="btn btn-light">Cancel</button>
						</div>
					</div>
					<div class="tab-pane acc-set fade " id="password" role="tabpanel" aria-labelledby="password-tab">
						<h3 class="mb-4">Password Settings</h3>
            			<h1 class="err err-pass"></h1>
						<div class="row">
							<div class="col-md-6">
								<div class="form-group">
								<label>Old password</label>
								<input type="password"class="form-control inp-old-pass" placeholder="Enter your current password"></input>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6">
								<div class="form-group">
								<label>New password</label>
								<input type="password" class="form-control inp-new-pass" placeholder="Enter your new password"></input>
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
								<label>Confirm new password</label>
								<input type="password" class="form-control inp-cnf-pass" placeholder="Confirm your password"></input>
								</div>
							</div>
						</div>
						<div style={{display:"flex"}}>
							<button class="btn btn-password" style={{backgroundColor: "#000",color:"#fff"}}>Update</button>
							<button class="btn btn-light">Cancel</button>
						</div>
					</div>

				</div>
			</div>
		</div>
	</section>

      
    </div>
  )
}

export default Settings