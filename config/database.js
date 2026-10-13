const mongoose = require("mongoose")

require("dotenv").config()

const dbConnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(console.log("Database connected successfully"))
    .catch( (err)=>{
        console.log("error in connecting to db "+err)
        process.exit(1);
    } )
         
    }


    module.exports = dbConnect;