import Employ from "../models/employModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const getInfo = asyncHandler(async (req, res) => {
  const users = await Employ.find();

  if (users.length > 0) {
    res.json(users);
  } else {
    res.status(404);
    throw new Error("No users found");
  }
});

export const login = asyncHandler(async (req, res) => {
  const { email, password, web } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide both email and password");
  }

  // First try to find by direct email match
  const trimmedEmail = email.trim();
  
  // Try direct find first
  let user = await Employ.findOne({ email: trimmedEmail });
  
  // If not found, try case-insensitive search
  if (!user) {
    user = await Employ.findOne({ email: { $regex: new RegExp(`^${trimmedEmail}$`, 'i') } });
  }
  
  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  
  // Check if user has password field
  if (!user.password) {
    res.status(401);
    throw new Error("User account not properly configured");
  }

  let isPasswordValid = false;
  
  // Check password
  if (typeof user.password === 'string' && user.password.startsWith('$2')) {
    isPasswordValid = await bcrypt.compare(password, user.password);
  } else {
    isPasswordValid = user.password === password;
  }
  
  if (isPasswordValid) {
    try {
      // Make sure JWT_SECRET is defined
      if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is not defined in environment variables");
        res.status(500);
        throw new Error("Server configuration error");
      }
      
      const token = jwt.sign(
        { id: user._id }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
      );
      
      // Create a clean response object with minimal properties
      return res.status(200).json({
        message: "Login successful",
        body: {  // Wrap in body property
          token,
          user: {
            _id: user._id,
            email: user.email,
            role_name: user.role_name || "user",
          }
        }
      });
    } catch (error) {
      console.error("Token generation error:", error);
      res.status(500);
      throw new Error("Error generating authentication token");
    }
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});
