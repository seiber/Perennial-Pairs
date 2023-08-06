import mongoose from "mongoose";
import axios from "axios";

const { Schema } = mongoose;

//designing table/database attributes with a schema
const plantSchema = new Schema({
  name: String,
  waterInfo: String,
  sunLightInfo: String,
  pruningInfo: String,
  timesSearched: Number,
});
//collection name = 'plant->plants'
export const Plant = mongoose.model("plant", plantSchema);

const connectionString = process.env.API_CONNECTION;
const connectionString2 = process.env.API2_CONNECTION;
export async function getPlant(plant) {
  const plantCall = await axios
    .get(connectionString + `&q=${plant}`, {
      accept: "application/json",
    })
    .catch((error) => {
      console.log(error.message);
    });
  // const plantInfo = plantCall.data.data[0].section;
  const plantInfo = await plantCall.data;
  return plantInfo;
}
//second API call to get the image_URL
export async function getPlantImage(plant) {
  const plantImageCall = await axios
    .get(connectionString2 + `&q=${plant}`, {
      accept: "application/json",
    })
    .catch((error) => {
      console.log(error.message);
    });
  const plantInfo = await plantImageCall.data;
  return plantInfo;
}

//the functions below are parsing data chuncks retrieved from my getPlant API call
export async function getWaterInfo(plantInfo) {
  return plantInfo.data[0].section[0].description;
}
export async function getSunlightInfo(plantInfo) {
  return plantInfo.data[0].section[1].description;
}
export async function getPruningInfo(plantInfo) {
  return plantInfo.data[0].section[2].description;
}
