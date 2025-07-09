import express from "express"
import {getAllApprenants , getApprenantById , createApprenant , updateApprenant} from "../controllers/apprenant.controller.js"

const router = express.Router();


router.get('/apprenants', getAllApprenants);
router.get('/apprenants/:id', getApprenantById);
router.post('/apprenants', createApprenant);
router.put('/apprenants/:id', updateApprenant);
// router.delete('/apprenants/:id', deleteApprenant);

export default router;