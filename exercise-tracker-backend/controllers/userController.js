import { usersDB } from '../manage-db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const registerUser = (req, res) => {
  const { username, email, password } = req.body;

  usersDB.findOne({ $or: [{ username }, { email }] }, async (err, user) => {
    if (user) return res.status(400).json({ message: 'User already exists' });

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = { username, email, password: hashedPassword };

      usersDB.insert(newUser, (err, doc) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'User registered successfully', user: doc });
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
};

export const loginUser = (req, res) => {
  const { email, password } = req.body;

  usersDB.findOne({ email }, async (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    try {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token, user });
    } catch (err) {
      res.status(500).json({ error: 'Failed to generate token' });
    }
  });
};