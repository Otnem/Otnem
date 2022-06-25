const {getUserName,getUser,checkIfDocExists} = require('../customFunctions')
const chatPage = async(req,res,next)=>{
    try{        
        let {user} = await req.query
        let userName = await getUserName(req)
        if(!userName)
        return res.redirect('login')
        if(!await checkIfDocExists(userDB,user))
        user = userName 
        const user1 = await getUser(userName)
        let user2 = await getUser(user)
    return res.send({userName:userName,profilePic:user1.profilePic,user:user,profilePic2:user2.profilePic})
}
catch(err){
    console.log(err)
}
}
const chatRoom = async(req,res)=>{
    try{
        let pacNum = (typeof req.query.packet === 'number' && req.query.packet >= 0)?req.query.packet:1
        let roomID
        const userName = await getUserName(req)
        const{user} = await req.query
        if(!await checkIfDocExists(userDB,user))
        return res.send(`${user} doesnt exist`)
        if(userName != userName && userName != user)
        return res.send("Access denied")
        if(userName == user)
        return res.send('You cant chat with yourself looser loner garbage')
        const snap = await chatRoomDB.get()
        snap.docs.forEach(doc=>{
            let data = doc.data()
            if(data.users.includes(userName)){
                if(data.users.includes(user))
                roomID = doc.id
            }
        })
        if(!roomID){
            let response = await chatRoomDB.add({users:[userName,user]})
            roomID = response.id
        }
        let chatSnap = await chatRoomDB.doc(roomID).collection('chats').orderBy('time').get()
        let chats = []
        let pacLen = 50
        let index = chatSnap.docs.length - (pacNum * pacLen)
        if(index >= 0){
            for( i = index, j = 0; i < index + pacLen; i++ , j++ ){
                if(chatSnap.docs[i])
                    chats[j] = chatSnap.docs[i].data()
            }
        }
        else{
            chats = chatSnap.docs.map(doc =>{ return doc.data() })
        }
        return res.send({chats:chats,chatRoomId:roomID})
    }catch(err){
        console.log(err)
    }
}
const getChatMembers = async(req,res)=>{
    try{
        const userName = await getUserName(req)
        let chatsSnap = await chatRoomDB.where('users','array-contains',`${userName}`).get()
        if(!chatsSnap)
        return res.send({chats:[]})
        let chats = []
        let users = []
        await Promise.all(chatsSnap.docs.map(async doc=>{
            let data = doc.data()
            data.users = data.users.filter(e=>e!==`${userName}`)
            data.users = data.users[0]
            if(users.includes(data.users))
            return await chatRoomDB.doc(doc.id).delete()
            users.push(data.users)
            data['userData'] = await getUser(data.users)
            let unRead = ((await userDB.doc(userName).collection('unRead').doc(data.users).get()).data())
            data['unread'] = (unRead)?unRead.num:0
            chats.push({...data,...{id:doc.id}})
        }))
        function compare( a, b ) {
            if ( a.time > b.time ){
                return -1;
            }
            if ( a.time < b.time ){
                return 1;
            }
            return 0;
        }
        chats = chats.sort(compare)
        return res.send({chats:chats})
    }
    catch(err){
        console.log(err)
    }
}
module.exports = {chatPage,chatRoom,getChatMembers}
const { userDB, chatRoomDB } = require('./posts')