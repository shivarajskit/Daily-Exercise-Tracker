import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
const DATABASE_NAME = 'exerciseTracker';

let db, usersDB, exercisesDB;

// Initialize MongoDB Connection
const connectToDB = async () => {
  try {
    const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    console.log('Connected to MongoDB');
    db = client.db(DATABASE_NAME);

    // Initialize collections
    usersDB = db.collection('users'); // Users collection
    exercisesDB = db.collection('exercises'); // Exercises collection
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if connection fails
  }
};

// Export the collections and connect function
export { usersDB, exercisesDB, connectToDB };
