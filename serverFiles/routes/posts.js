const express = require('express')
const { test, assignNotif, mainPage, notifPage, redPage, pageUnderConstruction} = require("../controllers/posts.js")
const {uploadPostPage, uploadFile, postPreviewPage, postComments, deleteComment, searchPage, followUser, unfollowUser, deletePost, checkIfUserExistsRoute, getUserApi, getLikes, addLike, removeLike, getAllUsersApi} = require('../controllers/resources')
const {registerPost, logout, login, register, verifyUser, loginPost} = require('../controllers/auth')
const {changeCredentials, profile, settings} = require('../controllers/profile')
const {chatRoom, chatPage, getChatMembers} = require('../controllers/chat')
const mutler = require('multer')
const router = express.Router()
const upload = mutler()

router.get('/',mainPage)
router.get('/login',checkNotAuth,login)
router.get('/register',checkNotAuth,register)
router.get('/post',checkAuth,uploadPostPage)
router.get('/postPreview',postPreviewPage)
router.get('/search',searchPage)
router.get('/profile',profile)
router.get('/verify',checkNotAuth,verifyUser)
router.get('/notifications',checkAuth,notifPage)
router.get('/chatRoom',checkAuth,chatPage)
router.get('/settings',checkAuth,settings)
router.get('/chats',checkAuth,chatRoom)
router.get('/chatMem',checkAuth,getChatMembers)
router.get('/checkUser',checkIfUserExistsRoute)
router.get('/likes',getLikes)
router.get('/redPage',checkNotAuth,redPage)
router.get('/getAllUsers',getAllUsersApi)
router.get('/construction',pageUnderConstruction)
router.post('/upload',checkAuth,upload.array('upload_file'),uploadFile)
router.post('/comment',checkAuth,postComments)
router.post('/follow',checkAuth,followUser)
router.post('/asignNotification',checkAuth,assignNotif)
router.post('/unfollow',checkAuth,unfollowUser)
router.post('/test',test)
router.post('/register',checkNotAuth,registerPost)
router.post('/login',checkNotAuth,loginPost)
router.post('/changeCred',checkAuth,upload.single('profile_pic'),changeCredentials)
router.post('/getUser',getUserApi)
router.post('/addLike',checkAuth,addLike)
router.post('/removeLike',checkAuth,removeLike)
router.delete('/logout',checkAuth,logout)
router.delete('/deleteComment',checkAuth,deleteComment)
router.delete('/deletePost',checkAuth,deletePost)

// CUSTOM FUNCTIONS
function checkAuth(req,res,next){
    if(req.isAuthenticated()){
        next()
    }
    else{
        return res.redirect('login')
    }
}
function checkNotAuth(req,res,next){
    if(!req.isAuthenticated()){
        next()
    }
    else{
        return res.redirect('/')
    }
}

module.exports = router