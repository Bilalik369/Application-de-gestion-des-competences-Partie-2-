import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("database connecting succussfly")
    } catch (error) {
        console.log("error to connecting to database")
        process.exit(1)
    }
}