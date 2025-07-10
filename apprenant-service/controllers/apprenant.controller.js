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

  export const deleteApprenant = async (req, res) => {
    try {
      const deletedApprenant = await Apprenant.findByIdAndDelete(req.params.id);
      if (!deletedApprenant) {
        return res.status(404).json({ message: "Apprenant non trouvé" });
      }
      res.status(200).json({ message: "Apprenant supprimé avec succès" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  export const getBriefsParApprenant = async (req, res) => {
  try {
    const apprenantId = req.params.id;
    
  
    const apprenant = await Apprenant.findById(apprenantId);
    if (!apprenant) {
      return res.status(404).json({ message: "Apprenant non trouvé" });
    }
    
    
    const rendus = await Rendu.find({ apprenantId }).sort({ dateRendu: -1 });
    

    const briefsAffectes = rendus.map(rendu => ({
      briefId: rendu.briefId,
      briefTitre: rendu.briefTitre,
      statutRendu: rendu.statut,
      dateRendu: rendu.dateRendu,
      note: rendu.note,
      competencesAttendues: rendu.competencesAttendues
    }));
    
    res.status(200).json(briefsAffectes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const affecterBrief = async (req, res) => {
  try {
    const { id: apprenantId, briefId } = req.params;
    

    const apprenant = await Apprenant.findById(apprenantId);
    if (!apprenant) {
      return res.status(404).json({ message: "Apprenant non trouvé" });
    }
    
    
    const brief = await fetchBriefById(briefId);
    
   
    const renduExistant = await Rendu.findOne({ apprenantId, briefId });
    if (renduExistant) {
      return res.status(400).json({ message: "Brief déjà affecté à cet apprenant" });
    }
    
    
    const nouveauRendu = new Rendu({
      apprenantId,
      briefId,
      briefTitre: brief.titre,
      lienRendu: "https://placeholder.com", 
      statut: "en_cours_evaluation",
      competencesAttendues: brief.competences || []
    });
    
    await nouveauRendu.save();
    
    res.status(201).json({
      message: "Brief affecté avec succès",
      rendu: nouveauRendu
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const soumettreRendu = async (req, res) => {
  try {
    const { apprenantId, briefId, lienRendu, description } = req.body;
   
    const apprenant = await Apprenant.findById(apprenantId);
    if (!apprenant) {
      return res.status(404).json({ message: "Apprenant non trouvé" });
    }
    
 
    const brief = await fetchBriefById(briefId);
    
    
    const nouveauRendu = new Rendu({
      apprenantId,
      briefId,
      briefTitre: brief.titre,
      lienRendu,
      description,
      statut: "soumis",
      competencesAttendues: brief.competences || []
    });
    
    await nouveauRendu.save();
    
    res.status(201).json(nouveauRendu);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const getHistoriqueRendus = async (req, res) => {
  try {
    const apprenantId = req.params.id;
    

    const apprenant = await Apprenant.findById(apprenantId);
    if (!apprenant) {
      return res.status(404).json({ message: "Apprenant non trouvé" });
    }
    
    const rendus = await Rendu.find({ apprenantId }).sort({ dateRendu: -1 });
    

    const historiqueEnrichi = rendus.map(rendu => ({
      ...rendu.toObject(),
      nombreCompetences: rendu.competencesAttendues.length,
      competencesValidees: rendu.competencesAttendues.filter(c => c.statut === 'validée').length
    }));
    
    
    const stats = {
      totalRendus: rendus.length,
      rendusValides: rendus.filter(r => r.statut === 'validé').length,
      rendusEnCours: rendus.filter(r => r.statut === 'en_cours_evaluation').length,
      moyenneNotes: rendus.filter(r => r.note).reduce((acc, r) => acc + r.note, 0) / rendus.filter(r => r.note).length || 0
    };
    
    res.status(200).json({
      apprenantInfo: apprenant,
      rendus: historiqueEnrichi,
      statistiques: stats
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCompetencesRendu = async (req, res) => {
  try {
    const rendu = await Rendu.findById(req.params.id);
    if (!rendu) {
      return res.status(404).json({ message: "Rendu non trouvé" });
    }
    
    res.status(200).json({
      briefTitre: rendu.briefTitre,
      competencesAttendues: rendu.competencesAttendues,
      statutRendu: rendu.statut
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBriefsDisponibles = async (req, res) => {
  try {
    const briefs = await fetchBriefsFromService();
    res.status(200).json(briefs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const evaluerRendu = async (req, res) => {
  try {
    const { statut, note, commentaires } = req.body;
    
    const renduEvalue = await Rendu.findByIdAndUpdate(
      req.params.id,
      { statut, note, commentaires },
      { new: true, runValidators: true }
    );
    
    if (!renduEvalue) {
      return res.status(404).json({ message: "Rendu non trouvé" });
    }
    
    res.status(200).json(renduEvalue);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};