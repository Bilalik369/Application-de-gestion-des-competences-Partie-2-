
import express from "express";
import dotenv from "dotenv";
import {connectDb} from "./lib/db.js"


dotenv.config()


const app = express();

const PORT = process.env.PORT 

connectDb()

app.listen(PORT , ()=>{
    console.log(`server is ranning in PORT ${PORT}`)
})


