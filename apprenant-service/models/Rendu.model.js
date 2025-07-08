import mongoose from "mongoose";

const RenduSchema = new mongoose.Schema({
  apprenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Apprenant',
    required: true
  },
  briefId: {
    type: String, 
    required: true
  },
  briefTitre: {
    type: String,
    required: true
  },
  lienRendu: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+/.test(v);
      },
      message: "Le lien doit être une URL valide"
    }
  },
  description: {
    type: String,
    trim: true
  },
  statut: {
    type: String,
    enum: ["soumis", "en_cours_evaluation", "validé", "refusé"],
    default: "soumis"
  },
  dateRendu: {
    type: Date,
    default: Date.now
  },
  competencesAttendues: [{
    competenceId: String,
    code: String,
    nom: String
  }],
  note: {
    type: Number,
    min: 0,
    max: 20
  },
  commentaires: {
    type: String,
    trim: true
  }
}, { timestamps: true });

export default mongoose.model('Rendu', RenduSchema);