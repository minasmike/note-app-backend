const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const sessionController = require("./sessionController");
const { deleteSession } = require('../controllers/sessionController');
const { registerSchema, loginSchema, passwordChange } = require('../validations/authValidation');
// register a new user
const register = async (req, res) => {
  try {
    // Validate the request body against the registration schema
    const { error } = registerSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({ success: false, error: error.details[0].message });
    }
    const { username, password } = req.body;
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "Username is already taken" });
    }
    //encrpting the password and write to the database/
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });

    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
// loging in for existing users.
const login = async (req, res) => {
  try {
    // Validate the request body against the login schema
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, error: error.details[0].message });
    }
    //fetch username and password and check if the username and password exists and match.
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ success: false, error: "Invalid Username" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ success: false, error: "Invalid Password" });
    }

    // Delegate token creation to sessionController
    const session = await sessionController.createOrUpdateSession(user.id);

    res.status(200).json({ success: true, session });
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// const passwordChange = async (req, res) => {
//   try {
//     // Validate the request body against the login schema
//     const { error } = passwordChange.validate(req.body);
//     if (error) {
//       return res.status(400).json({ success: false, error: error.details[0].message });
//     }
//     //fetch username and password and check if the username and password exists and match.
//     const { username, existingPassword, repeatPassword} = req.body;
//     const user = await User.findOne({ where: { username } });

//     if (!user) {
//       return res.status(401).json({ success: false, error: "Invalid Username" });
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (!passwordMatch) {
//       return res.status(401).json({ success: false, error: "Invalid Password" });
//     }

//     // Delegate token creation to sessionController
//     const session = await sessionController.createOrUpdateSession(user.id);
        

//     res.status(200).json({ success: true, session });
//   } catch (error) {
//     console.error("Error logging in:", error.message);
//     res.status(500).json({ success: false, error: "Internal Server Error" });
//   }
// };

// lougout existing user.
const logout = async (req, res) => {
  try {
    // Assuming you have middleware to extract userId from JWT token
    const userId = req.body.userId;

    const result = await deleteSession(userId);

    if (result.success) {
      // Session found and deleted successfully
      res.status(200).json({ success: true, message: result.message });
    } else {
      // Session not found or other error occurred
      res.status(404).json({ success: false, message: result.message });
    }
  } catch (error) {
    // Handle unexpected errors
    console.error("Error logging out:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


module.exports = { register, login, logout };
