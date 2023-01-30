import mongoose from "mongoose";

mongoose.set("strictQuery", false);
const connection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/FileTest", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database connected successfully");
  } catch (error) {
    console.log("error while connectiong to database", error.message);
  }
};

export default connection;
