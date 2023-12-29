const User = require("../models/userModel");

// fetching a user by token
const getUserProfile = async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};


module.exports = { getUserProfile };
