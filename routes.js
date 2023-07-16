import express from "express";
// import Plant from "./models/Plant.js";

const router = express.Router();

router.get("/", (req,res)=>{
res.send("connected");
});

export default router;
