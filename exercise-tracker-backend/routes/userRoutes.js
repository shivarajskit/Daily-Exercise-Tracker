import express from 'express';
import { loginUser, registerUser } from '../controllers/userController.js'; // Assuming you have a userController.js

const router = express.Router();

// User Routes
router.post('/login', loginUser); // User login
router.post('/register', registerUser); // User registration

export default router;