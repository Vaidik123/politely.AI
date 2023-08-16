const express = require('express');
const bodyParser = require('body-parser');
const { OpenAIApi } = require('openai');

const app = express();
app.use(bodyParser.json());

const OPENAI_API_KEY = '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'; // our OpenAI API key
const openai = new OpenAIApi({ key: OPENAI_API_KEY });

app.post('/politeness', async (req, res) => {
    const { text } = req.body;

    try {
        const politeText = await getPoliteText(text);
        res.json({ politeText });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing the text.' });
    }
});

async function getPoliteText(text) {
    const prompt = `Make the following message more polite:\n\n${text}\n\nPolite version:`;
    const response = await openai.complete({
        prompt,
        max_tokens: 50
    });

    return response.choices[0].text.trim();
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});