require("dotenv").config();
//connecting to db
require("./config/thinky");
const express = require("express");
const cors = require("cors");
const consola = require("consola");
const passport = require("passport");
const userRouter = require("./routes/users");
const { passportFun } = require("./middleware/passport");
const app = express();
const PORT = process.env.APP_SERVER_PORT;

//middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
passportFun(passport);

//authRouter
app.use("/api/users", userRouter);

//server listen 
app.listen(PORT, () => {
  consola.success(`Server Started at port ${PORT}`);
});
