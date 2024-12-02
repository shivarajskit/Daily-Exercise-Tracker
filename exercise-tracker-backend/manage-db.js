import Datastore from 'nedb';

// Initialize the users database
export const usersDB = new Datastore({ filename: 'users.db', autoload: true });

// Initialize the exercises database
export const exercisesDB = new Datastore({ filename: 'exercises.db', autoload: true });
