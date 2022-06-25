import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Navbar from '../Navbar';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import '../assets/css/boostrap.min.css'
import profile from '../assets/images/profile.jpg'
import { faPaperPlane} from '@fortawesome/free-solid-svg-icons';



import '../assets/css/all.css'
const MobileChat = () => {
  return (
	
    <div>
		 <style>{"\
     @media screen and (max-width: 991px)  {\
      .navbar__  {\
          display:none;\
      }\
      body {\
          padding-bottom: 0;\
          padding-top:0px\
      }\
	  .content{\
        padding-top:0px\
	  }\
	  .chat-messages{\
        height:82vh;\
	  }\
      #chat-messages{\
          max-height: calc(var(--vh, 1vh) * 100);\
      }\
      #chat{\
          color:#000;\
      }\
      .chats{\
          color: #000;\
          max-height: 90vh;\
      }\
      #back{\
          display: block !important;\
      }\
      .non-chat-c{\
          display: none;\
      }\
  }\
  body {\
    padding-bottom:0px;\
    padding-top:0px\
  }\
      #sc{\
          visibility: hidden;\
          text-align: start;\
          padding: 0.7rem 1rem;\
          border:1px solid #DBE0E4;\
          border-radius: 1em;\
          background-color: white;\
      }\
      #s-user:focus + #sc, #sc:focus + #sc{\
          visibility: visible;\
      }\
      .search-sug{\
          text-align: start;\
          width: 100%;\
          cursor: pointer;\
          padding: 0.2em 0;\
          font-weight: 450;\
          transition:all 200ms;\
          background:none;\
          border:none;\
      }\
      .search-sug:hover{\
          color:rgb(26, 243, 30)\
      }\
.chat-messages {\
    display: flex;\
    flex-direction: column;\
    max-height: 800px;\
    overflow-y: scroll\
}\
.chat-message-left,\
.chat-message-right {\
    display: flex;\
    flex-shrink: 0\
}\
.chat-message-left {\
    margin-right: auto\
}\
.chat-message-right {\
    flex-direction: row-reverse;\
    margin-left: auto\
}\
.py-3 {\
    padding-top: 1rem!important;\
    padding-bottom: 1rem!important;\
}\
.px-4 {\
    padding-right: 1.5rem!important;\
    padding-left: 1.5rem!important;\
}\
.flex-grow-0 {\
    flex-grow: 0!important;\
}\
.border-top { \
    border-top: 1px solid #dee2e6!important;\
} \
   "
  }</style>
		<Navbar>

		</Navbar>
           <main class="content "  >
    <div class="container p-0" style={{marginTop:'2px'}}>


		<div class="card">
			<div class="row g-0">
				<div class="col-12 col-lg-5 col-xl-3 border-right d-lg-block d-none">

					<div class="px-4 ">
						<div class="d-flex align-items-center mt-3">
							<div class="flex-grow-1">
                            <h1 class="h3 mb-3">Messages</h1>

								<input type="text" class="form-control my-3" placeholder="Search..."></input>
							</div>
						</div>
					</div>

					<a href="/mobileChat" class="list-group-item list-group-item-action border-0 ">
						<div class="d-flex align-items-start">
                        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40"></img>
							<div class="flex-grow-1 ml-3">
								Alia
								<div class="small text-start font-weight-bold " style={{fontWeight:'bold'}}><span class="fas fa-circle chat-online "></span> Online</div>
							</div>
						</div>
					</a>
				
				
				</div>
				<div class="col-12 col-lg-7 col-xl-9 d-lg-block ">
					<div class="py-2 px-4 border-bottom d-lg-block">
						
						<div class="d-flex align-items-center py-1">
							<a href='/chat'>
							<div class="position-relative d-flex gap-4 " style={{justifyContent:" center",alignItems: "center",}}>
							<FontAwesomeIcon style={{fontSize:'30px'}} icon={faArrowLeft}/>
                        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40"></img>
							</div>
							</a>
							<div class="flex-grow-1 pl-3">
								
								<strong>Alia</strong>
							</div>
							<div>
								<button class="btn btn-light border btn-lg px-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal feather-lg"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg></button>
							</div>
						</div>
					</div>

					<div class="position-relative">
						<div class="chat-messages p-4" style={{overflow:"scroll",overflowX:"hidden"}}>

							<div class="chat-message-right pb-4">
								<div>
                                <img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40"></img>
									<div class="text-muted small text-nowrap mt-2">2:33 am</div>
								</div>
								<div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
									<div class="font-weight-bold mb-1">You</div>
									Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.
								</div>
							</div>

							<div class="chat-message-left pb-4">
								<div>
									<img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40"></img>
									<div class="text-muted small text-nowrap mt-2">2:34 am</div>
								</div>
								<div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
									<div class="font-weight-bold mb-1">Alia</div>
									Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.
								</div>
							</div>

							<div class="chat-message-right mb-4">
								<div>
									<img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40"></img>
									<div class="text-muted small text-nowrap mt-2">2:35 am</div>
								</div>
								<div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
									<div class="font-weight-bold mb-1">You</div>
									Cum ea graeci tractatos.
								</div>
							</div>

							<div class="chat-message-left pb-4">
								<div>
									<img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40"></img>
									<div class="text-muted small text-nowrap mt-2">2:36 am</div>
								</div>
								<div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
									<div class="font-weight-bold mb-1">Alia</div>
									Sed pulvinar, massa vitae interdum pulvinar, risus lectus porttitor magna, vitae commodo lectus mauris et velit.
									Proin ultricies placerat imperdiet. Morbi varius quam ac venenatis tempus.
								</div>
							</div>

							<div class="chat-message-left pb-4">
								<div>
									<img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40"></img>
									<div class="text-muted small text-nowrap mt-2">2:37 am</div>
								</div>
								<div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
									<div class="font-weight-bold mb-1">Alia</div>
									Cras pulvinar, sapien id vehicula aliquet, diam velit elementum orci.
								</div>
							</div>

							<div class="chat-message-right mb-4">
								<div>
									<img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40"></img>
									<div class="text-muted small text-nowrap mt-2">2:38 am</div>
								</div>
								<div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
									<div class="font-weight-bold mb-1">You</div>
									Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.
								</div>
							</div>

							<div class="chat-message-left pb-4">
								<div>
									<img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40"></img>
									<div class="text-muted small text-nowrap mt-2">2:39 am</div>
								</div>
								<div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
									<div class="font-weight-bold mb-1">Alia</div>
									Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.
								</div>
							</div>

							<div class="chat-message-right mb-4">
								<div>
									<img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40"></img>
									<div class="text-muted small text-nowrap mt-2">2:40 am</div>
								</div>
								<div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
									<div class="font-weight-bold mb-1">You</div>
									Cum ea graeci tractatos.
								</div>
							</div>

							<div class="chat-message-right mb-4">
								<div>
									<img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40"></img>
									<div class="text-muted small text-nowrap mt-2">2:41 am</div>
								</div>
								<div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
									<div class="font-weight-bold mb-1">You</div>
									Morbi finibus, lorem id placerat ullamcorper, nunc enim ultrices massa, id dignissim metus urna eget purus.
								</div>
							</div>

							<div class="chat-message-left pb-4">
								<div>
									<img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40"></img>
									<div class="text-muted small text-nowrap mt-2">2:42 am</div>
								</div>
								<div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
									<div class="font-weight-bold mb-1">Sharon Lessman</div>
									Sed pulvinar, massa vitae interdum pulvinar, risus lectus porttitor magna, vitae commodo lectus mauris et velit.
									Proin ultricies placerat imperdiet. Morbi varius quam ac venenatis tempus.
								</div>
							</div>

							<div class="chat-message-right mb-4">
								<div>
									<img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40"></img>
									<div class="text-muted small text-nowrap mt-2">2:43 am</div>
								</div>
								<div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
									<div class="font-weight-bold mb-1">You</div>
									Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.
								</div>
							</div>

							<div class="chat-message-left pb-4">
								<div>
									<img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40"></img>
									<div class="text-muted small text-nowrap mt-2">2:44 am</div>
								</div>
								<div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
									<div class="font-weight-bold mb-1">Sharon Lessman</div>
									Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.
								</div>
							</div>

						</div>
						<div class="flex-grow-0 py-3 px-4 border-top  w-100"  >
						<div class="input-group gap-3 ">
							<input type="text" class="form-control" placeholder="Type your message"></input>
							<button class="">
                               <FontAwesomeIcon style={{fontSize:'25px',color:'#7BF992'}} icon={faPaperPlane}/>
                            </button>
						</div>
					</div>

					</div>

				
				</div>
			</div>
		</div>
	</div>
</main>
    </div>
  )
}

export default MobileChat