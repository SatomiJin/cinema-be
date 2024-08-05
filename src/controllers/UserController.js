const JwtService = require("../services/JwtService");
const UserService = require("../services/UserService");

const createUser = async (req, res) => {
  try {
    const response = await UserService.createUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);

    res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

const signIn = async (req, res) => {
  try {
    const response = await UserService.signIn(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const response = await UserService.updateUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

const getUserDetail = async (req, res) => {
  try {
    const response = await UserService.getUserDetail(req.headers);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const response = await UserService.getAllUser();
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const response = await UserService.deleteUser(req.body.id);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

const saveFilm = async (req, res) => {
  try {
    const response = await UserService.saveFilm(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};
module.exports = {
  createUser,
  signIn,
  updateUser,
  getUserDetail,
  getAllUser,
  deleteUser,
  saveFilm,
};
