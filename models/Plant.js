import mongoose from "mongoose";
import axios from "axios";

const { Schema } = mongoose;

//designing table/database attributes with a schema
const plantSchema = new Schema({
name: String, 
description: String
});
                                //collection name = 'plant->plants'
export const Plant = mongoose.model('plant', plantSchema);

const connectionString = process.env.API_CONNECTION;
export async function getPlant(plant) {
    console.log(plant);
  const plantCall = await axios.get(connectionString+`&q=${plant}`,{accept: "application/json"});
  const plantInfo = plantCall.data.data[0].section;
  console.log(plantInfo);
}
// getPlant("tom")


