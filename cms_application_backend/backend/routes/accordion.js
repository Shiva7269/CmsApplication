// const express = require('express');
// const router = express.Router();
// const Accordion = require('../models/Accordion');

// // Create or update accordion items for a page
// router.post('/', async (req, res) => {
//   try {
//     const { pageId, index, items } = req.body;
//     let accordion = await Accordion.findOne({ pageId, index });

//     if (accordion) {
//       accordion.items = items;
//       await accordion.save();
//     } else {
//       accordion = new Accordion({ pageId, index, items });
//       await accordion.save();
//     }

//     res.status(201).json(accordion);
//   } catch (error) {
//     res.status(500).json({ message: 'Error saving accordion items', error: error.message });
//   }
// });

// // Get accordion items by page ID and index
// router.get('/:pageId/:index', async (req, res) => {
//   try {
//     const { pageId, index } = req.params;
//     const accordion = await Accordion.findOne({ pageId, index });

//     if (!accordion) {
//       return res.status(404).json({ message: 'Accordion items not found' });
//     }

//     res.status(200).json(accordion);
//   } catch (error) {
//     res.status(500).json({ message: 'Error retrieving accordion items', error: error.message });
//   }
// });

// module.exports = router;
