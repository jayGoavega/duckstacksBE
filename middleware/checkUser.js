const passport = require("passport");
/**
 * @DESC checking Auth
 */
exports.checkAuth = passport.authenticate("jwt", { session: false });
/**
 * @DESC remove password field
 */
exports.serializeUser = (user) => {
  return {
    fName: user.fName,
    lName: user.lName,
    fullName: user.fullName,
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
    role: user.role,
  };
};

/**
 * @DESC checking role
 */
exports.checkRole = (roles) => async (req, res, next) => {
  if (await roles.includes(req.user.role)) {
    return next();
  }
  return res.status(401).json({
    message: "Unauthorized",
    success: false,
  });
};
