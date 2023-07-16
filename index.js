import 'dotenv/config';
import axios from "axios";
import express from "express";
import router from "./routes.js";



const connectionString = process.env.API_CONNECTION;
const app = express();

app.use(router);//listening for acceptable client request URL from routes.js
app.listen(3000,()=>{
    console.log("Express Server started on port 3000");
});
async function getPlant(plant) {
    const plantInfo  = await axios.get(connectionString+`&q=${plant}`,{accept: "application/json"});
    console.log(plantInfo.data.data[0].section);
}
getPlant("iris");

