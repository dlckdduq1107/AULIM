const express = require('express');
const app = express();
const path = require ('path');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session'); 
const fs = require('fs'); 
const {PythonShell} = require('python-shell');
const http = require('http'); 
const server = http.createServer(app);


var db_config = require('./database.js');
var conn = db_config.init();
db_config.connect(conn);

class act{
    constructor(name, classdate, start, long, alarm){
        this.name = name;
        this.classdate = classdate;
        this.start = start;
        this.long = long;
        this.alarm = alarm;
    }
}


app.use('/modules', express.static(__dirname + "/modules")); //자바스크립트 파일을 사용하기 위해 경로를 설정해줘야함(nodejs)
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(path.join(__dirname + '/')));
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
    if(req.session.user) {
        fs.readFile(`./data/streams/stream_${req.session.user.id}.txt`, 'utf-8', (err, data) => {
            io.on('connection', (socket) => {
                socket.emit('stream', {data : data});
            });
            
        });
        
    }
    

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
    
    if(req.session.user) {
        // console.log('user logged in already.');
        res.redirect('/');
    }
    else {
        req.session.user = {
            id: id,
            pw: pw,
            name: 'asdf',
            authorized: true
        }; 
        // console.log('made session')
        // console.log(`id : ${id}`);

        
        io.on('connection', (socket) => { 
            // console.log('socket connected');
            socket.emit('recMsg', {userId : id});
            socket.emit('recMsg2', {userId : id});

        
            socket.on('jsondata',(data)=>{
                fs.writeFile(`/data/time_table-${id}.json`, data, function(err){
                    if(err){
                        console.log(err);
                    }
                })
            });     
            socket.on('addact',(data)=>{
                fs.writeFile("timetable-added.json", data, function(err){
                    if(err){
                        console.log(err); 
                    }
                })
            });
            socket.emit('login', {userId : id});
            socket.on('logout', () => {
                // console.log('user logged out.');
            })
            socket.on('query',(data)=>{
                conn.query(data);
            });
            socket.on('query2',(query2)=>{
                var testArray = new Array();
                var data = [];
                var fortest = [];
                var a = [];
                conn.query(query2, function(err, rows){
                if(!err){
                    for(var i = 0; i< rows.length ; i++){
                        a[i] = new act(rows[i].name, rows[i].classdate, rows[i].start, rows[i].long, 'Y');
                        // console.log(a[i]);
                    }
                    //var jsonData = JSON.stringify(testArray, null, 4);
                }else{
                    console.log("Error while performing Query", err);
                }
                socket.emit('qanswer', a);
                });
            });
        });

        let options = {
            args : [id, pw] 
        };

        PythonShell.run('./scripts/stream.py', options, (err, data) => {
            
         
        });
        
        
        res.redirect('/')
    }    
});


let jsonChanger = require('./modules/jsonChanger');

app.post('/crawl_time_table', (req, res) => {
    if(req.session.user) {
        let id = req.session.user.id;
        let pw = req.session.user.pw;

        let options = {
            args : [id, pw] 
        };

        console.log('start crawling...');
        PythonShell.run('./scripts/sele.py', options, (err, data) => {
                io.on('connection', (socket) => {
                    socket.emit('recMsg', {userId : id});
                });
             let changed = jsonChanger.change(data);
             fs.writeFileSync(`./data/time_table-${id}.json`, changed);  
             res.redirect('/');
        });
    }
    else {
        console.log('crawling failed.');
        res.redirect('/');
    }
    
});

app.post('/logout', (req, res) => {
    
    if (req.session.user) {
        console.log('user logged out.');
        req.session.destroy();
        io.on('connection', (socket) => {
            socket.emit('logout');
        })
        res.redirect('/');
    } 
    else {
        console.log('user already logged out.');
        res.redirect('/');
    }
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
