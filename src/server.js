const express= require("express");
const app= express();

app.get("/",(req,res)=>{
    res.send("api runing");
})

app.listen(5000,console.log("server on port 5000"));