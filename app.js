const express = require('express');

const app =express();



app.get("/",(req,res)=>{
    res.json({
        data:{
         
            message: "Start creating user on POST('/')."
        }
    })
})
app.post("/",(req,res)=>{
    res.json({
        data:{
            type:'success',
            data: ' YO LO !'
        }
    })
})
app.listen(8080,()=>{
    console.log("LISTENING ON PORT 8080");
})