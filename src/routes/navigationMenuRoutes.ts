import express from 'express';
import NavigationMenu from '../models/NavigationMenu.model';

const router = express.Router();

// POST request to add a navigation menu configuration
router.post('/', async (req, res) => {
  try {
      const { name } = req.body;

      // Check if a navigation menu with the same name already exists
      let existingNavMenu = await NavigationMenu.findOne({ name });

      if (existingNavMenu) {
          // If navigation menu exists, update it
          const updatedNavMenu = await NavigationMenu.findOneAndUpdate(
              { name },
              req.body,
              { new: true } // This option returns the updated document
          );
          res.status(200).json({ message: 'Navigation menu configuration updated successfully', menu: updatedNavMenu });
      } else {
          // If navigation menu doesn't exist, create a new one
          const newNavMenu = new NavigationMenu(req.body);
          await newNavMenu.save();
          res.status(201).json({ message: 'Navigation menu configuration added successfully', menu: newNavMenu });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error processing navigation menu configuration', error });
  }
});

// GET request to retrieve the navigation menu configuration
router.get('/:name', async (req, res) => {
    try {
        const { name } = req.params;

        // Find the navigation menu by name and populate the menuItems
        const navMenu = await NavigationMenu.findOne({ name }).populate('menuItems');

        if (!navMenu) {
            return res.status(404).json({ message: `Navigation menu with name ${name} not found.` });
        }

        console.log(navMenu);
        res.status(200).json(navMenu);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching navigation menu configuration', error });
    }
});

export default router;