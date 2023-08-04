import { Plant } from "../models/Plant.js";
import {
  getPlant,
  getPlantImage,
  getWaterInfo,
  getSunlightInfo,
  getPruningInfo,
} from "../models/Plant.js";

export const plantSearchPage = async (req, res) => {
  res.render("main", {}); //render html based off the main.ejs file 
};
export const plantResultsPage = async (req, res) => {
  const plant = req.session.updatedPlantData;
  const image = req.session.image;
  console.log(plant);
  res.render("results", {plant: plant, image: image});
};

export const plantStore = async (req, res) => {
  const plantSearched = req.body.plantEntered;
  const plantInfo = await getPlant(plantSearched);
  const plantImage = await getPlantImage(plantSearched);
  const waterInfo = await getWaterInfo(plantInfo);
  const sunLightInfo = await getSunlightInfo(plantInfo);
  const pruningInfo = await getPruningInfo(plantInfo);
  // console.log(plantFound[0].waterInfo);//relook at functions above
  let image = plantImage.data[0].default_image.original_url;
  // let default_image = "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
  // try {
     
  //    console.log(image);
  //   // Proceed with using the image variable
  // } catch (error) {
  //   console.error("An error occurred while getting the image:", error);
  //   image = default_image;
  // }
 
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
    // res.send(addPlant);
  } else {
    let value = plantFound[0].timesSearched;
    value++;
    await Plant.updateOne(
      { name: plantSearched },
      { $set: { timesSearched: value } }
    );

    const updatedPlant = await Plant.find({ name: plantSearched }); //query database to retrieve the new updated value that was cached.
    req.session.updatedPlantData = updatedPlant; //storing data in a session/cookie to access variable after the redirect in my plantResultsPage
    req.session.image = image; 
  }
  res.redirect("/results");
};
