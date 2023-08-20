import express from 'express';
import NavigationMenuItem from '../models/NavigationMenuItem.model';

const router = express.Router();

// POST request to add a navigation menu item configuration
router.post('/', async (req, res) => {
    try {
        const { link } = req.body;

        // Check if a navigation menu item with the same link already exists
        let menuItem = await NavigationMenuItem.findOne({ link });

        if (menuItem) {
            // If menu item exists, update it
            menuItem = await NavigationMenuItem.findOneAndUpdate(
                { link },
                req.body,
                { new: true } // This option returns the updated document
            );
            res.status(200).json({ message: 'Navigation menu item configuration updated successfully', menuItem });
        } else {
            // If menu item doesn't exist, create a new one
            menuItem = new NavigationMenuItem(req.body);
            await menuItem.save();
            res.status(201).json({ message: 'Navigation menu item configuration added successfully', menuItem });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error processing navigation menu item configuration', error });
    }
});

// GET request to retrieve the navigation menu item configuration
router.get('/', async (req, res) => {
    try {
        const menuItems = await NavigationMenuItem.find();
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching navigation menu item configuration', error });
    }
});

export default router;