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
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.render('index', {title: 'Home'});
});

app.get('/create-poll', (req, res) => {
    res.render('create-poll', {title: 'Create a poll'});
});

app.post('/poll', (req, res) => {
    console.log(req.body);
    const submittedPoll = req.body;
    const pollOptions = Array.from(submittedPoll.keys);
    const poll = new Poll();
    poll.title = submittedPoll.title;
    poll.options = {};

    for (let i = 0; i < pollOptions.length; i++){
        poll.options.set(pollOptions[i], 0);
    }

    const pollId = poll._id;
    poll.save()
        .then((result) => {
            res.render('success', {title: 'Success', pollCode: pollId});
        })
        .catch((err) => {
            console.log(err);
        });

})

app.get('/poll/:id', (req, res) => {
    const id = req.params.id;
    Poll.findById(id)
        .then(result => {
            res.render('vote', {title: "Vote", poll: result})
        })
        .catch(err => {
            console.log(err);
            res.render('404', {title: "404"});
        })
})

app.post('/find-poll', (req, res) => {
    //console.log(req.body);
    res.redirect('/poll/' + req.body.id);
})

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
  });


