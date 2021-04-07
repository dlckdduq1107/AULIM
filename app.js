
const express = require('express');
const app = express();
const path = require ('path');

app.use(express.static(path.join(__dirname + '../public')));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('time_table.html');
});

app.listen(3000, () => {
    console.log('server started.');
});

