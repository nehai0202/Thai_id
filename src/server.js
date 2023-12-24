const express= require("express");
const connectDB = require("./config/db");
const bodyparser = require('body-parser'); 
const ApiRoutes = require('./routes/userroute');
const dotenv= require("dotenv");
//const app= express();

dotenv.config();
connectDB();
//app.use(express.json()); // to accept json data since taking values from frontent like name,email,pass,pic

// app.get("/", (req, res) => {
//   res.send("API Running!");
// });


const PORT= process.env.PORT || 5000


//app.listen(5000,console.log(`server on port  ${PORT}`));

const setupAndStartServer = async () =>{

    // create the express object
    const app = express();

    // middlewares
    app.use(express.json());
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({extended : true}));

    app.use('/api', ApiRoutes);
    app.get("/",(req,res)=>{
        res.send("api runing compleeetely ");
    })
    
    app.listen(PORT, ()=>{
        console.log(`Started server at ${PORT}`);
    }
    );
}

setupAndStartServer();