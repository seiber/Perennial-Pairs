import 'dotenv/config';
import axios from "axios";

const connectionString = process.env.API_CONNECTION

//output the most popular searched plant from database
//if the plant is already in my data base, increase the number of times it has been searched by 1 ++
async function getPlant(plant) {
    const plantInfo  = await axios.get(connectionString+`&q=${plant}`,{accept: "application/json"});
    console.log(plantInfo.data.data[0].section);
}
getPlant("iris");
