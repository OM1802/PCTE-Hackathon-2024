
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const responsesFilePath = path.join(__dirname, 'responses', 'responses.json');

// Middleware
app.use(bodyParser.json());

// API endpoints
app.post('/saveResponse', (req, res) => {
  try {
    const { text } = req.body;
    const response = { text, timestamp: new Date() };
    const responses = JSON.parse(fs.readFileSync(responsesFilePath, 'utf8')) || [];
    responses.push(response);
    fs.writeFileSync(responsesFilePath, JSON.stringify(responses));
    res.status(201).send('Response saved successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving response');
  }
});

app.get('/getResponses', (req, res) => {
  try {
    const responses = JSON.parse(fs.readFileSync(responsesFilePath, 'utf8')) || [];
    res.json(responses);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching responses');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
