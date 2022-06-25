require('dotenv').config()
const admin = require("firebase-admin")
const cloudinary = require('cloudinary').v2
const streamify = require('streamifier')
const serviceAccount = process.env.SERVICE_ACCOUNT_KEY
const webPush = require('web-push')
const passport = require('passport')
const bcrypt = require('bcrypt')
const emailer = require('nodemailer')
const smjs = require('smpljavascript')
webPush.setVapidDetails('mailto:pravithba10@gmail.com', process.env.PUBLIC_KEY,process.env.PRIVATE_KEY)
admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(serviceAccount)),
})
const firebase = admin.firestore()
const userDB = firebase.collection('userData')
const unVerifiedDB = firebase.collection('unVerified')
const chatRoomDB = firebase.collection('chatRoom')
const postDB = firebase.collection('allPosts')
const {init} = require('../passportConfig')
init(passport,
    async email=>{
        let snapshot = await userDB.get()
        snapshot = snapshot.docs.map(doc => doc.data())
        return snapshot.find(user=>user.email === email)
    },
    async name=>{
        let snapshot = await userDB.get()
        snapshot = snapshot.docs.map(doc => doc.data())
        return name = snapshot.find(user=>user.name === name)
    }
)

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
})
const redPage = (req,res)=>{
    return res.send()
}
const mainPage = async(req,res)=>{
    try{
        let pacNum = (typeof req.query.packet === 'number' && req.query.packet > 0)?req.query.packet:1
        const {attr,element} = await req.query
        let userName = await getUserName(req)
        let loggedIn = false
        let userObj = {profilePic:""}
        if(userName){
        userObj = await getUser(userName)
        loggedIn = true
        }
        let finalArray = await getAllPostsFiltered(attr,element,pacNum)
        let isPost = false
        if(finalArray[0])
            isPost = true
        finalArray.forEach(post=>{(post['likesArray'].includes(userName))?post['isLiked']=true:post['isLiked']=false})
        res.send({isPost:isPost,len:finalArray.length,posts:finalArray,loggedIn:loggedIn,profilePic:userObj.profilePic,isAuth:req.isAuthenticated()})
    }catch(err){
        console.log(err)
    }
}
const notifPage = async(req,res)=>{
    let userName = await getUserName(req)
    let user = await getUser(userName)
    let snapshot = await userDB.doc(userName).collection('notifications').get()
    let notifications = snapshot.docs.map(doc=>{
        let data = doc.data()
        data['id'] = doc.id
        return data
    })
    res.send({notifications:notifications,profilePic:user.profilePic})

}
const assignNotif = async (req,res)=>{
    try {
        const userName = await getUserName(req)
        const {push} = await req.body
        if(userName)
        await userDB.doc(userName).set({push:push},{merge:true})
    } 
    catch(err){
        console.log(err)
    }
}
const test = async (req,res,next)=>{
    res.send(await checkIfFollowing('Pravith B A',"Phalicyy"))
}
const pageUnderConstruction= (req,res)=>{
    res.send()
}
module.exports = {assignNotif,test,assignNotif,mainPage,notifPage,redPage,pageUnderConstruction,streamify,bcrypt,emailer,smjs,userDB,unVerifiedDB,chatRoomDB,postDB,webPush,cloudinary}
const {getUserName,getUser,getAllPostsFiltered,checkIfFollowing} = require('../customFunctions')