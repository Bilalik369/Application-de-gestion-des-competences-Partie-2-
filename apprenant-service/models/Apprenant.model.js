import mongoose from "mongoose";



const ApprenantSchema  = new mongoose.Schema({
    nome : {
        type : String,
        required : true,
        trim : true, 

    }, 
    prenome : {
        type : String, 
        required : true, 
        trim : true
    },
    email : {
        type :String ,
        required : true ,
        unique : true , 

    }, 
    promotion : {
        type : String , 
        required : true, 

    }, 
    statut : {
        type : String , 
        enum: ["actif", "inactif", "diplômé"],
        default : "actif"
    }
} , {timestamps : true})


export default mongoose.model("Apprenant" , ApprenantSchema);