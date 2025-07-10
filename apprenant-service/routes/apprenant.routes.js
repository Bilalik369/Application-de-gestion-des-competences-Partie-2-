import express from "express"
import {
    getAllApprenants,
    getApprenantById,
    createApprenant,
    updateApprenant,
    deleteApprenant,
    getBriefsParApprenant,
    affecterBrief,
    soumettreRendu,
    getHistoriqueRendus,
    getCompetencesRendu,
    getBriefsDisponibles,
    evaluerRendu
  }from "../controllers/apprenant.controller.js"

const router = express.Router();


router.get('/apprenants', getAllApprenants);
router.get('/apprenants/:id', getApprenantById);
router.post('/apprenants', createApprenant);
router.put('/apprenants/:id', updateApprenant);
router.delete('/apprenants/:id', deleteApprenant);

router.get('/apprenants/:id/briefs', getBriefsParApprenant);
router.post('/apprenants/:id/briefs/:briefId/affecter', affecterBrief);
router.get('/apprenants/:id/rendus', getHistoriqueRendus);


router.post('/rendus', soumettreRendu);
router.get('/rendus/:id/competences', getCompetencesRendu);
router.put('/rendus/:id/evaluer', evaluerRendu);


router.get('/briefs', getBriefsDisponibles);

export default router;