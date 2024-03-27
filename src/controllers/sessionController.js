const Session = require("../models/sessionModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Create a new session at login
const createOrUpdateSession = async (userId) => {
  try {
    const existingSession = await Session.findOne({ where: { userId } });

    if (existingSession) {
      existingSession.token = jwt.sign({ userId }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      await existingSession.save();
      return existingSession;
    }

    // If no session exists, create a new one
    const newSession = await Session.create({
      token: jwt.sign({ userId }, process.env.SECRET_KEY, {
        expiresIn: "24h",
      }),
      userId,
    });

    return newSession;
  } catch (error) {
    console.error("Error creating or updating session:", error);
    throw error;
  }
};

// Get the current session (user profile)
const getSession = async (req, res) => {
  const userId = req.body.userId; // Extracted from the JWT in the authentication middleware

  try {
    // Find the session by userId
    const session = await Session.findOne({ where: { userId } });

    if (!session) {
      return res
        .status(404)
        .json({ success: false, error: "Session not found" });
    }

    res.status(200).json({ success: true, session });
  } catch (error) {
    console.error("Error getting session:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Logout (delete session)
const deleteSession = async (userId) => {
  try {
    const session = await Session.findOne({
      where: {
        userId,
      },
    });

    if (session) {
      // Session found, delete it
      await Session.destroy({
        where: {
          userId,
        },
      });

      return { success: true, message: "Successfully logged out." };
    } else {
      // Session not found
      return { success: false, message: "Session not found." };
    }
  } catch (error) {
    // Handle errors
    console.error("Error deleting session:", error);
    return { success: false, message: "Error logging out. Please try again." };
  }
};

module.exports = {
  createOrUpdateSession,
  getSession,
  deleteSession,
};
