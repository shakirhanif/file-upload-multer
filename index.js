import express from "express";
import bodyParser from "body-parser";
import route from "./routes/router.js";
import connection from "./database/db.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
connection();
app.use("/", route);
app.listen(3000, () => {
  console.log("server started at 3000");
});
