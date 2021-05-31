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

function actSubmit1(){
    //arr[count] = new object;
    arr[count] = new act;
    var name1 = document.getElementById("act_name").value;
    var time1 = document.getElementById("time_input").value;
    var strn = name1 + "  " + time1 + "시간";
    document.getElementById("rtn").append(strn);
    arr[count].name = name1;
    arr[count].long = time1;
    count++;
}

//const { json } = require("express");

function Calling(){
    Recommend(arr);
}


function Recommend(inputarr){ // 추천시간표에 추가해야할 활동내용 
    $.getJSON('time_table.json' , function(data){ // 기존 시간표 읽어오기
        var rows = document.getElementById("time_table").getElementsByTagName("tr");
        var cells = rows[4].getElementsByTagName("td");
        var a = [];
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
                    switch(value.start[j]){
                        case 'A':
                            rowcell = 1;
                            break;
                        case 'B':
                            rowcell = 4;
                            break;
                        case 'C':
                            rowcell = 7;
                            break;
                        case 'D':
                            rowcell = 10;
                            break;
                        case 'E':
                            rowcell = 13;
                            break;
                        case 'F':
                            rowcell = 16;
                            break;
                    }
                    //a[i] = [rowcell, colcell];
                    a[i] = new act();
                    a[i].name = value.name;
                    a[i].classdate = value.classdate;
                    a[i].start = value.start;
                    a[i].alarm = value.alarm;
                    for(var k = 0; k < value.long; k++){
                        var cells = rows[rowcell+k].getElementsByTagName("td");
                        cells[colcell].innerHTML = value.name;
                    }
                }
                i++;
            });
        })
        var flag = true;
        var i = 0;
        var selectarr = []; // 유효한 랜덤값 배열
        while(true){ // selectarr를 inputarr만큼 얻을 때 까지 반복
            flag = true; // a arr에 값있는지 확인용
            var x = Math.floor(Math.random()*6)+1   //랜덤으로 요일 설정
            var y = Math.floor(Math.random()*30)+1   //랜덤으로 시간 설정  
            var select = [x,y];    // a arr모양으로 랜덤값 설정
            for(var j = 0; j < a.length; j++){
                for(var k=0; k<a[j].start.length; k++){
                    if(isNaN(a[j].start[k])){ //알파벳인 경우
                        if (select[0] == a[j].classdate[k] && select[1] == a[j].start[k]
                            && select[1] == a[j].start[k]+1 && select[1] == a[j].start[k]+2){    // a arr에 랜덤값과 같은 값있으면 flag false로 바꿈 -> 다시 랜덤값 구해야함
                            flag = false;
                            break;        
                        } 
                    }else{
                        if (select[0] == a[j].classdate[k] && select[1] == a[j].start[k]
                            && select[1] == a[j].start[k]+1){    // a arr에 랜덤값과 같은 값있으면 flag false로 바꿈 -> 다시 랜덤값 구해야함
                            flag = false;
                            break;        
                        }
                    }
                }
                if(flag == false)
                break;
            }
            if (flag){ // 랜덤값이 유효한 값인 경우
               //selectarr[i] = [x,y,inputarr[i].name, inputarr[i].long]; // selectarr에 추가함
               alert(arr.length);
               
               selectarr[i] = new act;
               selectarr[i].name = inputarr[i].name;
               selectarr[i].classdate = select[0];
               selectarr[i].start = select[1];
               selectarr[i].long = inputarr[i].long;
               selectarr[i].alarm = 'Y';
                if(i >= arr.length-1){
                    break;
                }else{
                i++;
                }
            }
        }
        for(var i = 0; i<selectarr.length ; i++){
            var rowcell = selectarr[i].classdate;
            var colcell = selectarr[i].start;
            //alert(rowcell);
            //alert(colcell);
            for(var k = 0; k < selectarr[i].long; k++){
                //alert('hi?');
                var cells = rows[colcell+k].getElementsByTagName("td");
                cells[rowcell].innerHTML = selectarr[i].name;
            }
        }
            //var jsonTT = JSON.stringify(selectarr);
            
    })
}

