import express from "express";
import { plantSearch } from "./controllers/plant.controller.js";

const router = express.Router();

router.get("/", plantSearch);



export default router;
