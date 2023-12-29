const exprss = require("express");
const router = exprss.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/logout", authMiddleware, authController.logout);

module.exports = router;
