import express from "express";
import { plantSearch, sendPlant } from "./controllers/plant.controller.js";

const router = express.Router();

router.get("/", plantSearch);
router.post("/", sendPlant)



export default router;
