const profile = async(req,res)=>{
    try{
        let pacNum = (typeof req.query.packet === 'number' && req.query.packet > 0)?req.query.packet:1
        let userName = await getUserName(req)
        let query = await req.query
        if(query.user && !await checkIfUserExists(query.user))
            return res.redirect('/')
        if(!query.user && !userName)
            return res.redirect('login')
        if(query.user)
            userName = query.user
        let userObj = await getUser(userName)
        let isFollowing = false
        if(req.isAuthenticated() && query.user && await checkIfFollowing(await getUserName(req),query.user)){
            isFollowing = true
        }
        userObj['isFollowing'] = isFollowing
        let snapshot = await userDB.doc(userName).collection('followers').get()
        let followers = snapshot.docs.map(doc=>{
        return doc
        })
        snapshot = await userDB.doc(userName).collection('following').get()
        let following = snapshot.docs.map(doc=>{
        return doc
        })
        userObj['followers'] = followers.length
        userObj['following'] = following.length
        let posts = await getAllUserPosts(userName,pacNum)
        let myName = await getUserName(req)
        posts.forEach(post=>{
        post['name'] = userName
        post['profilePic'] = userObj.profilePic
        post['verified'] = userObj.verified
        post['isLiked']=false
        if(post['likesArray'].includes(myName))post['isLiked']=true
        })
        userObj['posts'] = posts
        let isPost = false
        if(posts[0])
            isPost = true
        userObj['isPost'] = isPost
        userObj['isAuth'] = req.isAuthenticated()
        userObj['isMine'] = (await getUserName(req) == query.user || !query.user)?true:false
        if(!await getUserName(req))userObj['isMine'] = false
        let userPfp = ''
        if(req.isAuthenticated())
            userPfp = (await getUser(await getUserName(req))).profilePic
        res.send({layout:'profileLayout',userObj:userObj,profilePic:userPfp,isAuth:req.isAuthenticated()})
    }catch(err){
        console.log(err)
    }
}
const settings = async(req,res)=>{
    let userData = await getUser(await getUserName(req))
    res.send({userName:userData.userName,profilePic:userData.profilePic,userData:userData})
}
const changeCredentials = async(req,res)=>{
    try{
        let userName = await getUserName(req)
        let {cred} = await req.body
        switch(cred){
            case 'password':
                let {newElement} = await req.body
                if(newElement.length < 8)
                    return res.send({success:false,msg:"Password too short"})
                let {currentElement} = await req.body
                let currentPassword = (await userDB.doc(userName).get()).data()
                currentPassword = currentPassword.password
                bcrypt.compare(currentElement,currentPassword,async function(err,response){
                    if(response){
                        let newHashedPassword = await bcrypt.hash(newElement,10)
                        await userDB.doc(userName).update({password:newHashedPassword})
                        return res.send({success:true,msg:"Changed"})
                    }
                    else{
                        return await res.send({success:false,msg:"Passwords didnt match"})
                    }
                })
                return
            case 'profilePic':
                if(!req.file)
                    return res.send({success:false,msg:'File not found'})
                let buffer = req.file.buffer
                let cldstrm =  cloudinary.uploader.upload_stream({
                    public_id:`${userName}/profilePic`,
                    height: 500, width: 500, crop: "scale",
                },async(err,response)=>{
                    let URL = response.secure_url;
                    await userDB.doc(userName).update({image:URL})
                    return res.send({success:true,msg:"Changed"})
                })
                return streamify.createReadStream(buffer).pipe(cldstrm)
            case "banner":
                if(!req.file)
                    return res.send({success:false,msg:'File not found'})
                    let bufferB = req.file.buffer
                    let cldstrmB =  cloudinary.uploader.upload_stream({
                        public_id:`${userName}/banner`,
                        height: 400, width: 1200, crop: "scale",
                    },async(err,response)=>{
                        let URL = response.secure_url;
                        await userDB.doc(userName).update({banner:URL})
                        return res.send({success:true,msg:"Changed"})
                    })
                return streamify.createReadStream(bufferB).pipe(cldstrmB)
                case 'account':
                let {newPaypal,bio} = await req.body
                if(newPaypal.length != 0)
                    await userDB.doc(userName).update({paypal:newPaypal})
                if(bio.length != 0)
                    await userDB.doc(userName).set({bio:bio},{merge:true})
                return res.send({success:true,msg:"Changed"})
            default:return res.send({success:false,msg:"No lol"}).status(400)
        }
    }
    catch(err){
        console.log(err)
    }
}
module.exports = {profile,settings,changeCredentials}
const {checkIfUserExists,getUserName,getUser,getAllUserPosts,checkIfFollowing} = require('../customFunctions')
const { userDB , cloudinary , streamify } = require('./posts')