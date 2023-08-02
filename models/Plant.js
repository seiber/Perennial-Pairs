import mongoose from "mongoose";
import axios from "axios";

const { Schema } = mongoose;

//designing table/database attributes with a schema
const plantSchema = new Schema({
  name: String,
  waterInfo: String,
  sunLightInfo: String,
  pruningInfo: String,
});
//collection name = 'plant->plants'
export const Plant = mongoose.model("plant", plantSchema);

const connectionString = process.env.API_CONNECTION;
export async function getPlant(plant) {
  const plantCall = await axios.get(connectionString + `&q=${plant}`, {
    accept: "application/json",
  })
  .catch((error) => {
    console.log(error.message);
  })
   // const plantInfo = plantCall.data.data[0].section;
  const plantInfo = await plantCall.data;
  return plantInfo;
}

//the functions below are parsing data chuncks retrieved from my getPlant API call
export async function getWaterInfo(plantInfo)
{
  const wateringDescriptionsArray = plantInfo.data.map(plant => {
    const wateringSection = plant.section.find(section => section.type === "watering");
    return wateringSection ? wateringSection.description : null;
  });
//concatenating array to store as a string in my database waterInfo field
  const wateringDescriptionsString = wateringDescriptionsArray.join('\n');
  return wateringDescriptionsString;
}
export async function getSunlightInfo(plantInfo)
{
  const sunLightDescriptionsArray = plantInfo.data.map(plant => {
    const sunLightSection = plant.section.find(section => section.type === "sunlight");
    return sunLightSection ? sunLightSection.description : null;
  });
  const sunLightDescriptionsString = sunLightDescriptionsArray.join('\n');
  return sunLightDescriptionsString;
}
export async function getPruningInfo(plantInfo)
{
  const pruningDescriptionsArray = plantInfo.data.map(plant => {
    const pruningSection = plant.section.find(section => section.type === "pruning");
    return pruningSection ? pruningSection.description : null;
  });
  const pruningDescriptionsString = pruningDescriptionsArray.join('\n');
  return pruningDescriptionsString;
}


