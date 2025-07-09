import express from "express"
import {getAllApprenants , getApprenantById } from "../controllers/apprenant.controller.js"

const router = express.Router();


router.get('/apprenants', getAllApprenants);
router.get('/apprenants/:id', getApprenantById);

export default router;