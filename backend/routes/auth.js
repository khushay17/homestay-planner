const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { body, validationResult } = require("express-validator");

const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const authLimiter = require("../middleware/rateLimiter");

const router = express.Router();

// ================= REGISTER =================

router.post(
  "/register",
  authLimiter,
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required"),

    body("email")
      .trim()
      .isEmail()
      .withMessage("Invalid email"),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      const { name, email, password } = req.body;

      const existingUser = await User.findOne({
        email: email.toLowerCase(),
      });

      if (existingUser) {
        return res.status(400).json({
          message: "User already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
      });

      await user.save();

      res.status(201).json({
        message: "Registration successful",
      });
    } catch (err) {
      console.error(err);

      res.status(500).json({
        message: "Server error",
      });
    }
  }
);

// ================= LOGIN =================

router.post(
  "/login",
  authLimiter,
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Valid email is required"),

    body("password")
      .notEmpty()
      .withMessage("Password is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({
        email: email.toLowerCase(),
      });

      if (!user || !user.password) {
        return res.status(400).json({
          message: "Invalid credentials",
        });
      }

      const match = await bcrypt.compare(
        password,
        user.password
      );

      if (!match) {
        return res.status(400).json({
          message: "Invalid credentials",
        });
      }

      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res.status(200).json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (err) {
      console.error(err);

      res.status(500).json({
        message: "Server error",
      });
    }
  }
);

// ================= GOOGLE OAUTH =================

const checkGoogleAuthEnabled = (req, res, next) => {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    return res.status(400).json({
      success: false,
      message: "Google OAuth is not configured on this environment. Please log in using Email & Password.",
    });
  }
  next();
};

// Start Google login
router.get(
  "/google",
  checkGoogleAuthEnabled,
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

// Google callback
router.get(
  "/google/callback",
  checkGoogleAuthEnabled,
  passport.authenticate("google", {
    failureRedirect: "/",
    session: false,
  }),
  (req, res) => {
    const token = jwt.sign(
      {
        id: req.user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const name = encodeURIComponent(req.user.name);
    const email = encodeURIComponent(req.user.email);

    const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

    res.redirect(
      `${clientUrl}/?token=${token}&name=${name}&email=${email}`
    );
  }
);

// ================= PROTECTED PROFILE =================

router.get(
  "/profile",
  authMiddleware,
  async (req, res) => {
    try {
      const user = await User.findById(
        req.user.id
      ).select("-password");

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      res.status(200).json(user);
    } catch (err) {
      console.error(err);

      res.status(500).json({
        message: "Server error",
      });
    }
  }
);

module.exports = router;