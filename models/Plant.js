import mongoose from "mongoose";
const { Schema } = mongoose;

//designing table/database attributes with a schema
const plantSchema = new Schema({
name: String, 
description: String
});

export const Plant = mongoose.model('Plant', plantSchema);

const test = new Plant({name: "test_name", description: "test_desc"});
await test.save();
console.log("from Plant.js saved");


export default Plant;