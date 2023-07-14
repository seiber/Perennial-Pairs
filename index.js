import 'dotenv/config';
import axios from "axios";
import express from "express";
import router from "./routes.js";



const connectionString = process.env.API_CONNECTION;

async function getPlant(plant) {
    const plantInfo  = await axios.get(connectionString+`&q=${plant}`,{accept: "application/json"});
    console.log(plantInfo.data.data[0].section);
}
getPlant("iris");

