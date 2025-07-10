import express from 'express';
import {
  getAllBriefs,
  getBriefById,
  createBrief,
  updateBrief,
  deleteBrief,
  associerCompetences,
  getCompetencesByBrief,
  getCompetencesDisponibles
} from '../controllers/brief.controller.js';

const router = express.Router();

// Routes pour les briefs
router.get('/briefs', getAllBriefs);
router.get('/briefs/:id', getBriefById);
router.post('/briefs', createBrief);
router.put('/briefs/:id', updateBrief);
router.delete('/briefs/:id', deleteBrief);

// Routes pour les compétences
router.post('/briefs/:id/competences', associerCompetences);
router.get('/briefs/:id/competences', getCompetencesByBrief);
router.get('/competences', getCompetencesDisponibles);

export default router;