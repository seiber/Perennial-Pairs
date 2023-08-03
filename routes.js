import express from "express";
import { plantSearchPage, plantResultsPage, plantStore} from "./controllers/plant.controller.js";

const router = express.Router();
router.get("/", plantSearchPage);
router.get("/results", plantResultsPage);
router.post("/", plantStore);

export default router;
