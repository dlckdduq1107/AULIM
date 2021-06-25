// 활동 스트림 화면 출력
var socket = io();
var streams = [];
var id="";
var login_flag = 0;
var return_flag = 0;

socket.on('stream', (data) => {
    login_flag = 1;
    streams = [];
    var s = data.data;
    streams = s.split('\n');
    var list = document.getElementById('notice_list');
    console.log(list);
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
            // console.log(document.getElementById('notice_list'));
            document.getElementById('notice_list').remove();  
            // document.getElementById('notice_list').innerHTML = " ";
        }
}, 500);
