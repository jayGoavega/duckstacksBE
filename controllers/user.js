const userModel = require("../models/users");

exports.getAllUsers = async (res) => {
  const getAllData = await userModel;
  res.status(200).json(getAllData);
};

exports.getSingleRole = async (role, res) => {
  const getSingle = await userModel.filter({ role: role });
  res.status(200).json(getSingle);
};

exports.getSponsorCreated = async (role, req, res) => {
  const getSponsorCreatedUser = await userModel.filter({
    createdBy: { role: "sponsor", id: req.user.id },
    role: role,
  });
  res.status(200).json(getSponsorCreatedUser);
};
