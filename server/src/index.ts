import dotenv from 'dotenv';
import express from 'express';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files from the 'public/assets' directory
app.use(express.static(path.join(__dirname, '../../public/assets')));

// Other middlewares and routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import routes
import routes from './routes/index.js';  // Ensure this path is correct
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
