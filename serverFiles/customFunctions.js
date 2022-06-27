const { userDB, webPush, postDB } = require("./controllers/posts")
async function notify(userName,title,disc,link,image){
    try{
        let push = (await userDB.doc(userName).get()).data()
        push = push.push
        if(!image)image = 'https://www.easylinedrawing.com/wp-content/uploads/2020/12/heart_drawing_tutorial.png'
        if(!push)
            return "User Doesnt have push"
        let pushSubscription = push
        if(typeof push == 'string')
            pushSubscription = JSON.parse(push)
        let payloadObj = {title:title,disc:disc,link:link,image:image}
        await userDB.doc(userName).collection('notifications').add({title:payloadObj.title,disc:payloadObj.disc,link:payloadObj.link,image:image},{merge:true})
        await webPush.sendNotification(pushSubscription,JSON.stringify(payloadObj))
        return "Done"
    }
    catch(err){
        console.log(err)
    }
}
async function checkIfUserExists(user){
    let snapshot = await userDB.get()
    let res = false
    snapshot.forEach(doc=>{
        if(user == doc.id)
            res = true
    })
    return res
}
async function checkElegible(user,checkUser){
    if(checkUser == user)return true
    let visibality = (await userDB.doc(user).get()).data()
    visibality = visibality.visibality || "public"
    if(visibality == "public")return true
    let snapshot = await userDB.doc(user).collection('followers').get()
    let res = false
    snapshot.docs.map(doc=>{
        return doc
    })
    return res
}
async function getUserName(req){
    let userInfo = await req.user
    let userName
    (userInfo)?userName=userInfo.name:userName=undefined
    return userName
}
async function getUser(userName,showPassword){
    try{
        const userData = (await userDB.doc(userName).get()).data()
        if(!userData){
            return {
                "userName":'deletedUser',
                "userEmail":'deletedUserEmail',
                "profilePic":'https://media.istockphoto.com/vectors/anonymity-concept-icon-in-neon-line-style-vector-id1259924572?k=20&m=1259924572&s=612x612&w=0&h=Xeii8p8hOLrH84PO4LJgse5VT7YSdkQY_LeZOjy-QD4=',
                "verified":false,
                "paypal":'none'
            }
        }
        const {email,name,image,password,banner} = userData
        let userObject = {
            "userName":name,
            "userEmail":email,
            "profilePic":image,
            "verified":userData.verified,
            "paypal":userData.paypal,
            "banner":banner
        }
        if(showPassword)
            userObject["password"] = password
        return userObject
    }
    catch(err){
        console.log(err)
    }
}
async function getAllPosts(pacNum){
    let snapshot = (await postDB.get()).docs
    let posts = []
    let pacLen = 50
    let index = snapshot.length - (pacNum * pacLen)
    if(index < 0){
        posts = await Promise.all(snapshot.map(async doc=>{
            let data = doc.data()
            data['title'] = data.titleArr[0]
            data['img'] = data.imgURLArr[0]
            let likesArr = await postDB.doc(doc.id).collection('likes').get()
            data['user'] = data.user
            data['postName'] = doc.id
            data['likes'] = (likesArr).size
            data['commentsQty'] = (await postDB.doc(doc.id).collection('comments').get()).size
            data['likesArray'] = likesArr.docs.map(doc=>doc.data().user)
            data['fields'] = data.titleArr.map((e,i)=>{
                let field = {}
                field['title'] = e
                field['disc'] = data.discArr[i]
                field['img'] = data.imgURLArr[i]
                return field
            })
            return data
        }))
    }
    else{
        for(i = pacNum, j = 0; i < pacNum; i++, j++){
            doc = snapshot[i]
            let data = doc.data()
            data['title'] = data.titleArr[0]
            data['img'] = data.imgURLArr[0]
            let likesArr = await userDB.doc(user).collection('posts').doc(doc.id).collection('likes').get()
            data['user'] = user
            data['postName'] = doc.id
            data['likes'] = (likesArr).size
            data['commentsQty'] = (await userDB.doc(user).collection('posts').doc(doc.id).collection('comments').get()).size
            data['likesArray'] = likesArr.docs.map(doc=>doc.data().user)
            data['fields'] = data.titleArr.map((e,i)=>{
                    let field = {}
                    field['title'] = e
                    field['disc'] = data.discArr[i]
                    field['img'] = data.imgURLArr[i]
                    return field
            })
            posts[j] = data
        }
    }
    return posts
}
async function getAllUserPosts(userName,pacNum){
    let snapshot = (await userDB.doc(userName).collection('posts').get()).docs
    let posts = []
    let pacLen = 50
    let index = snapshot.length - (pacNum * pacLen)
    if(index < 0){
        posts = await Promise.all(snapshot.map(async doc=>{
            let data = doc.data()
            data['title'] = data.titleArr[0]
            data['img'] = data.imgURLArr[0]
            data['id'] = doc.id
            let likeSnap = await userDB.doc(userName).collection('posts').doc(doc.id).collection('likes').get()      
            data['likes'] = (likeSnap).size
            data['likesArray'] = likeSnap.docs.map(doc=>doc.data().user)
            data['commentsQty'] = (await userDB.doc(userName).collection('posts').doc(doc.id).collection('comments').get()).size
            data['fields'] = data.titleArr.map((e,i)=>{
                let field = {}
                field['title'] = e
                field['disc'] = data.discArr[i]
                field['img'] = data.imgURLArr[i]
                return field
            })
            return data
        }))
    }
    else{
        for(i = pacNum, j = 0; i < pacNum; i++, j++){
            let doc = snapshot[i]
            let data = doc.data()
            data['title'] = data.titleArr[0]
            data['img'] = data.imgURLArr[0]
            data['id'] = doc.id
            let likeSnap = await postDB.doc(doc.id).collection('likes').get()      
            data['likes'] = (likeSnap).size
            data['likesArray'] = likeSnap.docs.map(doc=>doc.data().user)
            data['commentsQty'] = (await postDB.doc(doc.id).collection('comments').get()).size
            data['fields'] = data.titleArr.map((e,i)=>{
                let field = {}
                field['title'] = e
                field['disc'] = data.discArr[i]
                field['img'] = data.imgURLArr[i]
                return field
            })
            posts[j] = data
        }
    }
    return posts
}
async function checkIfDocExists(collectionRef,docName){
    let exists = false
    let snap = await collectionRef.get()
    snap.forEach(doc=>{if(doc.id == docName)exists = true})
    return exists
}
async function getAllPostsFiltered(attr,element,packet){
    const allPosts = await getAllPosts(packet)
    if(attr == 'cat'&&element == 'all')
            return await Promise.all(allPosts.map(async post=>{return {...post,...await getUser(post.user)}}))
    switch(attr){
        case 'cat':
            return await Promise.all(allPosts.filter(post=>{return post.category.toLowerCase() == element.toLowerCase()}).map(async post=>{return{...post,...await getUser(post.user)}}))
        case 'tags':
            return await Promise.all(allPosts.filter(post=>{return post.tags.includes(element.toLowerCase())}).map(async post=>{return {...post,...await getUser(post.user)}}))
        case 'title':
            return await Promise.all(allPosts.filter(post=>{return post.title.toLowerCase().includes(element.toLowerCase())}).map(async post=>{return {...post,...await getUser(post.user)}}))
        case 'search':
            return [...await Promise.all(allPosts.filter(post=>{return post.title.toLowerCase().includes(element.toLowerCase())}).map(async post=>{return {...post,...await getUser(post.user)}})),...await Promise.all(allPosts.filter(post=>{return post.tags.includes(element.toLowerCase())}).map(async post=>{return {...post,...await getUser(post.user)}}))].filter((v,i,a)=>a.findIndex(v2=>(v2.postName===v.postName&&v2.user===v.user))===i)
        default :
            return await Promise.all(allPosts.map(async post=>{return {...post,...await getUser(post.user)}}))

    }
}
async function checkIfFollowing(user,checkUser){
    let followers = await userDB.doc(checkUser).collection('followers').get()
    return (followers.docs.some(doc => doc.id == user))
}
async function getAllUsers(){
    try {
        let users = await userDB.get() 
        users = users.docs.map(doc=>doc.id)
        return users
    } 
    catch (err) {
        console.log(err)
    }
}
module.exports = {notify,checkIfUserExists,checkElegible,getUserName,getUser,getAllPosts,getAllUserPosts,checkIfDocExists,getAllPostsFiltered,checkIfFollowing,getAllUsers}