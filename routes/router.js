import express from "express";
import upload from "../middlewares/multer-gridfs.js";
import grid from "gridfs-stream";
import mongoose from "mongoose";
const url = "http://localhost:3000";
const conn = mongoose.connection;
let gfs;
let gridFsBucket;
conn.once("open", () => {
  gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "fs",
  });
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("fs");
});

const route = express.Router();
route.get("/", (req, res) => {
  res.status(200).json({ message: req.body.message });
});
route.post("/upload", upload.single("myphoto"), (req, res) => {
  console.log(req.file);
  res.status(200).json("uploaded success");
});

route.get("/file/:filename", async (req, res) => {
  const file = await gfs.files.findOne({ filename: req.params.filename });
  const readStream = gridFsBucket.openDownloadStream(file._id);
  readStream.pipe(res);
});

export default route;
