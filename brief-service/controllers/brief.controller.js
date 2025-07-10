import Breif from '../models/Brief.model'
import axios from 'axios';
const COMPETENCE_SERVICE_URL = process.env.COMPETENCE_SERVICE_URL || 'http://localhost:3001';
const fetchCompetencesFromService = async () => {
  try {
    const response = await axios.get(`${COMPETENCE_SERVICE_URL}/api/competences`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des compétences:', error.message);
    throw new Error('Service de compétences indisponible');
  }
};

export const getAllBriefs = async (req, res) => {
  try {
    const briefs = await Brief.find().sort({ createdAt: -1 });
    res.status(200).json(briefs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBriefById = async (req, res) => {
  try {
    const brief = await Brief.findById(req.params.id);
    if (!brief) {
      return res.status(404).json({ message: "Brief non trouvé" });
    }
    res.status(200).json(brief);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createBrief = async (req, res) => {
  try {
    const newBrief = new Brief(req.body);
    await newBrief.save();
    res.status(201).json(newBrief);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateBrief = async (req, res) => {
  try {
    const updatedBrief = await Brief.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedBrief) {
      return res.status(404).json({ message: "Brief non trouvé" });
    }
    
    res.status(200).json(updatedBrief);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteBrief = async (req, res) => {
  try {
    const deletedBrief = await Brief.findByIdAndDelete(req.params.id);
    if (!deletedBrief) {
      return res.status(404).json({ message: "Brief non trouvé" });
    }
    res.status(200).json({ message: "Brief supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const associerCompetences = async (req, res) => {
  try {
    const { competenceIds } = req.body; // Array d'IDs de compétences
    
    const competencesDisponibles = await fetchCompetencesFromService();
    
    const competencesSelectionnees = competencesDisponibles
      .filter(comp => competenceIds.includes(comp._id))
      .map(comp => ({
        competenceId: comp._id,
        code: comp.code,
        nom: comp.nom
      }));
    
    const updatedBrief = await Brief.findByIdAndUpdate(
      req.params.id,
      { competences: competencesSelectionnees },
      { new: true, runValidators: true }
    );
    
    if (!updatedBrief) {
      return res.status(404).json({ message: "Brief non trouvé" });
    }
    
    res.status(200).json(updatedBrief);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getCompetencesByBrief = async (req, res) => {
  try {
    const brief = await Brief.findById(req.params.id);
    if (!brief) {
      return res.status(404).json({ message: "Brief non trouvé" });
    }
    
    res.status(200).json(brief.competences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCompetencesDisponibles = async (req, res) => {
  try {
    const competences = await fetchCompetencesFromService();
    res.status(200).json(competences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
