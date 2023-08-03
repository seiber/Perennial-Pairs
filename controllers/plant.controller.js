import { Plant } from "../models/Plant.js";
import {
  getPlant,
  getWaterInfo,
  getSunlightInfo,
  getPruningInfo,
} from "../models/Plant.js";

export const plantSearchPage = async (req, res) => {
  res.render("main", {}); //render html based off the main.ejs file
};
export const plantResultsPage = async (req, res) => {
  const plant = req.session.updatedPlantData;
  // res.send(updatedPlant);
  res.render("results", {plant: plant});
};

export const plantStore = async (req, res) => {
  const plantSearched = req.body.plantEntered;
  const plantInfo = await getPlant(plantSearched);
  const waterInfo = await getWaterInfo(plantInfo);
  const sunLightInfo = await getSunlightInfo(plantInfo);
  const pruningInfo = await getPruningInfo(plantInfo);
  // console.log(plantFound[0].waterInfo);//relook at functions above

  // database
  const plantFound = await Plant.find({ name: plantSearched });
  if (plantFound.length === 0) {
    //if the array is empty, it does not exist in the database, So it will be added.
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
    let value = plantFound[0].timesSearched;
    value++;
    await Plant.updateOne(
      { name: plantSearched },
      { $set: { timesSearched: value } }
    );

    const updatedPlant = await Plant.find({ name: plantSearched }); //query database to retrieve the new updated value that was cached.
    req.session.updatedPlantData = updatedPlant; //storing data in a session/cookie to access variable after the redirect in my plantResultsPage
    res.redirect("/results");
  }
};
