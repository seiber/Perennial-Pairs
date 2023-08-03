import { Plant } from "../models/Plant.js";
import {
  getPlant,
  getWaterInfo,
  getSunlightInfo,
  getPruningInfo,
} from "../models/Plant.js";

export const plantSearch = async (req, res) => {
  res.render("main", {}); //render html based off the main.ejs file
  // const test = new Plant({ name: "test_name", description: "test_desc" });
  // await test.save();
  // console.log("from Plant.js saved");
  // const Plants = await Plant.find({});
  // console.log(Plants);
};

export const plantStore = async (req, res) => {
  const plantSearched = req.body.plantEntered;
  const plantInfo = await getPlant(plantSearched);
  const waterInfo = await getWaterInfo(plantInfo);
  const sunLightInfo = await getSunlightInfo(plantInfo);
  const pruningInfo = await getPruningInfo(plantInfo);

  // database
  const plantFound = await Plant.find({ name: plantSearched });

  //if the array is empty, it does not exist in the database, So it will be added.
  if (plantFound.length === 0) {
    const addPlant = new Plant({
      name: plantSearched,
      waterInfo: waterInfo,
      sunLightInfo: sunLightInfo,
      pruningInfo: pruningInfo,
      timesSearched: 1,
    });
    await addPlant.save();
    res.send(addPlant);
  } else {
   let value =  plantFound[0].timesSearched;
    value++;
    console.log(value);
   await Plant.updateOne({name:plantSearched},{$set:{timesSearched:value}}); 
   //query database to retrieve the new updated value that was cached.
   const updatedPlant = await Plant.find({ name: plantSearched });
     res.send(updatedPlant);
  }
  // res.redirect("/");
};
