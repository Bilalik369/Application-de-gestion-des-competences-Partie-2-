import Apprenant from "../models/Apprenant.model.js";
import Rendu from "../models/Rendu.model.js"
import axios from "axios"


const BRIEF_SERVICE_URL = process.env.BRIEF_SERVICE_URL ;


const fetchBriefsFromService = async()=>{
    try {
        const response =  await axios.get(`${BRIEF_SERVICE_URL}/api/briefs`)
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des briefs:', error.message")
        throw new Error('Service de briefs indisponible');
    }
}

const fetchBriefById  = async()=>{
    try {
        const response = await axios.get(`${BRIEF_SERVICE_URL}/api/briefs/${briefId}`)
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération du brief:', error.message);
    throw new Error('Brief non trouvé');
    }
    
}



export const getAllApprenants = async(req , res)=>{
    try {
        const apprenants  = await Apprenant.find().sort({nom : 1});
        res.status( 201).json({apprenants})
    } catch (error) {
        res.status(500).json({error : error.message})
    }
};

export const getApprenantById = async (req, res) => {
    try {
      const apprenant = await Apprenant.findById(req.params.id);
      if (!apprenant) {
        return res.status(404).json({ message: "Apprenant non trouvé" });
      }
      res.status(200).json(apprenant);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const createApprenant = async (req, res) => {
    try {
      const newApprenant = new Apprenant(req.body);
      await newApprenant.save();
      res.status(201).json(newApprenant);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


  export const updateApprenant = async (req, res) => {
    try {
      const updatedApprenant = await Apprenant.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      
      if (!updatedApprenant) {
        return res.status(404).json({ message: "Apprenant non trouvé" });
      }
      
      res.status(200).json(updatedApprenant);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
