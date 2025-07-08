import mongoose from "mongoose";

export const connectDb= async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("data base connicting succusfly")
    } catch (error) {
        console.log("error to concting ti data base ")
        process.exit(1)
        
    }
}