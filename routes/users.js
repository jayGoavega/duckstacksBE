const express = require("express");
const router = express.Router();
const { userRegister, userLogin } = require("../utils/auth");
const {
  checkAuth,
  serializeUser,
  checkRole,
} = require("../middleware/checkUser");
const {
  getAllUsers,
  getSingleRole,
  getSponsorCreated,
} = require("../controllers/user");

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

//getting all admin role - access admin
router.get("/get-admin", checkAuth, checkRole(["admin"]), async (req, res) => {
  await getSingleRole("admin", res);
});

//getting all sponsor role - access admin and sponsor
router.get(
  "/get-sponsor",
  checkAuth,
  checkRole(["admin", "sponsor"]),
  async (req, res) => {
    await getSingleRole("sponsor", res);
  }
);
//getting all doctor role - access admin and sponsor
router.get(
  "/get-doctor",
  checkAuth,
  checkRole(["admin", "sponsor"]),
  async (req, res) => {
    await getSingleRole("doctor", res);
  }
);
//getting all consultant role - access admin and sponsor
router.get(
  "/get-consultant",
  checkAuth,
  checkRole(["admin", "sponsor"]),
  async (req, res) => {
    await getSingleRole("consultant", res);
  }
);

// *********************************************

//any user can access and get their profile - access all
router.post(
  "/allprofile",
  checkAuth,
  checkRole(["admin", "sponsor", "doctor", "consultant"]),
  (req, res) => {
    res.json(serializeUser(req.user));
  }
);

// *********************************************

//getAllUserList
router.get("/get-all-users", checkAuth, async (req, res) => {
  await getAllUsers(res);
});

// *********************************************

//admin procted route
router.get("/admin-profile", checkAuth, checkRole(["admin"]), (req, res) => {
  res.json(serializeUser(req.user));
});

//sponsor procted route
router.get(
  "/sponsor-profile",
  checkAuth,
  checkRole(["sponsor"]),
  (req, res) => {
    res.json(serializeUser(req.user));
  }
);

//doctor procted route
router.get("/doctor-profile", checkAuth, checkRole(["doctor"]), (req, res) => {
  res.json(serializeUser(req.user));
});

//consultant procted route
router.get(
  "/consultant-profile",
  checkAuth,
  checkRole(["consultant"]),
  (req, res) => {
    res.json(serializeUser(req.user));
  }
);

//get-sponsor-created-sponsor
router.get(
  "/sponsor-created-sponsor",
  checkAuth,
  checkRole(["sponsor"]),
  (req, res) => {
    getSponsorCreated("sponsor", res);
  }
);

//get-sponsor-created-doctor
router.get(
  "/sponsor-created-doctor",
  checkAuth,
  checkRole(["sponsor"]),
  (req, res) => {
    getSponsorCreated("doctor", res);
  }
);

//get-sponsor-created-consultant
router.get(
  "/sponsor-created-consultant",
  checkAuth,
  checkRole(["sponsor"]),
  (req, res) => {
    getSponsorCreated("consultant", res);
  }
);

module.exports = router;
