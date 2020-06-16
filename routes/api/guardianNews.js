const express = require('express');
const router = express.Router();
const config = require('config');
const fetch = require('node-fetch');

// GET api/guardian
// Get the Guardian news of the home section.
router.get('/', async (req, res) => {
    try {
        const news = await fetch(`https://content.guardianapis.com/search?api-key=${config.get('guardianNewsKey')}&section=(sport|business|technology|politics)&show-blocks=all`);
        const data = await news.json();
        res.json(data);
    } catch (e) {
        // The errors related to the Guardian News API happen in the try block.
        console.log(e.message);
        res.status(500).send('Server error');
    }
});

// Get api/guardian/:section
// Get the Guardian news of the specified section.
router.get('/:section', async (req, res) => {
    try {
        const news = await fetch(`https://content.guardianapis.com/${req.params.section}?api-key=${config.get('guardianNewsKey')}&show-blocks=all`);
        const data = await news.json();
        res.json(data);
    } catch (e) {
        console.log(e.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;