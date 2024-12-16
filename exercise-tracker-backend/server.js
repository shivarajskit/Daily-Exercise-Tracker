import express from 'express';
import { connectToDB } from './manage-db.js';
import exerciseRoutes from './routes/exerciseRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectToDB();

app.use('/api/exercises', exerciseRoutes);
app.use('/api/users', userRoutes);
app.use('*', express.static('public')); // display 404 html page from public folder if accessed 5000 port from browser
// app.use(logger);  // middleware between requests and responses
console.log("run: 'npm run devStart' to auto restart server");
// Add your other routes (e.g., exercises routes) here

function logger(req, res, next){
  console.log(req.originalUrl);
  next();
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));