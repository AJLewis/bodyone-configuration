import express from 'express';
import cors from 'cors';

require('./config/db');
import configurationRoutes from './routes/configurationRoutes';
import themeRoutes from './routes/themeRoutes';
import navigationMenuItemRoutes from './routes/navigationMenuItemRoutes';
import navigationMenuRoutes from './routes/navigationMenuRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/configuration', configurationRoutes);
app.use('/api/configuration/theme', themeRoutes);
app.use('/api/configuration/navigation-menu-item', navigationMenuItemRoutes);
app.use('/api/configuration/navigation-menu', navigationMenuRoutes);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});