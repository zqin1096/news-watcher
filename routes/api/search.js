const express = require('express');
const router = express.Router();
const config = require('config');
const fetch = require('node-fetch');

// GET api/search/guardian
// Search news from the Guardian News API.
router.get('/guardian', async (req, res) => {
    try {
        const news = await fetch(`https://content.guardianapis.com/search?q=${req.body.keyword}&api-key=${config.get('guardianNewsKey')}&show-blocks=all`);
        const data = await news.json();
        res.json(data);
    } catch (e) {
        // The errors related to the Guardian News API happen in the try block.
        console.log(e.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;

// GET api/search/nytimes
// Search news from the New York Times API.
router.get('/nytimes', async (req, res) => {
    try {
        const news = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${req.body.keyword}&api-key=${config.get('nytimesKey')}`);
        const data = await news.json();
        res.json(data);
    } catch (e) {
        // The errors related to the Guardian News API happen in the try block.
        console.log(e.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;