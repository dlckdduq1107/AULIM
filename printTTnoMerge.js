var socket = io();
var id;

window.onload = function() {
    socket.emit('idCheck', {conn : true});
}

socket.on('recMsg2', (data)=> {
    console.log('Msg2 recieved.');
    id = data.userId;
    setTimeout(printTable(), 500);
});


function printTable() {
    class act{
        constructor(name, classdate, start, long, alarm){
            this.name = name;
            this.classdate = classdate;
            this.start = start;
            this.long = long;
            this.alarm = alarm;
        }
    }
    $.getJSON(`../data/time_table-${id}.json`, function(data){
        var rows = document.getElementById("time_table").getElementsByTagName("tr");
        var cells = rows[4].getElementsByTagName("td");
        var a = [];
        var i = 0;
        $.each(data,function(key1,value1){
            $.each(value1,function(key,value){
                var rowcell = 1;
                var colcell = 0;
                for(var j = 0; j < value.classdate.length ; j++){
                    switch(value.classdate[j]){
                        case '월':
                            colcell = 1;
                            break;
                        case '화':
                            colcell = 2;
                            break;
                        case '수':
                            colcell = 3;
                            break;
                        case '목':
                            colcell = 4;
                            break;
                        case '금':
                            colcell = 5;
                            break;
                        default:
                            alert("error!");
                    }
                    var diff= value.start[j].charCodeAt(0) //ASCII Code로 변환함
                    var long=0;
                    if(Number(diff)>=65 && Number(diff)<=70){ //A~F의 값일 경우 조건문
                        var pluscell= Number(diff)-Number('A'.charCodeAt(0))
                        rowcell=1+3*pluscell
                        long=3
                    }
                    else { //문자가 아닌 숫자형식
                        var time_num = Number(value.start[j])
                        var pluscell = time_num - 1 //2.5-1 =1.5
                        rowcell = 1 + pluscell * 2
                        long=2
                    }

                    //value.long[j]=long
                    for(var i=0;i<long;i++){
                        var cells = rows[rowcell+i].getElementsByTagName("td");
                        cells[colcell].innerHTML = value.name;
                    }
                }
                i++;
            });
        });
        
    });
}
