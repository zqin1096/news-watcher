const express = require('express');
const router = express.Router();
const config = require('config');
const fetch = require('node-fetch');
const utility = require('../../utility');

// GET api/nytimes
// Get the New York Times news of the home section.
router.get('/', async (req, res) => {
    try {
        const news = await fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${config.get('nytimesKey')}`);
        if (news.status === 200) {
            const data = await news.json();
            return res.json(utility.parseNytimes(data.results));
        } else {
            return res.json([]);
        }
    } catch (e) {
        console.log(e.message);
        res.status(500).send('Server error');
    }
});

// Get api/nytimes/:section
// Get the New York Times news of the specified section.
router.get('/:section', async (req, res) => {
    try {
        const news = await fetch(`https://api.nytimes.com/svc/topstories/v2/${req.params.section}.json?api-key=${config.get('nytimesKey')}`);
        if (news.status === 200) {
            const data = await news.json();
            return res.json(utility.parseNytimes(data.results));
        } else {
            return res.json([]);
        }
    } catch (e) {
        console.log(e.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;