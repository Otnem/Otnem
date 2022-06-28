const login = (req,res)=>res.send({success:true}).status(202)
const register = (req,res)=>res.send({success:true}).status(202)
const registerPost= async(req,res)=>{
    try{
        const body = await req.body
        const userSnapshot = await userDB.get()
        if(!(body.password && body.email && body.name))
            return res.send({success:false,msg:"Missing credentials"}).status(401)
        if(body.password.length < 8)
            return res.send({success:false,msg:"Password too short"}).status(401)
        if(body.name.length < 5)
            return res.send({success:false,msg:"Username not length too small"}).status(401)
        if(body.name.length > 20)
            return res.send({success:false,msg:"Username not length too large"}).status(401)
        if(body.name.includes('%'))
            return res.send({success:false,msg:"% sign cant be included sowwy"}).status(401)
        let users = userSnapshot.docs.map(doc=>{
        if(doc.data().name)
            return doc.data()
        })
        users = users.filter(e=>e!==undefined)
        for(i=0;i<users.length;i++){
        if(users[i].name == body.name)
        return res.send({success:false,msg:"Another user with same name already exists"}).status(401)
        if(users[i].email == body.email)
        return res.send({success:false,msg:"Another user with same email alredy exists"}).status(401)
        }
        const hashedPasswrod = await bcrypt.hash(body.password,10)
        let userInfoObj = {
        name:body.name,
        email:body.email,
        password:hashedPasswrod,
        image:'https://media.istockphoto.com/vectors/anonymity-concept-icon-in-neon-line-style-vector-id1259924572?k=20&m=1259924572&s=612x612&w=0&h=Xeii8p8hOLrH84PO4LJgse5VT7YSdkQY_LeZOjy-QD4=',
        paypal:"www.paypal.com/",
        banner:"https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
        let docref = await unVerifiedDB.add(userInfoObj)
        let transporter = emailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.BUISSNESS_EMAIL,
                pass:process.env.BUISSNESS_EMAIL_PASSWORD
            }
        })
        await transporter.sendMail({
            from:process.env.BUISSNESS_EMAIL,
            to:body.email,
            subject:'Verification link',
            text:`The verifiation link is ${process.env.VERIFY_LINK}?id=${docref.id}`,
            html:`<h1>Mento</h1><br><h3>The verifiation link is ${process.env.VERIFY_LINK}?id=${docref.id}</h3>`
        })
        return res.send({success:true,redirect:'/red'}).status(202)
    }
    catch(err){
        console.log(err)
    }
}
const loginPost = async(req,res)=>{
    try{
        let body = await req.body
        if(!body.password || !body.email)
            return res.send({success:false,msg:"Fields missing"}).status(400)
        let snap = await userDB.where('email', '==', body.email).get()
        let userName = snap.docs.map(doc=>{return doc.id})
        userName = userName.filter(e=>e!==undefined)
        userName = userName[0]
        body['name'] = userName
        if(!userName)
            return res.send({success:false,msg:"Wrong Email"}).status(401)
        bcrypt.compare(body.password,((await userDB.doc(userName).get()).data()).password,(err,bcResponse)=>{
            if(!bcResponse)
                return res.send({success:false,msg:"Wrong Password"}).status(401)
            req.login(body,()=>{})
            console.log(req.session)
            return res.send({success:true}).status(202)
        })
    }
    catch(err){
        console.log(err)
    }
}
const verifyUser = async(req,res)=>{
    try{
        const {id} = await req.query
        let credentials = (await unVerifiedDB.doc(id).get()).data()
        if(!credentials)
            return res.send({success:false,msg:'Wrong verification id or user already exists'}).status(401)
        if((await userDB.doc(credentials.name).get()).data())
            return res.send({success:false,msg:'User already exists'}).status(401)
        await userDB.doc(credentials.name).set(credentials)
        await unVerifiedDB.doc(id).delete()
        res.send({success:true}).status(201)
    }
    catch(err){
        console.log(err)
    }
}
const logout = async(req,res)=>{
    await req.logout()
    res.send({success:true}).status(200)
}
module.exports = {loginPost,registerPost,verifyUser,logout,login,register}
const { userDB, bcrypt, unVerifiedDB, emailer } = require('./posts')