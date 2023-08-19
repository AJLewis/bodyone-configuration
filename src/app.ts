import express from 'express';
import cors from 'cors';

require('./config/db');
import configurationRoutes from './routes/configurationRoutes';
import themeRoutes from './routes/themeRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/configuration', configurationRoutes);
app.use('/api/configuration/theme', themeRoutes);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});