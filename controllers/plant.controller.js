import { Plant } from "../models/Plant.js";

export const plantSearch = async (req, res) => {
  res.render("main", {}); //render html based off the main.ejs file
  const test = new Plant({ name: "test_name", description: "test_desc" });
  await test.save();
  console.log("from Plant.js saved");
  const Plants = await Plant.find({});
  console.log(Plants);
};


