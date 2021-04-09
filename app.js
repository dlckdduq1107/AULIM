
const express = require('express');
const app = express();
const path = require ('path');

app.use(express.static(path.join(__dirname + '/public')));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('time_table.html');
});

app.get('/activity_stream', (req, res) => {
    res.render('activity_stream.html');
});

app.get('/schedule', (req, res) => {
    res.render('schedule.html');
});

app.get('/Group', (req, res) => {
    res.render('Group.html');
});

app.listen(3000, () => {
    console.log('server started.');
});

