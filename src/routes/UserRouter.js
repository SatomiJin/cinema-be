const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { authMiddleWare, authUserMiddleware } = require("../middleware/AuthUserMiddleware");

router.post("/sign-up", UserController.createUser);
router.post("/sign-in", UserController.signIn);
router.post("/update-user", UserController.updateUser);
router.get("/get-user", authUserMiddleware, UserController.getUserDetail);
router.get("/get-all-user", authMiddleWare, UserController.getAllUser);
router.post("/delete-user", authMiddleWare, UserController.deleteUser);
router.post("/save-history", authUserMiddleware, UserController.saveFilm);
router.get("/test", authUserMiddleware, UserController.test);
module.exports = router;
