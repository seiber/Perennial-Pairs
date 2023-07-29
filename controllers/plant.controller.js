import { Plant } from "../models/Plant.js";
import { getPlant, getWaterInfo,getSunlightInfo, getPruningInfo } from "../models/Plant.js";


export const plantSearch = async (req, res) => {
  res.render("main", {}); //render html based off the main.ejs file
  // const test = new Plant({ name: "test_name", description: "test_desc" });
  // await test.save();
  // console.log("from Plant.js saved");
  // const Plants = await Plant.find({});
  // console.log(Plants);
};


export const plantStore = async(req,res) =>{
const plantSearched = req.body.plantEntered;
const plant = await getPlant(plantSearched);
const waterInfo = await getWaterInfo(plant);
const sunLightInfo = await getSunlightInfo(plant);
const pruningInfo = await getPruningInfo(plant);
console.log(waterInfo);

//database
const addPlant = new Plant({ name: plantSearched, waterInfo: waterInfo, sunLightInfo: sunLightInfo, pruningInfo: pruningInfo});
await addPlant.save();
const Plants = await Plant.find({}); 
res.send(Plants);
// res.redirect("/");
}





