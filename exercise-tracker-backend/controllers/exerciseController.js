import { exercisesDB } from '../manage-db.js';

export const addExercise = (req, res) => {
  const { userId, date, exercises } = req.body;
  const newExerciseLog = { userId, date: date || new Date().toISOString(), exercises };

  exercisesDB.insert(newExerciseLog, (err, doc) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(doc);
  });
};

export const getExercises = (req, res) => {
  const { userId, date } = req.query;

  // If date is provided, parse it into a Date object
  let dateFilter = {};
  if (date) {
    const parsedDate = new Date(date);
    dateFilter.date = { $gte: parsedDate, $lt: new Date(parsedDate).setDate(parsedDate.getDate() + 1) }; // Filtering by date range (start of the day)
  }

  // Fetch exercises by userId and date filter
  exercisesDB.find({ userId, ...dateFilter }).sort({ date: -1 }).exec((err, docs) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(docs);
  });
};

export const deleteExercise = (req, res) => {
  const { exerciseId } = req.params;

  exercisesDB.remove({ _id: exerciseId }, {}, (err, numRemoved) => {
    if (err) return res.status(500).json({ error: err.message });
    if (numRemoved === 0) return res.status(404).json({ error: 'Exercise not found' });
    res.status(200).json({ message: 'Exercise deleted successfully' });
  });
};

