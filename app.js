const fs = require('fs');
const express = require('express');

var configJSON = JSON.parse(fs.readFileSync('swift-opinion-config.json', 'utf8'));
const PORT = configJSON.PORT;

const app = express();

console.log("PORT: " + PORT);
app.listen(PORT);

app.get('/', (req, res) => {
    console.log(req.url);
})
