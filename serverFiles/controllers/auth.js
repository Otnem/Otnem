const login = async(req,res)=>{
    res.send({layout:'loginLayout'})
}
const register = async(req,res)=>{
    res.send({layout:'registerLayout'})
}
const registerPost= async(req,res)=>{
    try{
        const body = await req.body
        const userSnapshot = await userDB.get()
        if(body.password.length < 8)
            return res.send({layout:'registerLayout',err:true,msg:"Password too short"})
        if(body.name.length < 5)
            return res.send({layout:'registerLayout',err:true,msg:"Username not length too small"})
        if(body.name.length > 20)
            return res.send({layout:'registerLayout',err:true,msg:"Username not length too large"})
        if(body.name.includes('%'))
            return res.send({layout:'registerLayout',err:true,msg:"% sign cant be included sowwy"})
        let users = userSnapshot.docs.map(doc=>{
        if(doc.data().name)
            return doc.data()
        })
        users = users.filter(e=>e!==undefined)
        for(i=0;i<users.length;i++){
        if(users[i].name == body.name)
        return res.send({layout:'registerLayout',err:true,msg:"Another user with same name already exists"})
        if(users[i].email == body.email)
        return res.send({layout:'registerLayout',err:true,msg:"Another user with same email alredy exists"})
        }
        const hashedPasswrod = await bcrypt.hash(body.password,10)
        let userInfoObj = {
        name:body.name,
        email:body.email,
        password:hashedPasswrod,
        image:'https://media.istockphoto.com/vectors/anonymity-concept-icon-in-neon-line-style-vector-id1259924572?k=20&m=1259924572&s=612x612&w=0&h=Xeii8p8hOLrH84PO4LJgse5VT7YSdkQY_LeZOjy-QD4=',
        paypal:"www.paypal.com/",
        banner:"http://localhost:1000/assets/img/grid.jpg"
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
        return res.redirect('redPage')
    }
    catch(err){
        console.log(err)
    }
}
const loginPost = async(req,res)=>{
    try{
        let body = await req.body
        if(!body.password || !body.email)
            return res.send({layout:'loginLayout',err:true,msg:"Fields missing"})
        let snap = await userDB.where('email', '==', body.email).get()
        let userName = snap.docs.map(doc=>{return doc.id})
        userName = userName.filter(e=>e!==undefined)
        userName = userName[0]
        body['name'] = userName
        if(!userName)
            return res.send({layout:'loginLayout',err:true,msg:"Wrong Email"})
        bcrypt.compare(body.password,((await userDB.doc(userName).get()).data()).password,(err,bcResponse)=>{
            if(!bcResponse)
                return res.send({layout:'loginLayout',err:true,msg:"Wrong Password"})
            req.login(body,(error,response)=>{
            })
            return res.redirect('/')
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
            return res.send('Wrong verification id or user already exists')
        if((await userDB.doc(credentials.name).get()).data())
            return res.send('User already exists')
        await userDB.doc(credentials.name).set(credentials)
        await unVerifiedDB.doc(id).delete()
        res.redirect('login')
    }
    catch(err){
        console.log(err)
    }
}
const logout = async(req,res)=>{
    await req.logout()
    res.end()
}
module.exports = {login,register,loginPost,registerPost,verifyUser,logout}
const { userDB, bcrypt, unVerifiedDB, emailer } = require('./posts')