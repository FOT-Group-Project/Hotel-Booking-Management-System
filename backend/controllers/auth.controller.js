const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { errorHandler } = require("../utils/error");

dotenv.config();

function signUp(req, res) {
  models.User.findOne({ where: { email: req.body.email } })
    .then((result) => {
      if (result) {
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      } else {
        models.User.findOne({ where: { username: req.body.username } })
          .then((result) => {
            if (result) {
              return res.status(400).json({
                success: false,
                message: "Username already exists",
              });
            } else {
              bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(req.body.password, salt, function (err, hash) {
                  const user = {
                    username: req.body.username,
                    email: req.body.email,
                    password: hash,
                  };

                  models.User.create(user)
                    .then((result) => {
                      res.status(201).json({
                        success: true,
                        message: "User created successfully",
                        user: result,
                      });
                    })
                    .catch((err) => {
                      res.status(500).json({
                        success: false,
                        message: "Internal Server Error",
                        error: err,
                      });
                    });
                });
              });
            }
          })
          .catch((error) => {
            res.status(500).json({
              success: false,
              message: "Internal Server Error",
              error: error,
            });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error,
      });
    });
}

function signIn(req, res) {
  models.User.findOne({ where: { username: req.body.username } })
    .then((user) => {
      if (user === null) {
        return res.status(400).json({
          success: false,
          message: "Invalid credentials",
        });
      } else {
        bcrypt.compare(
          req.body.password,
          user.password,
          function (err, result) {
            if (result) {
              // Sign the token and set it to expire in 1 hour (3600 seconds)
              const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "1h" } // Token expires in 1 hour
              );

              // Exclude the password from the user details returned in the response
              const { password: pass, ...rest } = user.dataValues;

              res
                .status(200)
                .cookie("access_token", token, {
                  httpOnly: true,
                  maxAge: 3600000, // Expires in 1 hour, must be in milliseconds
                })
                .json(rest);
            } else {
              return res.status(400).json({
                success: false,
                message: "Invalid password",
              });
            }
          }
        );
      }
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error,
      });
    });
}

async function google(req, res, next) {
  const { email, name, photoURL } = req.body;

  const names = name.split(" ");
  const firstName = names[0];
  const lastName = names[1];

  const username = `${firstName}${lastName}`.toLowerCase();

  // password should be hashed before saving to the and set default password
  const password = "1234";

  try {
    const user = await models.User.findOne({ where: { email: email } });

    if (user === null) {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          const user = {
            username: username,
            email: email,
            password: hash,
            firstname: firstName,
            lastname: lastName,
            profilepicurl: photoURL,
            role: "customer",
          };

          models.User.create(user)
            .then((result) => {
              const token = jwt.sign(
                { id: result.id, role: result.role },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "1h" }
              );

              const { password: pass, ...rest } = result.dataValues;

              res
                .status(200)
                .cookie("access_token", token, {
                  httpOnly: true,
                  maxAge: 3600000,
                })
                .json(rest);
            })
            .catch((error) => {
              next(error);
            });
        });
      });
    } else {
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );

      const { password: pass, ...rest } = user.dataValues;

      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          maxAge: 3600000,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
}

function signOut(req, res) {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json({ success: true, message: "User signed out successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error: error });
  }
}

module.exports = {
  signUp: signUp,
  signIn: signIn,
  google: google,
  signOut: signOut,
};
