// Import dependencies and utilities
import bcrypt from "bcryptjs"; // For hashing passwords
import User from "../models/user.model.js"; // MongoDB user model
import generateTokenAndSetCookie from "../utils/generateToken.js"; // Function to generate JWT and set it in cookies


// ======================== LOGIN CONTROLLER ========================
export const login = async (req, res) => {
  try {
    // Extract username and password from request body
    const { username, password } = req.body;

    // Check if user exists in the database
    const user = await User.findOne({ username });

    // Compare entered password with the hashed password stored in DB
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

    // If user not found or password is incorrect, send error response
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // If credentials are correct, generate JWT and set it as a cookie
    generateTokenAndSetCookie(user._id, res);

    // Send success response with basic user info
    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilepic: user.profilepic,
    });
  } catch (error) {
    // Handle server errors
    res.status(500).json({ error: "Internal Server error" });
    console.error("Error during login:", error);
  }
};


// ======================== LOGOUT CONTROLLER ========================
export const logout = (req, res) => {
  try {
    // Clear the JWT cookie by setting an empty value and immediate expiry
    res.cookie("jwt", "", { maxAge: 0 });

    // Send success message
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    // Handle any error that occurs during logout
    res.status(500).json({ error: "Internal Server error" });
    console.error("Error during logout:", error);
  }
};


// ======================== SIGNUP CONTROLLER ========================
export const signup = async (req, res) => {
  try {
    // Extract required fields from request body
    const { fullName, username, password, confirmPassword, gender } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if username already exists in DB
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Generate salt and hash the password securely
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    // Automatically assign profile picture based on gender
    const boyProfilePics = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePics = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // Create a new user document
    const newUser = new User({
      fullName,
      username,
      password: hashedpassword,
      gender,
      profilepic: gender === "male" ? boyProfilePics : girlProfilePics,
    });

    // If new user is created successfully
    if (newUser) {
      // Generate JWT token and set it as a cookie
      generateTokenAndSetCookie(newUser._id, res);

      // Save new user to MongoDB
      await newUser.save();

      // Send success response with user info
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        gender: newUser.gender,
        profilepic: newUser.profilepic,
      });
    } else {
      // If something went wrong while creating the user
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    // Handle unexpected errors
    res.status(500).json({ error: "Internal Server error" });
    console.error("Error during signup:", error);
  }
};
