const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/analyze', async (req, res) => {
    const { url, n } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required.' });
    }
    if (!n || isNaN(n) || n <= 0) {
        return res.status(400).json({ error: 'A valid number of top words (n) is required.' });
    }

    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        const text = $('body').text();

        const words = text.replace(/[^a-zA-Z ]/g, '').toLowerCase().split(/\s+/);
        const wordFrequency = {};

        words.forEach(word => {
            if (word.length > 0) {
                wordFrequency[word] = (wordFrequency[word] || 0) + 1;
            }
        });

        const topWords = Object.entries(wordFrequency)
            .sort((a, b) => b[1] - a[1])
            .slice(0, parseInt(n))
            .map(([word, freq]) => ({ word, freq }));

        res.json(topWords);
    } catch (error) {
        console.error('Error fetching or analyzing the URL:', error);
        res.status(500).json({ error: 'Failed to fetch or analyze the URL.' });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
