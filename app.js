
const express = require('express');
const app = express();
const path = require ('path');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const {PythonShell} = require('python-shell');

var db_config = require(__dirname + '\\database.js');
var conn = db_config.init();

db_config.connect(conn);

app.use('/modules', express.static(__dirname + "/modules")); //자바스크립트 파일을 사용하기 위해 경로를 설정해줘야함(nodejs)
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cookieParser());
app.use(expressSession({
    secret : 'secret',
    resave : false,
    saveUninitialized : true,
    cookie : {
        maxAge : 1000 * 60 * 60
    }
}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    if(req.session.user) {
        console.log('user logged in already.');
    }
    else {
        console.log('user not logged in.');
    }

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

app.get('/memo', (req, res) => {
    res.render('memo.html');
});

app.get('/register', (req, res) => {
    res.render('register.html');
});

let crawl_time_table = function(req, res, next) { //middleware for crawling time table
    let id = req.body.userid;
    let pw = req.body.userpw;

    let options = {
        args : [id, pw]
    };
    let pyshell = new PythonShell('./scripts/sele.py', options)

    pyshell.on('msg', (msg) => {
        console.log(msg);
    });

    pyshell.end((err, code, signal) => {
        if(err) throw err;
      
        console.log('The exit code was: ' + code);
          console.log('The exit signal was: ' + signal);
          console.log('finished');
    })
    next();
}

app.use('/login_check', crawl_time_table);

app.post('/login_check', (req, res) => {
    let id = req.body.userid;
    let pw = req.body.userpw;

    if(req.session.user) {
        console.log('user logged in already.');
    }
    else {
        req.session.user = {
            id: id,
            pw: pw,
            name: 'asdf',
            authorized: true
        };
        console.log('made session')
        console.log(`id : ${id}, pw : ${pw}`);
    }
    res.render('time_table.html');

});


app.get('/logout', (req, res) => {
    if (req.session.user) {
        console.log('user logged out.');
        req.session.destroy();
        res.render('time_table.html');
    } 
    else {
        console.log('user already logged out.');
        res.redirect('time_table.html');
    }
});

app.get('/scrap', (req, res) => {
    PythonShell.run('./scripts/sele.py', null, (err, result) => {
        console.log('run');
    });

    res.redirect('time_table.html');
});

app.listen(3000, () => {
    console.log('server started.');
});

app.use('/printTT.js', express.static(__dirname+"/printTT.js"));
app.use('/time_table.json', express.static(__dirname+"/time_table.json"))

