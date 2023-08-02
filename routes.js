import express from "express";
import { plantSearch, plantStore} from "./controllers/plant.controller.js";

const router = express.Router();
router.get("/", plantSearch);
router.post("/", plantStore);

export default router;
