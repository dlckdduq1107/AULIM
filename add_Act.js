// 사용자 지정 활동 추가 기능 
var socket = io();
var id;


socket.on('recMsg', (data)=> {
    console.log(data);
    id = data.userId;
});

var arr = [];
var count = 0;
class act{
    constructor(name, classdate, start, long, alarm){
        this.name = name;
        this.classdate = classdate;
        this.start = start;
        this.long = long;
        this.alarm = alarm;
    }
}


function actSubmit2(){
        arr[count] = new act();
        var name1 = document.getElementById("act_name").value;
        var week = document.getElementById("weeks").value;
        var instarth = document.getElementById("start-hours").value;
        var instartm = document.getElementById("start-seconds").value;
        var inlong = document.getElementById("long").value;
        inlong = parseInt(inlong);
        var instart;
        if(parseInt(instartm) == 30){
            instart = parseFloat(instarth) + 0.5;
        }else{
            instart = parseFloat(instarth);
        }
        var colcell;
        var rowcell;
        switch(week){
            case 'monday':
                colcell = 1;
                break;
            case 'tuesday':
                colcell = 2;
                break;
            case 'wednesday':
                colcell = 3;
                break;
            case 'thursday':
                colcell = 4;
                break;
            case 'friday':
                colcell = 5;
                break;
            case 'saturday':
                colcell = 6;
                break;
            default:
                alert("error!");
        }
        rowcell = instart * 2 - 17;
        arr[count] = new act(name1, colcell, rowcell, inlong, true);
    
    
        var a = [];
        var rows = document.getElementById("time_table").getElementsByTagName("tr");

        var query = "SELECT * FROM activity WHERE user = '"+`${id}`+"';";

        socket.emit('query2', query);
    
        socket.on('qanswer',(data)=>{
        var i =0;
        $.each(data,function(key1,value1){
            a[i] = new act();
            a[i].name = value1.name;
            a[i].classdate = value1.classdate;
            a[i].start = value1.start;
            a[i].long = value1.long;
            a[i].alarm = value1.alarm;
            i++;
        })
            //------기존제이슨 읽음
            
            var flag = true;
            var lll = arr[count].start+(arr[count].long)-1;
                if((lll) > 30){
                    flag = false;
                }
    
            for(var j = 0; j < a.length ; j++){
                var pStart = a[j].start;
                var pEnd = a[j].start + a[j].long -1;
                var nStart = arr[count].start;
                var nEnd = arr[count].start + arr[count].long -1;
                if(a[j].classdate == arr[count].classdate && pStart <= nStart && pEnd >= nStart){
                    
                    flag = false;
                    break;
                } else if (a[j].classdate == arr[count].classdate && pStart <= nEnd && pEnd >= nEnd ){
                    flag = false;
                    
                    break;
                } else if (a[j].classdate == arr[count].classdate && pStart >= nStart &&  pEnd <= nEnd){
                    flag = false;

                    break;
                }
            }
    
            if(flag==false){
                alert("유효하지 않은 시간");
                return(-1);
            }
    
            for(var i =0; i< arr.length; i++){
                var alength = a.length;
                a[alength] = new act(arr[i].name, arr[i].classdate, arr[i].start, arr[i].long, true);
            }
    
            var testArray = new Array();
            var data = [];
            var fortest = [];
    
            for (var num = 1; num <= 7; num++) {
                $('tr','#time_table').each(function(row){  // #테이블ID값
                    if(row > 0 ){
                    mergeCount = mergeCount + 1;
                    $("tr:eq("+row+") > td:eq("+num+")").attr("rowspan",1);
                    $('td:eq('+num+')',$(this)).show(); //병합될 값들 숨김처리
                    }
                })
            }

            for(var i = 0; i< a.length ; i++){
                var rowcell = a[i].classdate;
                var colcell = a[i].start;
    
                for(var k = 0; k < a[i].long; k++){
                    var cells = rows[colcell+k].getElementsByTagName("td");
                    cells[rowcell].innerHTML = a[i].name;
    
                    data[i] = new Object();
                    fortest[i] = new Object();
                    fortest[i].name = a[i].name;
                    fortest[i].long = a[i].long;
                    fortest[i].classdate = a[i].classdate;
                    fortest[i].start = a[i].start;
                    fortest[i].alarm = "Y";
                    data[i].activities = fortest[i];
                    testArray.push(data[i]);
                }
            }

            for (var num = 1; num < 7; num++) {
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
            for(var i = 0 ; i< a.length; i++){
                var query = "INSERT IGNORE activity VALUES('" + `${id}` +"',"+ a[i].classdate + ", " + a[i].start + ", " + a[i].long+", '" + a[i].name + "') ";
                socket.emit('query', query);
            }
            var jsonData = JSON.stringify(testArray, null, 4);
            socket.emit('addact', jsonData);
            //app.js에서 recommend랑 구분필요    
        //document.getElementById("rtn").append(strn);
        })
    
}


function pageReload(){
    window.location.reload();
}

