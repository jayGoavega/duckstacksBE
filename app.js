require("dotenv").config();
//connecting to db
require("./config/thinky");
const express = require("express");
const cors = require("cors");
const consola = require("consola");

const userRouter = require("./routes/users");
const app = express();
const PORT = process.env.APP_SERVER_PORT;

//muddileware
app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter);

//server listen
app.listen(PORT, () => {
  consola.success(`Server Started at port ${PORT}`);
});
