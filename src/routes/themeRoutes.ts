import express from 'express';
import Theme from '../models/Theme.model';

const router = express.Router();

// POST request to add a theme configuration
router.post('/', async (req, res) => {
    try {
        const { config, dark } = req.body;

        // Check if a theme with the same config.name and dark property already exists
        let theme = await Theme.findOne({ 'config.name': config.name, dark });

        if (theme) {
            // If theme exists, update it
            theme = await Theme.findOneAndUpdate(
                { 'config.name': config.name, dark },
                req.body,
                { new: true } // This option returns the updated document
            );
            res.status(200).json({ message: 'Theme configuration updated successfully', theme });
        } else {
            // If theme doesn't exist, create a new one
            theme = new Theme(req.body);
            await theme.save();
            res.status(201).json({ message: 'Theme configuration added successfully', theme });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error processing theme configuration', error });
    }
});

// GET request to retrieve the theme configuration
router.get('/', async (req, res) => {
    try {
        let { name, dark } = req.query; // Extract name and dark parameters from the query

        // Default values if no query parameters are provided
        if (!name && dark === undefined) {
            name = 'default';
            dark = 'true';
        }

        if (!name) {
            return res.status(400).json({ message: 'Theme name is required.' });
        }

        // Find the theme by name and dark property
        const theme = await Theme.findOne({ 'config.name': name, dark: dark === 'true' });

        if (!theme) {
            return res.status(404).json({ message: `Theme with name ${name} not found.` });
        }

        res.status(200).json(theme);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching theme configuration', error });
    }
});

export default router;