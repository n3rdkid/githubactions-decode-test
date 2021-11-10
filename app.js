const express = require('express');

const app =express();
app.use(require("cors")());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const firebaseAdmin = require("firebase-admin");

const serviceAccount = require('./serviceAccountKey.json');
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
});



app.get("/",(req,res)=>{
    res.json({
        data:{
         
            message: "Start creating user on POST('/')."
        }
    })
})


app.post("/",async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password || email==='' || password===''){
        return res.status(400).json({
            error:"SOME TING WENT WONG!"
        })
    }
    try{
    const user = await firebaseAdmin.auth().createUser({ email, password });
    res.json({
        data:{
            type:'success',
            data: {'id':user.id,'email':user.email}
        }
    })
}catch(e){
    return res.status(400).json({
        error:e
    })
}
})

app.listen(8080,()=>{
    console.log("LISTENING ON PORT 8080");
})