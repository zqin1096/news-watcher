const express = require('express');
const router = express.Router();
const config = require('config');
const fetch = require('node-fetch');

// GET api/nytimes
// Get the New York Times news of the home section.
router.get('/', async (req, res) => {
    try {
        const news = await fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${config.get('nytimesKey')}`);
        const data = await news.json();
        res.json(data);
    } catch (e) {
        // The errors related to the Guardian News API happen in the try block.
        console.log(e.message);
        res.status(500).send('Server error');
    }
});

// Get api/nytimes/:section
// Get the New York Times news of the specified section.
router.get('/:section', async (req, res) => {
    try {
        const news = await fetch(`https://api.nytimes.com/svc/topstories/v2/${req.params.section}.json?api-key=${config.get('nytimesKey')}`);
        const data = await news.json();
        res.json(data);
    } catch (e) {
        console.log(e.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;