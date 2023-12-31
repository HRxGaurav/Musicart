import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";
import validator from 'validator';

dotenv.config();


const register = async (req, res) => {
    const { name, phone, email, password } = req.body;

    if (!name || !password || !phone || !email) {
        return res.status(422).json({ error: "Please fill in all fields properly" });
    }

    try {
        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Validate phone format (you may need to adjust this based on your specific requirements)
        if (!validator.isMobilePhone(phone, 'any', { strictMode: false })) {
            return res.status(400).json({ error: 'Invalid phone format' });
        }

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(422).json({ error: "User already registered" });
        } else {
            const hashPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ name, phone, email, password: hashPassword });
            await newUser.save();
            const userLogin = await User.findOne({ email });
            const token = jwt.sign({ userID: userLogin._id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
            res.status(201).json({ message: "User registered successfully", email: email, token: token, id: userLogin._id });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};


const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({ error: 'Please fill in both username and password' });
        }

        // Check if the username is an email or a phone number
        const isEmail = validator.isEmail(username);
        const isPhone = validator.isMobilePhone(username, 'any', { strictMode: false });

        if (!isEmail && !isPhone) {
            return res.status(400).json({ error: 'Invalid username format' });
        }

        let userLogin;
        if (isEmail) {
            userLogin = await User.findOne({ email: username });
        } else if (isPhone) {
            userLogin = await User.findOne({ phone: username });
        }

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            if (!isMatch) {
                return res.status(400).json({ error: "Invalid Credentials" });
            }

            // Generate JWT Token
            const token = jwt.sign({ userID: userLogin._id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });

            return res.status(200).json({ message: "User Logged in successfully", token, email: userLogin.email, id: userLogin._id });
        } else {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
};


const loggedIn= async (req, res) => {
    const token = req.header('Authorization');
    if (!token) {
      res.status(401).json({ message: 'failed' });
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      res.status(200).json({ message: 'success', user: decoded.userID });
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };



export default { login, register, loggedIn};
