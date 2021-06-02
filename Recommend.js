var socket = io();
var id;

socket.on('recMsg', (data)=> {
    console.log(data);
    id = data.userId;
    //setTimeout(printTable(), 500);
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


function actSubmit1(){
    arr[count] = new act();
    var name1 = document.getElementById("act_name").value;
    var time1 = document.getElementById("time_input").value;
    var strn = name1 + "  " + time1 + "시간";
    var time2 = parseInt(time1);
    var tcount = time1 / 3;
    var longArr = [];
    if(time1 % 3 != 0){
        for(var i = 0; i < tcount; i++ ){
            longArr[i] = 3;
        }
        longArr[longArr.length] = time1%3;
    }
    document.getElementById("rtn").append(strn);
    arr[count].name = name1;
    arr[count].long = longArr;
    count++;
}


function Recommend(){ // 추천시간표에 추가해야할 활동내용 
    //$.getJSON('time_table-wlstnsp1.json' , function(data){ // 기존 시간표 읽어오기
    $.getJSON(`../data/time_table-${id}.json`, function(data){
        var rows = document.getElementById("time_table").getElementsByTagName("tr");
        var cells = rows[4].getElementsByTagName("td");
        var i = 0;
        var a = [];
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
        var flag = true;
        i = 0;
        //var selectarr = []; // 유효한 랜덤값 배열
        var tempTime =0;
        var alength = 0;
        var x = 0;
        var y = 0;
        while(true){ // selectarr를 inputarr만큼 얻을 때 까지 반복
            flag = true; // a arr에 값있는지 확인용
            x = Math.floor(Math.random()*6)+1   //랜덤으로 요일 설정
            y = Math.floor(Math.random()*30)+1   //랜덤으로 시간 설정
            var lll = y+(arr[i].long)-1;

            if((lll) > 30){
                continue;
            }


            for(var j = 0; j < a.length ; j++){
                var pStart = a[j].start;
                var pEnd = a[j].start + a[j].long -1;
                var nStart = y;
                var nEnd = y+ arr[i].long -1;
                if(a[j].classdate == x && pStart <= nStart && pEnd >= nStart){
                    flag = false;
                    break;
                } else if (a[j].classdate == x && pStart <= nEnd && pEnd >= nEnd ){
                    flag = false;
                    break;
                } else if (a[j].classdate == x && pStart >= nStart &&  pEnd <= nEnd){
                    flag = false;
                    break;
                }

            }





            // for(var j = 0; j < a.length ; j++){
            //     var pStart = a[j].start;
            //     var pEnd = a[j].start + a[j].long -1;
            //     var nStart = y;
            //     var nEnd = y+ arr[i].long -1;
            //     if(a[j].classdate == x && pStart <= nStart && pEnd >= nStart){
            //         flag = false;
            //         break;
            //     } else if (a[j].classdate == x && pStart <= nEnd && pEnd >= nEnd ){
            //         flag = false;
            //         break;
            //     } else if (a[j].classdate == x && pStart >= nStart &&  pEnd <= nEnd){
            //         flag = false;
            //         break;
            //     }

            // }
            //alert(arr.length);
            
            if(flag == true){
                //alert(a.length);
                alength = a.length;
                a[alength] = new act(arr[i].name, x, y, arr[i].long, true);
                i++;
                if(i==arr.length){
                    break;
                }
            }
        }
        //window.location.reload();
        //alert(a.length);
        var testList = new Array();
        var prevname = "";
        for(var i = 0; i<a.length ; i++){
            //alert(a[i].name);
            //alert(a[i].classdate);
            var rowcell = a[i].classdate;
            var colcell = a[i].start;
            for(var k = 0; k < a[i].long; k++){
                var cells = rows[colcell+k].getElementsByTagName("td");
                cells[rowcell].innerHTML = a[i].name;
            }
            // var data = new Object();
            // var fortest = new Object();
            // var tmpclassdate = new Array();
            // var tmparray = new Array();
            // if(prevname == a.name){
                
            // }
            
        }
        var data = new Object();
        var fortest = new Object();
        var jsonData = new Array();
        fortest.name = "소프트웨어공학";
        fortest.classdate = ["화", "금"];
        fortest.start = ["C, C"];
        fortest.alarm = "Y";
        data.activities = fortest;
        testList.push(data);
        var jsonData = JSON.stringify(testList);
        alert(jsonData);


        var mergeItem = ""; //병합구분값
        var mergeCount = 0; //병합 수
        var mergeRowNum = 0;  //병합들num갈 r1w
        for (var num = 1; num < 7; num++) {
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
        }
        
        

    )
}

function pageReload(){
    window.location.reload();
}

