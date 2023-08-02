import "dotenv/config";
import "./db.js";
import express from "express";
import router from "./routes.js";


const connectionString = process.env.API_CONNECTION;
export const app = express();
app.use(express.urlencoded({ extended: true })); //middleware for the server to handle multi-part-form-data on POST request and send it to the req.body
app.set("view engine", "ejs");//using ejs template to render HTML
app.use(router);//listening for acceptable client request URL from routes.js
app.listen(3000,() =>{
    console.log("Express Server started on port 3000");
});


export default app;
