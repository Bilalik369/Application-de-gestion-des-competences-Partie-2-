import mongoose, { trusted } from "mongoose";
const BreifSchema = new mongoose.Schema({
    titre:{
        type:String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    dateDebut: {
        type: Date,
        required: true
    },
    dateFin: {
        type: Date,
        required: true
    },
    competences: [{
        competenceId: {
            type: String,
            required: true
        },
        code: {
            type: String,
            required: true
        },
        nom: {
            type: String,
            required: true,
        }
    }],
    statut: {
        type: String,
        enum: ["brouillon","publié","archivé"],
        default:"brouillon"

    }
},{ timestamps: true});
export default mongoose.model('breif', BreifSchema);