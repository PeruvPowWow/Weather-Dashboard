import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import routes from './routes/index';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import routes
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
