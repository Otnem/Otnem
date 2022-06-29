const searchPage = async(req,res)=>{
    try{
        let query = req.query
        if(!query.element && !query.element){
            return res.send({success:false,msg:"Wrong query"})
        }
        let pacNum = (typeof req.query.packet === 'number' && req.query.packet > 0)?req.query.packet:1
        userName = await getUserName(req)
        let allPosts = await getAllPosts()
        let pacLen = 50
        let index = allPosts.length - (pacNum * pacLen)
        if(index >= 0)
            allPosts = allPosts.splice(index , index + pacLen)
        switch(query.type){
            case 'tag':
                let tagsData = allPosts.map(e => {
                    if(e.tags.includes(query.element))
                        return e
                })
                tagsData = tagsData.filter(e=>e!==undefined)
                if(!tagsData[0])
                    return res.send({success:false,msg:"Tag not found"})
                return res.send({success:true,data:tagsData,isAuth:req.isAuthenticated()})
            case 'title':
                if(query.element.length > 50)
                    return res.send({msg:"Search element too long",success:false})
                if(query.element.length <= 0)
                    return res.send({msg:"Search element empty",success:false})
                let titleData = allPosts.map(e=>{
                    if(e.titleArr[0].includes(query.element))
                        return e
                })
                titleData = titleData.filter(e=>e!==undefined)
                if(!titleData[0])
                    return res.send({msg:"Title not found",success:false,data:allPosts})
                return res.send({success:true,data:titleData,isAuth:req.isAuthenticated()})

            default: return res.send({msg:"Search type not found"})
        }
    }
    catch(err){
        console.log(err)
    }
}
const uploadPostPage = async(req,res)=>{
    try {
        const {profilePic} = await getUser(await getUserName(req))
        res.render('uploadPage',{layout:'indexLayout',msg:"FUCKSDS",profilePic:profilePic,isAuth:req.isAuthenticated()})
    } catch (error) {
        console.log(error)
    }
}
const checkIfUserExistsRoute = async(req,res)=>{
    const {user} = await req.query
    return res.send(await checkIfUserExists(user))
}
const deletePost = async(req,res)=>{
    try{
        const {postNum} = await req.body
        let userName = await getUserName(req)
        let postData = (await userDB.doc(userName).collection('posts').doc(postNum).get()).data()
        if(!postData)
            return res.send('Post not found')
        let {publicIdArr} = postData
        publicIdArr.forEach(public_id=>{
            cloudinary.uploader.destroy(public_id)
        })
        let userPost = userDB.doc(userName).collection('posts').doc(postNum)
        let post = postDB.doc(postNum)
        userPost.listCollections().then(subCols=>{
            subCols.forEach(async subCol=>{
                (await subCol.get()).docs.forEach(async doc=>{
                    doc.delete()
                })
            })
        })
        post.listCollections().then(subCols=>{
            subCols.forEach(async subCol=>{
                (await subCol.get()).docs.forEach(async doc=>{
                    doc.delete()
                })
            })
        })
        await userPost.delete()
        await post.delete()
    }catch(err){
        console.log(err)
    }
}
const postComments = async(req,res)=>{
    try{
        let userName = await getUserName(req)
        if(!userName)
            return res.send({success:false,redirect:'/login'})
        let {comment,postNum,postUser} = await req.body
        let userCheck = (await userDB.doc(postUser).get()).data()
        if(!userCheck)
            return res.send({success:false,msg:"User not available"}).status(402)
        let postCheck = (await userDB.doc(postUser).collection('posts').doc(postNum).get()).data()
        if(!postCheck)
            return res.send({success:false,msg:"Post not available"}).status(400)
        if(!comment || !postNum || !postUser)
            return res.send({success:false,msg:"Missing arguments"}).status(400)
        if(!await checkElegible(userName,postUser))
            return res.send({success:false,msg:"User not eligeable"}.status(400))
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0')
        let mm = String(today.getMonth() + 1).padStart(2, '0')
        let yyyy = today.getFullYear()
        today = dd + '/' + mm + '/' + yyyy    
        await userDB.doc(`${postUser}`).collection('posts').doc(postNum).collection('comments').add({user:userName,content:comment,date:today,time:Date.parse(new Date())}).then(async response=>{
            await postDB.doc(postNum).collection('comments').doc(response.id).set({user:userName,content:comment,date:today,time:Date.parse(new Date())},{merge:true})
            let userData = await getUser(userName)
            return res.send({success:true,postNum,userData,commentNum:response.id}).status(200)
        })
    }
    catch(err){
        console.log(err)
    }
}
const deleteComment = async (req,res)=>{
    try{
        const userName = await getUserName(req)
        const{commentNum,postNum,postUser,commentUser} = await req.body
        if(userName != commentUser)
            return res.send({success:false}).status(400)
        let result = await userDB.doc(postUser).collection('posts').doc(postNum).collection('comments').doc(commentNum).delete()
        await postDB.doc(postNum).collection('comments').doc(commentNum).delete()
        res.send({success:true,result}).status(200)
    }
    catch(err){
        console.log(err)
    }
}
const uploadFile = async(req,res)=>{
    try {
        let userName = await getUserName(req)
        let userData = await getUser(userName)
        let body = await req.body
        let titleArr = []
        let discArr = []
        let category = body.category
        for(k in body){
            if(k.startsWith('title'))
                titleArr.splice(Number(k.charAt(k.length - 1)),0,body[k])
            if(k.startsWith('disc'))
                discArr.splice(Number(k.charAt(k.length - 1)),0,body[k])
        }
        let allCat = ["all","art","tech","uiux","amvs","photoshop","games","other"]
        if(!allCat.includes(category.toLowerCase()))
            category = "other"
        if(category.toLowerCase() == 'ui/ux')
            category = "uiux"
        if(!titleArr.some(title=>title.length < 50) && !discArr.some(disc=>disc.length < 550))
            return res.json({success:false,msg:"Too long FFFFF"}).status(400)
        let files = await req.files
        let length = files.length
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0')
        let mm = String(today.getMonth() + 1).padStart(2, '0')
        let yyyy = today.getFullYear()
        today = dd + '/' + mm + '/' + yyyy
        let publicIdArr = []
        let imgURLArr = []
        let tags = body.tags
        for(let i = 0;i < length; i++){
            let buffer = files[i].buffer
            let cldUploadStream = cloudinary.uploader.upload_stream({
            folder:`${userName}/posts/`,
            },async(err,response)=>{
                let imageName = (response.public_id.split('/'))[((response.public_id.split('/'))).length-1]
                if (err) return res.send(err)
                let imgURL = response.secure_url
                await userDB.doc(`${userName}`).set({exists:true},{merge:true})
                publicIdArr.splice(i,0,response.public_id)
                imgURLArr.splice(i,0,imgURL)
                let followersSnap = await userDB.doc(userName).collection('followers').get()
                let followers = followersSnap.docs.map(doc=>{
                    return doc.id
                })
                let user = await getUser(userName)
                followers.forEach(async follower=>{
                    await notify(follower,`${userName} uploaded a post`,`Check out ${userName}'s post`,`/postPreview?user=${userName}&&postNum=${imageName}`,user.profilePic)
                })
                length -= 1
                if(length <= 0){
                    let finalObj = {
                        titleArr,
                        discArr,
                        publicIdArr,
                        imgURLArr,
                        date:today,
                        category:category,
                        tags:tags||"none",
                    }
                    let id = smjs.randomUniqIdGen(40)
                    finalObj['profilePic'] = userData.profilePic
                    finalObj['verified'] = userData.verified
                    await userDB.doc(`${userName}`).collection(`posts`).doc(id).set(finalObj)
                    finalObj['user'] = userName
                    await postDB.doc(id).set(finalObj)
                    res.send({success:true,num:id,user:userName}).status(200)
                }
            })
            streamify.createReadStream(buffer).pipe(cldUploadStream)
        }
    } catch (error) {
        console.log(error)
    }
}
const postPreviewPage = async(req,res)=>{
    try {
        let userName = await getUserName(req)
        let query = await req.query
        let isDeletable = false
        if(userName == query.user)
            isDeletable = true
        if(!query.user || !query.postNum)
            return res.send({success:false,msg:"Arguments Missing"})
        let userCheck = (await userDB.doc(query.user).get()).data()
        if(!userCheck)
        return res.send({success:false,msg:"User not found"})
        let postCheck = (await userDB.doc(query.user).collection('posts').doc(query.postNum).get()).data()
        if(!postCheck)
        return res.send({success:false,msg:"No Post Found"})
        let postUser = await getUser(query.user)
        let profilePic = ""
        let paypal = postUser.paypal
        if(req.isAuthenticated()){
            let user = await getUser(userName)
            profilePic = user.profilePic
        }
        if(!query.user || !query.postNum)
            return res.send({success:false,msg:"No Post Found"})
        let isComment = false
        let commentsArray = []
        let postData = (await userDB.doc(query.user).collection('posts').doc(query.postNum).get()).data()
        let commentSnapshot = await userDB.doc(query.user).collection('posts').doc(query.postNum).collection('comments').orderBy('time','desc').get()
        let likeSnap = (await userDB.doc(query.user).collection('posts').doc(query.postNum).collection('likes').get())
        let likes  = likeSnap.size
        let likesArray = likeSnap.docs.map(doc=>doc.data().user)
        let isLiked = false
        if(likesArray.includes(userName))isLiked=true
        if(!commentSnapshot.empty){
            isComment = true
            commentsArray = await Promise.all(commentSnapshot.docs.map(async doc=>{
                let data = doc.data()
                data['commentNum'] = doc.id
                let userData = await getUser(data.user)
                data['profilePic'] = userData.profilePic
                data['verified'] = userData.verified
                if(data.user == userName)
                    data['own'] = true
                else
                    data['own'] = false
                return data
            }))
        }
        let err = false
        if(postData == undefined){
            postData = {}
            postData['img'] = "https://www.publicdomainpictures.net/pictures/280000/nahled/not-found-image-15383864787lu.jpg"
            postData['title'] = "ERRRRR"
            postData['disc'] = "ERRRRRR"
            err = true
        }
        postData['fields'] = postData.titleArr.map((e,i)=>{
            let field = {}
            field['title'] = e
            field['disc'] = postData.discArr[i]
            field['img'] = postData.imgURLArr[i]
            field['isLiked'] = isLiked
            field['isDeletable'] = isDeletable
            field['postNum'] = query.postNum
            field['postUser'] = postUser.userName
            field['paypal'] = paypal
            return field
        })
        return res.send({success:true,isLiked,likes,commentsQty:commentSnapshot.size,verified:postUser.verified,isDeletable:isDeletable,posterProfilePic:postUser.profilePic,date:postData.date,postUser:query.user,commentsArray:commentsArray,isComment:isComment,tags:postData.tags,fields:postData.fields,err:err,postNum:query.postNum,profilePic:profilePic})
    } catch (error) {
        console.log(error)
    }
}
const followUser = async(req,res)=>{
    try{
        const {followUserName} = await req.body
        if(!await checkIfUserExists(followUserName))
            return res.send({success:false,msg:"User doesnt exists"}).status(401)
        let userName = await getUserName(req)
        if(followUserName == userName)
            return res.send({success:false,msg:"You cant follow yourself... idiot!!"})
        if(await checkIfDocExists(userDB.doc(userName).collection('following'),followUserName))
            return res.send({success:false,msg:"You already follow this user"})
        await userDB.doc(followUserName).collection('followers').doc(userName).set({exists:true})
        await userDB.doc(userName).collection('following').doc(followUserName).set({exists:true})
        const {profilePic} = await getUser(userName)
        await notify(followUserName,`${userName} followed`,`${userName} has followed you on Otnem`,`/notifications`,`${profilePic}`)
        res.send({success:true,msg:"Followed"})
    }
    catch(err){
        console.log(err)
    }
}
const unfollowUser = async(req,res)=>{
    try{
        const {unFollowUserName} = await req.body
        let userName = await getUserName(req)
        if(!await checkIfUserExists(unFollowUserName))
            return res.send({success:false,msg:"User doesnt exists"})
        if(unFollowUserName == userName)
            return res.send({success:false,msg:"You cant unfollow yourself... idiot!!"})
        if(!await checkIfDocExists(userDB.doc(userName).collection('following'),unFollowUserName))
            return res.send({success:false,msg:"You are not following this user"})
        await userDB.doc(unFollowUserName).collection('followers').doc(userName).delete()
        await userDB.doc(userName).collection('following').doc(unFollowUserName).delete()
        const {profilePic} = await getUser(userName)
        await notify(unFollowUserName,`${userName} unfollowed`,`${userName} has unfollowed you on Otnem`,`/notifications`,`${profilePic}`)
        res.send({success:true,msg:"unFollowed"})
    }
    catch(err){
        console.log(err)
    }
}
const getUserApi = async(req,res)=>{
    try{
        let userName = req.query.user
        if(await checkIfUserExists(userName) && userName)
            return res.send({success:true,...await getUser(userName)}).status(200)
        else{
            userName = await getUserName(req)
            if(userName)
                return res.send({success:true,...await getUser(userName)}).status(200)
        }
        return res.send({success:false,msg:"No user found"}).status(400)
    }catch(err){
        console.log(err)
    }    
}
const getAllUsersApi = async(req,res)=>{
    res.send(await getAllUsers())
}
const addLike = async(req,res)=>{
    try{
        const userName = await getUserName(req)
        const {user,postNum} = await req.body
        if(!user&&!postNum)
            return res.send({success:false,msg:"Missing Fields"}).status(400)
        if((await userDB.doc(user).collection('posts').doc(postNum).collection('likes').where('user','==',userName).get()).docs[0])
            return res.send({success:false,msg:"User already liked"}).status(304)
        await userDB.doc(user).collection('posts').doc(postNum).collection('likes').add({user:userName}).then(async response=>{
            await postDB.doc(postNum).collection('likes').doc(response.id).set({user:userName},{merge:true})
            await notify(user,`${userName} liked a post`,`Check out your post`,`/postPreview?user=${user}&&postNum=${postNum}`,user.profilePic)
            return res.send({success:true,msg:"Like Added"}).status(201)
        })
    }catch(err){
        console.log(err)
    }
}
const removeLike = async(req,res)=>{
    try{
        const userName = await getUserName(req)
        const {user,postNum} = await req.body
        if(!user&&!postNum)
            return res.send({success:false,msg:"Missing Fields"}).status(400)
        let likeDoc = (await userDB.doc(user).collection('posts').doc(postNum).collection('likes').where('user','==',userName).get()).docs[0]
        if(!likeDoc)
            return res.send({success:false,msg:"User didn't like"})
        await userDB.doc(user).collection('posts').doc(postNum).collection('likes').doc(likeDoc.id).delete()
        await postDB.doc(postNum).collection('likes').doc(likeDoc.id).delete()
        await notify(user,`${userName} unliked a post`,`Check out your post`,`/postPreview?user=${user}&&postNum=${postNum}`,user.profilePic)
        return res.send({success:true,msg:"Like Removed"})
    }catch(err){
        console.log(err)
    }
}
const getLikes = async(req,res)=>{
    try{
        const {postNum,user} = await req.query
        let likeSnap = await userDB.doc(user).collection('posts').doc(postNum).collection('likes').get()
        if(likeSnap.size == 0){
            return res.send([])
        }
        return res.send(likeSnap.docs.map(doc=>{
            let data = doc.data()
            data['id'] = doc.id
            return data
        }))
    }catch(err){
        console.log(err)
    }
}
module.exports = {searchPage,uploadPostPage,checkIfUserExistsRoute,deletePost,postComments,deleteComment,uploadFile,postPreviewPage,followUser,unfollowUser,getUserApi,getAllUsersApi,addLike,removeLike,getLikes}
const { response } = require('express')
const {notify,checkIfUserExists,checkElegible,getUserName,getUser,getAllPosts,checkIfDocExists,getAllUsers} = require('../customFunctions')
const { userDB, postDB, cloudinary, streamify, smjs} = require('./posts')