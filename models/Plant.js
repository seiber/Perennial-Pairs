import mongoose from "mongoose";
const { Schema } = mongoose;

//designing table/database attributes with a schema
const plantSchema = new Schema({
name: String, 
description: String
});
                                //collection name = 'plant->plants'
export const Plant = mongoose.model('plant', plantSchema);




