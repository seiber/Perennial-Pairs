import request from "supertest";
import app from "./index.js";
import cheerio from "cheerio";

test("/ should take to root route", async () =>{
   let response = await request(app).get("/");
   expect(response.statusCode).toBe(200);


   const $ = cheerio.load(response.text);
   const userInput = $("input[name='plantEntered']");
   expect(userInput).toHaveLength(1);
});