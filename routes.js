import express from "express";
import { plantSearchPage, plantResultsPage, plantStore,plantErrorPage} from "./controllers/plant.controller.js";

const router = express.Router();
router.get("/", plantSearchPage);
router.get("/results", plantResultsPage);
router.get("/error", plantErrorPage);
router.post("/", plantStore);

export default router;
