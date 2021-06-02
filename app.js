const express = require('express');
const app = express();
const path = require ('path');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const fs = require('fs');
const {PythonShell} = require('python-shell');
const http = require('http');
const server = http.createServer(app);

var db_config = require(__dirname + '\\database.js');
var conn = db_config.init();

db_config.connect(conn);

app.use('/modules', express.static(__dirname + "/modules")); //자바스크립트 파일을 사용하기 위해 경로를 설정해줘야함(nodejs)
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cookieParser());
app.use('/data', express.static(path.join(__dirname + '/data')));
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

let io = require('socket.io').listen(server);

app.post('/login_check', (req, res) => {
    let id = req.body.userid;
    let pw = req.body.userpw;

    let options = {
        args : [id, pw]
    };

    
    if(req.session.user) {
        console.log('user logged in already.');
        res.redirect('/');
    }
    else {
        req.session.user = {
            id: id,
            pw: pw,
            name: 'asdf',
            authorized: true
        };
        console.log('made session')
        console.log(`id : ${id}`);

        // PythonShell.run('./scripts/sele.py', options, (err, data) => {
        //     fs.writeFileSync(`./data/time_table-${id}.json`, JSON.stringify(JSON.parse(data), null, 4));

            io.on('connection', (socket) => {
                console.log('socket connected');
                socket.emit('recMsg', {userId : id});
                socket.on('jsondata',(data)=>{
                    var fs = require('fs');
                    fs.writeFile("timetable-recommend.json", data, function(err){
                        if(err){
                            console.log(err);
                        }
                    })
                });

            });
            res.redirect('/')
        // });
    }   
});


app.post('/logout', (req, res) => {
    if (req.session.user) {
        console.log('user logged out.');
        req.session.destroy();
        res.redirect('/');
    } 
    else {
        console.log('user already logged out.');
        res.redirect('/');
    }
});

app.get('/scrap', (req, res) => {
    PythonShell.run('./scripts/sele.py', null, (err, result) => {
        console.log('run');
    });

    res.redirect('time_table.html');
});

let memoIndex = 0;

app.post('/save_memo', (req, res) => {
    let content = req.body.memo_content; 
    let id = req.session.user.id;
    if(!id) {
        console.log('cannot found user id');
        res.redirect('/memo');
    }
    else {
        let now = new Date(Date.now());
        let date = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate();
        let filename = id + "-"+ Math.floor(Math.random()*10);
        console.log(filename);
        let sql = `INSERT INTO memo (Inndex, userID, wdate, mdate, context) VALUES ('${memoIndex++}', '${id}', '${date}', '${date}', '${filename}')`;
        conn.query(sql, (err, result) => {
            if(err) console.log('sql error!');
            else console.log('sql inserted.');
        });
        fs.writeFileSync(__dirname + `/data/memo/${filename}.txt`, '\ufeff' + content, {encoding: 'utf8'});
        res.redirect('/memo');
    }
}); 

server.listen(3000, () => {
    console.log('server started.');
});

app.use('/printTT.js', express.static(__dirname+"/printTT.js"));
app.use('/Recommend.js', express.static(__dirname+"/Recommend.js"));
app.use(express.static(__dirname+"/data"))

