import express from "express";
// import Plant  from "./models/Plant.js";

const router = express.Router();

router.get("/", async(req,res) =>{
// const Plants = await Plants.find({});
res.render("main",{});//render html based off the main.ejs file
});

export default router;
