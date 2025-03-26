import express from 'express';
import connectDB from './config/db.js';
import destinationGuidesRouter from './routes/destinationGuides.js';
import tripItinerariesRouter from './routes/tripItineraries.js';
import authRouter from './routes/auth.js';
import favoritesRouter from './routes/favorites.js';
import setupDbRouter from './routes/setupDb.js';
import cors from 'cors'

import dotenv from 'dotenv';
const app = express();
app.use(cors())
app.use(express.json());

dotenv.config(); // Loads variables from .env into process.env

// Now you can access them:
console.log(process.env.JWT_SECRET); // your_random_secure_key_here
console.log(process.env.MONGODB_URI); // mongodb://localhost:27017/traveltrove

// Connect to database
connectDB();

// Routes
app.use('/api/v1', [
  setupDbRouter,
  destinationGuidesRouter,
  tripItinerariesRouter,
  authRouter,
  favoritesRouter
  
]);

const PORT = process.env.PORT || 3800;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});