var socket = io();
var id="";
var login_flag = 0;
var return_flag = 0;

socket.on('recMsg', (data)=> {
    id = data.userId;
    login_flag = 1;    
});

socket.on('logout', () => {
    login_flag = 0;
});

setTimeout(() => {
    if (login_flag == 1){
        printTable();    
        }
}, 500);

function resetTable() {
    
}

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
        $.each(data,function(key1,value1){
            $.each(value1,function(key,value){
                var query = "INSERT IGNORE activity VALUES('" + `${id}` +"',"+ value.classdate + ", " + value.start + ", " + value.long+", '" + value.name + "') ";
                socket.emit('query', query);
          
            })
        })
        return_flag = 0;
    }).fail(function(jqxhr){
        alert("첫번째 로그인! 시간표를 가져와주세요.");
        return_flag =1;
        return 1;
    });
    if(return_flag == 1){
        return;
    }
    var query = "SELECT * FROM activity WHERE user = '"+`${id}`+"';";
    //alert(query);
    socket.emit('query2', query);

    var rows = document.getElementById("time_table").getElementsByTagName("tr");
    // var cells = rows[4].getElementsByTagName("td");

    socket.on('qanswer',(data)=>{
        $.each(data,function(key1,value1){
            for(var j=0;j<value1.long;j++){
                var cells = rows[value1.start+j].getElementsByTagName("td");
                cells[value1.classdate].innerHTML = value1.name;
            }
        })
    })        
    
    setTimeout(() => {
        for (var num = 1; num <= 7; num++) {
            var mergeItem = "q"; //병합구분값
            var mergeCount = 0; //병합 수
            var mergeRowNum = 0;  //병합들num갈 r1w
            $('tr','#time_table').each(function(row){  // #테이블ID값
                if(row > 0 ){
                    var item = $(':eq(' + num +')',$(this)).html();
                    if(mergeItem != item  ) {
                        mergeCount = 1;
                        mergeItem = item ;
                        mergeRowNum = row;
                    }else{
                        mergeCount = mergeCount + 1;
                        $("tr:eq("+mergeRowNum+") > td:eq("+num+")").attr("rowspan",mergeCount);
                        $('td:eq('+num+')',$(this)).hide(); //병합될 값들 숨김처리
                    }
                }
            })
            
        }
    }, 1000);        
}