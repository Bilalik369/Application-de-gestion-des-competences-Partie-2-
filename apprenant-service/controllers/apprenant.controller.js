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