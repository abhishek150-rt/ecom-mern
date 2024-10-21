const express = require("express");
const { register, login, logout, authMiddleware } = require("../../controllers/auth/authController");
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/check-auth", authMiddleware, (req, res) => {
    const user = req.user
    if (user) {
        res.status(200).json({
            status: 200, message: "Authanticated user", user
        })
    }
});

module.exports = { authRouter }