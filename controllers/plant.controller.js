import { Plant } from "../models/Plant.js";
import {getPlant,getPlantImage,getWaterInfo,getSunlightInfo,getPruningInfo,} from "../models/Plant.js";

export const plantSearchPage = async (req, res) => {
  res.render("main", {}); //render html based off the main.ejs file
};
export const plantResultsPage = async (req, res) => {
  const plant = req.session.updatedPlantData;
  const image = req.session.image;
  const suggestedNames = req.session.suggestedNames;
  res.render("results", { plant: plant, image: image, suggestedNames: suggestedNames });
};
export const plantErrorPage = async (req, res) => {
  res.render("error");
};

export const plantStore = async (req, res) => {
  try {
    const plantSearched = req.body.plantEntered;
    const plantInfo = await getPlant(plantSearched);
    const plantImage = await getPlantImage(plantSearched);
    const waterInfo = await getWaterInfo(plantInfo);
    const sunLightInfo = await getSunlightInfo(plantInfo);
    const pruningInfo = await getPruningInfo(plantInfo);
    let image = plantImage.data[0].default_image.original_url;
    const suggestedNames = plantInfo.data.map(info => info.common_name);//mapping a new array of suggested plant names to display to the user on front-end
    //database
    const plantSearchedUpper = plantSearched.toUpperCase(); // forcing the query params to uppercase to avoid multiple database entries with different case-sens tomato vs tOmaTo
    const plantFound = await Plant.find({ name: plantSearchedUpper });
    if (plantFound.length === 0) {
      //if the array is empty, it does not exist in the database, So it will be added.
      const addPlant = new Plant({
        name: plantSearchedUpper,
        waterInfo: waterInfo,
        sunLightInfo: sunLightInfo,
        pruningInfo: pruningInfo,
        timesSearched: 1,
      });
      req.session.plantSearchedUpper = plantSearchedUpper;

      await addPlant.save();
    } else {
      let value = plantFound[0].timesSearched;
      value++;
      await Plant.updateOne(
        { name: plantSearchedUpper },
        { $set: { timesSearched: value } }
      );
    }
    const updatedPlant = await Plant.find({ name: plantSearchedUpper }); //query database to retrieve the new updated value that was cached.
    req.session.updatedPlantData = updatedPlant; //storing data in a session/cookie to access variable after the redirect in my plantResultsPage
    req.session.image = image;
    req.session.suggestedNames = suggestedNames;
    res.redirect("/results");
   } catch (error) {
     res.redirect("/error");
   }
};
