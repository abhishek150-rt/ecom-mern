const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const bcryptjs = require("bcryptjs");

// =================Register==================//
const register = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists with this email.",
                status: 409
            });
        }

        const hashedPassword = await bcryptjs.hash(password, 12);
        const newUser = new User({
            userName,
            email,
            password: hashedPassword
        });

        await newUser.save();

        return res.status(201).json({
            message: "User registration successful",
            status: 201,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server Error",
            status: 500
        });
    }
};

// =================Login==================//
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                status: 404
            });
        }

        // Check password
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials.",
                status: 401
            });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, email: user.email, role: user.role, userName: user.userName }, "secretkey", { expiresIn: "1h" });
        res.cookie("token", token, { httpOnly: true, secure: true }).status(200).json({
            message: user.role === "admin" ? "Admin login successful" : "User login successful",
            status: 200,
            user: { userName: user.userName, email: user.email, role: user.role, id:user._id }
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || "Internal Server Error",
            status: 500
        });
    }
};

// =================Logout==================//
async function logout(req, res) {
    try {
        res.clearCookie("token");
        return res.status(200).json({
            message: "Logout successful",
            status: 200
        });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({
            message: "Logout failed",
            status: 500
        });
    }
}

// =================Auth-Mid==================//
const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized.",
            status: 401,
        });
    }

    try {
        const decoded = jwt.verify(token, "secretkey");
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(500).json({
            message: "Unautharized.",
            status: 500,
        });
    }
};


module.exports = { register, login, logout, authMiddleware };
