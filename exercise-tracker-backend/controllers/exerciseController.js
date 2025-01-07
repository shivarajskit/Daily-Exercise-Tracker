import { exercisesDB } from '../manage-db.js'; // This is now the MongoDB collection
import { ObjectId } from 'mongodb';

export const addExercise = async (req, res) => {
  const { userId, date, exercises } = req.body;
  const newExerciseLog = {
    userId,
    date: date || new Date().setUTCHours(0, 0, 0, 0),
    exercises,
  };

  try {
    // Insert the new exercise log into the database
    const result = await exercisesDB.insertOne(newExerciseLog);
    res.status(201).json(result); // Send the inserted document
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getExercises = async (req, res) => {
  const { userId, date } = req.query;

  try {
    // Build the filter object
    const filter = { userId };

    if (date) {
      const parsedDate = date;

      filter.date = parsedDate;
    }

    // Fetch and sort exercises from the database
    const exercises = await exercisesDB
      .find(filter)
      .sort({ date: -1 })
      .toArray();

    res.status(200).json(exercises);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteExercise = async (req, res) => {
  const { exerciseId } = req.params;

  try {
    // Delete the exercise by its ID
    const result = await exercisesDB.deleteOne({ _id: new ObjectId(exerciseId) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Exercise not found' });
    }

    res.status(200).json({ message: 'Exercise deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
