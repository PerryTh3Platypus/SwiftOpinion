const fs = require('fs');
const express = require('express');

var configJSON = JSON.parse(fs.readFileSync('swift-opinion-config.json', 'utf8'));
const PORT = configJSON.PORT;

const app = express();
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index', {title: 'Home'});
});

app.get('/create-poll', (req, res) => {
    res.render('create-poll', {title: 'Create a poll'});
});


app.listen(PORT);
console.log("Listening on port " + PORT);