

const express = require('express');
const axios = require('axios');
const app = express();
const cors = require("cors");
require('dotenv').config()
const PORT = 5000; // or any other port you prefer

app.use(express.json());
app.use(cors());

const CHATGPT_API_KEY = process.env.CHATGPT_API_KEY; // Replace with your ChatGPT API key

app.post('/convert', async (req, res) => {
  const { code, language } = req.body;
const question=`convert this code ${code} into this ${language} and response should converted code only and proper formate code in next line show`
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      messages:[{"role":"user","content":question}],
      model:"gpt-3.5-turbo",
      max_tokens: 4000,
      temperature: 0.7,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CHATGPT_API_KEY}`,
      },
    });

    const convertedCode=response.data.choices[0].message.content;
    res.json({ convertedCode });
  } catch (error) {
    console.error('Error converting code:', error);
    res.status(500).json({ error});
  }
});


app.post('/debug', async (req, res) => {
  const { code, language } = req.body;
const question=`Debug this code ${code} into this ${language}`
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      messages:[{"role":"user","content":question}],
      model:"gpt-3.5-turbo",
      max_tokens: 150,
      temperature: 0.7,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CHATGPT_API_KEY}`,
      },
    });

    const debug=response.data.choices[0].message.content;
    res.json({ debug });
  } catch (error) {
    console.error('Error converting code:', error);
    res.status(500).json({ error});
  }
});
app.post('/quality-check', async (req, res) => {
  const { code, language } = req.body;
const question=`Please provide a code quality assessment for the given code  ${code}. Consider the following parameters: 1. Code Consistency, 2.Code Performance,3.Code Documentation,4.Error Handling, 5.Code Testability, 6.Code Complexity, 7.Code Duplication, 8.Code Readability  and aslo provide evaluation score in % every parameter an at last give overall score`
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      messages:[{"role":"user","content":question}],
      model:"gpt-3.5-turbo",
      max_tokens: 150,
      temperature: 0.7,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CHATGPT_API_KEY}`,
      },
    });

    const quality=response.data.choices[0].message.content;
    res.json({ quality });
  } catch (error) {
    console.error('Error converting code:', error);
    res.status(500).json({ error});
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

