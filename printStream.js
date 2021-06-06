var socket = io();
var streams = [];

socket.on('stream', (data) => {
    var s = data.data;
    streams = s.split('\n');
    var list = document.getElementById('notice_list');
    for(var i=0; i<streams.length; i++) {
        list.append(streams[i]);
        list.append(document.createElement("br"));
    }
    
})