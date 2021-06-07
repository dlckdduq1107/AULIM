var socket = io();
var streams = [];
var id="";
var login_flag = 0;
var return_flag = 0;

socket.on('stream', (data) => {
    streams = [];
    var s = data.data;
    streams = s.split('\n');
    var list = document.getElementById('notice_list');
    list.innerHTML='<br>';
    for(var i=0; i<streams.length; i++) {
        list.append(streams[i]);
        list.append(document.createElement("br"));
    }
    
})

socket.on('logout', () => {
    login_flag = 0;
    
});

socket.on('login', (data)=> {
    id = data.userId;
    login_flag = 1;    
});

setTimeout(() => {
    if (login_flag == 0){
        document.getElementById('notice_list').remove();  
        }
}, 50);
