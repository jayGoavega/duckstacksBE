const userModel = require("../models/users");
const { thinky } = require("../config/thinky");
const r = thinky.r;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @DESC TO REGISTER USERS(ADMIN,SPONSORS,SITES,CONSULTANTS)
 */

exports.userRegister = async (userData, role, res) => {
  let emailTaken = await validateEmail(userData.email);
  //email exit or not ?
  if (emailTaken) {
    return res.status(400).json({
      message: "Email already taken",
      success: false,
    });
  }
  //hashing password
  const password = await bcrypt.hash(userData.password, 12);

  //Saving data object
  const User = await new userModel({
    ...userData,
    password,
    role,
  });
  //Saving to DB
  await User.save((err, doc) => {
    if (err) {
      return res.status(500).json({
        message: "error on creating user",
        success: false,
      });
    } else {
      return res.status(201).json({
        message: "user created",
        success: true,
        data: doc,
      });
    }
  });
};

//validating email exit
const validateEmail = async (email) => {
  const user = await r.table("user").filter({ email: email });
  return user.length >= 1 ? true : false;
};

/**
 * @DESC TO LOGIN USERS(ADMIN,SPONSORS,SITES,CONSULTANTS)
 */

exports.userLogin = async (userData, role, res) => {
  const { email, password } = await userData;

  const check = await userModel.filter({ email });
  //checking email exit or not
  if (check.length == 0) {
    return res.status(404).json({
      message: "no email found",
      success: false,
    });
  }
  const person = await check[0];
  //checking role
  if (!role.includes(person.role)) {
    return res.status(401).json({
      message: `you are not ${role}`,
      success: false,
    });
  }
  //checking password
  let isMatch = await bcrypt.compare(password, person.password);
  //creating token Bearer Token jwt
  if (isMatch) {
    let token = jwt.sign(
      {
        user_id: person.id,
        fullName: person.fullName,
        email: person.email,
        role: person.role,
      },
      process.env.APP_SECRET
    );
    let result = {
      ...person,
      token: `Bearer ${token}`,
    };
    res.cookie("token", token);
    return res.status(200).json({
      message: `successfully logged as ${role}`,
      success: true,
      data: result,
    });
  } else {
    return res.status(401).json({
      message: `Incorrect Password for ${role}`,
      success: false,
    });
  }
};
