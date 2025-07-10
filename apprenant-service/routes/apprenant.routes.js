import express from "express"
import {getAllApprenants , getApprenantById , createApprenant , updateApprenant , deleteApprenant, getBriefsParApprenant,affecterBrief} from "../controllers/apprenant.controller.js"

const router = express.Router();


router.get('/apprenants', getAllApprenants);
router.get('/apprenants/:id', getApprenantById);
router.post('/apprenants', createApprenant);
router.put('/apprenants/:id', updateApprenant);
router.delete('/apprenants/:id', deleteApprenant);

router.get('/apprenants/:id/briefs', getBriefsParApprenant);
router.post('/apprenants/:id/briefs/:briefId/affecter', affecterBrief);

export default router;