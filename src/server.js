const express= require("express");
const dotenv= require("dotenv");
const app= express();

dotenv.config();
const PORT= process.env.PORT || 5000
app.get("/",(req,res)=>{
    res.send("api runing compleeetely ");
})

app.listen(5000,console.log(`server on port  ${PORT}`));