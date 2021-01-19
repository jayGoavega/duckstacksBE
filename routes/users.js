const express = require("express");
const router = express.Router();
const { userRegister, userLogin } = require("../utils/auth");
const {
  checkAuth,
  serializeUser,
  checkRole,
} = require("../middleware/checkUser");
const { getAllUsers, getSingleRole } = require("../controllers/user");

// *******************************************

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
  console.log(req.body);
  await userLogin(req.body, ["admin"], res);
});

//sponsor login route
router.post("/login-sponsor", async (req, res) => {
  await userLogin(req.body, ["sponsor"], res);
});

//doctor login route
router.post("/login-doctor", async (req, res) => {
  await userLogin(req.body, ["doctor"], res);
});

//consultant login route
router.post("/login-consultant", async (req, res) => {
  await userLogin(req.body, ["consultant"], res);
});

//common login route
router.post("/login-common", async (req, res) => {
  await userLogin(req.body, ["admin", "sponsor", "doctor", "consultant"], res);
});

// *******************************************

//getting all admin role
router.get("/get-admin", checkAuth, checkRole(["admin"]), async (req, res) => {
  await getSingleRole("admin", res);
});

router.get(
  "/get-doctor-only",
  checkAuth,
  checkRole(["doctor"]),
  async (req, res) => {
    await getSingleRole("doctor", res);
  }
);
//getting all sponsor role
router.get(
  "/get-sponsor",
  checkAuth,
  checkRole(["admin", "sponsor"]),
  async (req, res) => {
    await getSingleRole("sponsor", res);
  }
);
//getting all doctor role
router.get(
  "/get-doctor",
  checkAuth,
  checkRole(["admin", "sponsor"]),
  async (req, res) => {
    await getSingleRole("doctor", res);
  }
);
//getting all consultant role
router.get(
  "/get-consultant",
  checkAuth,
  checkRole(["admin", "sponsor"]),
  async (req, res) => {
    await getSingleRole("consultant", res);
  }
);

// *********************************************

//use for all authentication
router.post(
  "/allprofile",
  checkAuth,
  checkRole(["admin", "sponsor", "doctor", "consultant"]),
  (req, res) => {
    res.json(serializeUser(req.user));
  }
);

//getAllUserList - for admin
router.get("/get-all-users", checkAuth, async (req, res) => {
  await getAllUsers(res);
});

//getUsersCreated by sponsor
// router.get("/get-sponsor-created-users", checkAuth, async (req, res) => {

// });

//admin procted route
router.post("/admin-protected", checkAuth, checkRole(["admin"]), (req, res) => {
  res.json(serializeUser(req.user));
});

//sponsor procted route
router.post(
  "/sponsor-protected",
  checkAuth,
  checkRole(["sponsor"]),
  (req, res) => {
    res.json(serializeUser(req.user));
  }
);

//doctor procted route
router.post(
  "/doctor-protected",
  checkAuth,
  checkRole(["doctor"]),
  (req, res) => {
    res.json(serializeUser(req.user));
  }
);

//consultant procted route
router.post(
  "/consultant-protected",
  checkAuth,
  checkRole(["consultant"]),
  (req, res) => {
    res.json(serializeUser(req.user));
  }
);

module.exports = router;
