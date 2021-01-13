const express = require("express");
const router = express.Router();
const { userRegister, userLogin } = require("../utils/auth");

//admin register route
router.post("/register-admin", async (req, res) => {
  await userRegister(req.body, "admin", res);
});
//sponsor register route
router.post("/register-sponsor", async (req, res) => {
  await userRegister(req.body, "sponsor", res);
});
//doctor register route
router.post("/register-doctor", async (req, res) => {
  await userRegister(req.body, "doctor", res);
});
//consultant register route
router.post("/register-consultant", async (req, res) => {
  await userRegister(req.body, "consultant", res);
});

// *******************************************

//admin login route
router.post("/login-admin", async (req, res) => {
  await userLogin(req.body, "admin", res);
});

//sponsor login route
router.post("/login-sponsor", async (req, res) => {
  await userLogin(req.body, "sponsor", res);
});

//doctor login route
router.post("/login-doctor", async (req, res) => {
  await userLogin(req.body, "doctor", res);
});

//consultant login route
router.post("/login-consultant", async (req, res) => {
  await userLogin(req.body, "consultant", res);
});

// *********************************************

//admin procted route
router.post("/", (req, res) => {});

//sponsor procted route
router.post("/", (req, res) => {});

//doctor procted route
router.post("/", (req, res) => {});

//consultant procted route
router.post("/", (req, res) => {});

module.exports = router;
