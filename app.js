const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');

const Poll = require('./models/poll');

var configJSON = JSON.parse(fs.readFileSync('swift-opinion-config.json', 'utf8'));
const PORT = configJSON.PORT;
const dbURI = configJSON.dbURI;

const app = express();
app.set('view engine', 'ejs');

mongoose.connect(dbURI)
    .then((result) => {
        console.log("Connected to db")
        app.listen(PORT);
        console.log("Listening on port " + PORT);
    })
    .catch((err) => {
        console.log(err)
    });



// make available static files/resources
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.render('index', {title: 'Home'});
});

app.get('/create-poll', (req, res) => {
    res.render('create-poll', {title: 'Create a poll'});
});

// testing mongoose
app.get('/add-poll', (req, res) => {
    const poll = new Poll({
        title: 'new poll',
        options: {
            a: 1,
            b: 2,
            c: 3
        }
    });

    poll.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
})

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
  });


