const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { errorHandler } = require("../utils/error");
const User = require("../models/user");

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

const signIn = (req, res) => {
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
};

const google = async (req, res, next) => {
  const {email, name, photoURL} = req.body;
  try {
    const user = await User.findOne({email});
    if(user) {
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET_KEY, // Token expires in 1 hour
      );
      const { password: pass, ...rest } = user.dataValues;
      return res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          maxAge: 3600000, // Expires in 1 hour, must be in milliseconds
        })
        .json(rest);
    } else {
      const password = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = await User.create({
        username: name,
        email: email,
        password: hashedPassword,
        profilepicurl: photoURL
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser.id},
        process.env.JWT_SECRET_KEY, // Token expires in 1 hour
      );
      const { password: pass, ...rest } = newUser._doc;
      res 
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true, // Expires in 1 hour, must be in milliseconds
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUp: signUp,
  signIn: signIn,
  google: google
};
