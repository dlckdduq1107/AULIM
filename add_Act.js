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
    //alert(rowcell);
    
    arr[count] = new act(name1, colcell, rowcell, inlong, true);
    alert(arr[count].start);
    //count++;

    var a = [];

    $.getJSON(`../data/time_table-${id}.json`, function(data){
        var rows = document.getElementById("time_table").getElementsByTagName("tr");
        var cells = rows[4].getElementsByTagName("td");
        var i = 0;
        $.each(data,function(key1,value1){
            $.each(value1,function(key,value){
                var rowcell = 0;
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
                    a[i] = new act();
                    a[i].name = value.name;

                    var diff= value.start[j].charCodeAt(0) //ASCII Code로 변환함
                    var long=0;
                    if(Number(diff)>=65 && Number(diff)<=70){ //A~F의 값일 경우 조건문
                        var pluscell= Number(diff)-Number('A'.charCodeAt(0));
                        rowcell=1+3*pluscell;
                        long=3;
                    }
                    else { //문자가 아닌 숫자형식
                        var time_num = Number(value.start[j]);
                        var pluscell = time_num - 1; //2.5-1 =1.5
                        rowcell = 1 + pluscell * 2;
                        long=2;
                    }
                    a[i].classdate = colcell;
                    a[i].start = rowcell;
                    a[i].long = long;
                    a[i].alarm = value.alarm;
                    i++;

                }
            });   
            
        })
        alert(arr.length);
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
            // return(-1);
        }

        for(var i =0; i< arr.length; i++){
            var alength = a.length;
            alert(arr[i].classdate);
            alert(arr[i].start);
            a[alength] = new act(arr[i].name, arr[i].classdate, arr[i].start, arr[i].long, true);
        }
            
        //alert(a);
        //alert(a[a.length-1]);
        
        // var fortest = [];

        for(var i = 0; i< a.length ; i++){
            var rowcell = a[i].classdate;
            var colcell = a[i].start;

            for(var k = 0; k < a[i].long; k++){
                var cells = rows[colcell+k].getElementsByTagName("td");
                cells[rowcell].innerHTML = a[i].name;

                // data[i] = new Object();
                // fortest[i] = new Object();
                // fortest[i].name = a[i].name;
                // //alert(a[i].name);
                // fortest[i].classdate = a[i].classdate;
                // fortest[i].start = a[i].start;
                // fortest[i].alarm = "Y";
                // data[i].activities = fortest[i];
                // testArray.push(data[i]);
            }
        }
        var jsonData = JSON.stringify(testArray, null, 4);
        socket.emit('jsondata', jsonData);
        //app.js에서 recommend랑 구분필요    
    //document.getElementById("rtn").append(strn);
    })

}




function pageReload(){
    window.location.reload();
}

