const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JwtService = require("./JwtService");
const createUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        username: data.username,
      });

      if (checkUser) {
        resolve({
          status: "OK",
          message: "username đã tồn tại",
        });
      } else {
        const hashPass = bcrypt.hashSync(data?.password, 10);

        const createNewUser = await User.create({
          username: data?.username,
          password: hashPass,
          isAdmin: false,
          phoneNumber: data?.phoneNumber,
          address: data?.address,
          displayName: data?.displayName,
        });

        resolve({
          status: "OK",
          message: "Create new user success!!",
          data: createNewUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

//login user
const signIn = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        username: data?.username,
      });

      if (!checkUser) {
        resolve({
          status: "ERROR",
          message: "Email chưa được đăng ký",
        });
      }
      const comparePassword = bcrypt.compareSync(data?.password, checkUser.password);

      if (!comparePassword) {
        resolve({
          status: "ERROR",
          message: "Tài khoản hoặc mật khẩu không chính xác",
        });
      }
      const access_token = await JwtService.generalAccessToken({
        id: checkUser.id,
        username: checkUser.username,
        isAdmin: checkUser.isAdmin,
      });

      const refresh_token = await JwtService.generalRefreshToken({
        id: checkUser.id,
        username: checkUser.username,
        isAdmin: checkUser.isAdmin,
      });
      resolve({
        status: "OK",
        message: "Đăng nhập thành công",
        access_token: access_token,
        refresh_token: refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: data?.id || data?._id,
      });

      if (!checkUser) {
        resolve({
          status: "ERROR",
          message: "Không tìm thấy người dùng",
        });
      }

      const updatedUser = await User.findByIdAndUpdate(data?.id, data, { new: true });

      resolve({
        status: "OK",
        message: "Cập nhật thành công",
        data: updatedUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getUserDetail = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        _id: data?.id,
      });
      if (!user) {
        resolve({
          status: "ERROR",
          message: "Lấy thông tin người dùng không thành công",
        });
      }
      resolve({
        status: "OK",
        message: "Lấy thông tin người dùng thành công",
        user: user,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUsers = await User.find();
      if (allUsers.length < 1) {
        resolve({
          status: "ERROR",
          message: "Lấy danh sách không thành công",
          data: [],
        });
      }
      resolve({
        status: "OK",
        message: "Lấy danh sách thành công",
        data: allUsers,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });

      if (!checkUser) {
        resolve({
          status: "ERROR",
          message: "Không tìm thấy user",
        });
      } else {
        await User.findByIdAndDelete(id, { new: true });

        resolve({
          status: "OK",
          message: "Xóa user thành công",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const saveFilm = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await User.findOne({
        _id: data?.id,
      });

      if (!user) {
        resolve({
          status: "ERROR",
          message: "Người dùng không tồn tại",
        });
      }

      if (!user?.filmHistory || user?.filmHistory < 1) {
        user.filmHistory = [];
      }

      if (user && user?.filmHistory) {
        if (user?.filmHistory?.some((item) => item === null)) {
          user.filmHistory = user.filmHistory.filter((item) => item !== null);
          // Lưu tài liệu sau khi xóa các phần tử null
          await user.save();

          await user.filmHistory.push(data.dataFilm);
          await user.save();
        } else {
          let checkFilm = user?.filmHistory?.some(
            (item) => item.filmEp === data?.dataFilm?.filmEp && item.slug === data?.dataFilm?.slug
          );
          if (checkFilm) {
            resolve({
              status: "OK",
              message: "Đã có trong lịch sử",
            });
          } else {
            await user.filmHistory.push(data.dataFilm);
            await user.save();
          }
        }
        resolve({
          status: "OK",
          message: "Lưu thành công",
          user: user,
          // user: user,
        });
      }
      // if()
    } catch (e) {
      reject(e);
    }
  });
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
