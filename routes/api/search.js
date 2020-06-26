const express = require('express');
const router = express.Router();
const config = require('config');
const fetch = require('node-fetch');
const utility = require('../../utility');

// GET api/search/guardian
// Search news from the Guardian News API.
router.get('/guardian', async (req, res) => {
    try {
        const news = await fetch(`https://content.guardianapis.com/search?q=${req.query.keyword}&api-key=${config.get('guardianNewsKey')}&show-blocks=all`);
        if (news.status === 200) {
            const data = await news.json();
            return res.json(utility.parseGuardianNews(data.response.results));
        } else {
            return res.json([]);
        }
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
        const news = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${req.query.keyword}&api-key=${config.get('nytimesKey')}`);
        if (news.status === 200) {
            const data = await news.json();
            return res.json(data.response.docs.map((doc, index) => {
                return utility.parseNytimesArticle(data.response, index);
            }));
        } else {
            return res.json([]);
        }
    } catch (e) {
        // The errors related to the Guardian News API happen in the try block.
        console.log(e.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;