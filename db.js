import mongoose from "mongoose";

const dbString = process.env.DB_CONNECTION;

mongoose.connect(dbString);

mongoose.connection.on("open", () => {
  console.log("connected to mongodb");
});
