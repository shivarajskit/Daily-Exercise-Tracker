import express from 'express';
import { getExercises, addExercise, deleteExercise } from '../controllers/exerciseController.js';

const router = express.Router();

// Exercise Routes
router.get('', getExercises); // Get exercises for a user
router.post('', addExercise); // Add a new exercise
router.delete('/:exerciseId', deleteExercise); // Delete an exercise

export default router;
