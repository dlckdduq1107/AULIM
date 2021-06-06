// const { createConnection } = require("mysql");

var socket = io();
var id;
var a = [];

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

function actSubmit1(){ // 버튼으로 입력받는 것 쪼개서함
    arr[count] = new act();
    var name1 = document.getElementById("act_name").value;
    var time1 = document.getElementById("time_input").value;
    var strn = name1 + "  " + time1 + "시간";
    var cvItime = parseInt(time1);
    var tcount1 = parseInt(cvItime*2/3); // 몫
    var tcount2 = (cvItime*2)%3;
    var longArr = [];   
    

    for(var i = 0; i < tcount1; i++ ){
        arr[count] = new act();
        arr[count].name = name1;
        arr[count].long = 3;
        count++;
    }
    if((time1 *2) % 3 == 1){
        //alert(tcount2);
        arr[count-1].long += tcount2;
    }else if(time1 % 3 != 0){
        arr[count] = new act();
        arr[count].name = name1;
        arr[count].long = tcount2;
        count++;
    }
    document.getElementById("rtn").append(strn);
    document.getElementById("rtn").append(document.createElement("br"));
}


function Recommend(){ // 추천시간표에 추가해야할 활동내용 
    var query = "SELECT * FROM activity WHERE user = '"+`${id}`+"';";
    alert(query);
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

        var rows = document.getElementById("time_table").getElementsByTagName("tr");
        var cells = rows[4].getElementsByTagName("td");

        //-------------------------위까지 기존 json파일 a배열에 집어넣음---------------------------------
        var flag = true;
        i = 0;
        var alength = 0;
        var x = 0;
        var y = 0;
        var repeat = 10000;
        while(true){ // selectarr를 inputarr만큼 얻을 때 까지 반복
            flag = true; // a arr에 값있는지 확인용
            x = Math.floor(Math.random()*6)+1   //랜덤으로 요일 설정
            y = Math.floor(Math.random()*30)+1   //랜덤으로 시간 설정
            
            if((y+(arr[i].long)-1) > 30){
                continue;
            }

            for(var j = 0; j < a.length ; j++){
                var pStart = a[j].start; //기존시작점
                var pEnd = a[j].start + a[j].long -1; //기존종료점
                var nStart = y; //추가할 시작점
                var nEnd = y+ arr[i].long -1; //추가할 종료점
                if(a[j].name == arr[i].name && a[j].classdate == x){
                    flag = false;
                    break;
                }
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
            
            if(flag == true){
                alength = a.length; //a배열의 끝에 추가
                a[alength] = new act(arr[i].name, x, y, arr[i].long, true);
                i++;
                if(i==arr.length){
                    break;
                }
            }
            repeat--;
            if(repeat==0){
                alert("넣을 자리가 없어요~");
                break;
            }
        }
        
        //----------------랜덤한 좌표로 classdate start잡아서 a배열 뒤에 집어넣음--------------------
 
        for (var num = 1; num <= 7; num++) {
            $('tr','#time_table').each(function(row){  // #테이블ID값
                if(row > 0 ){
                mergeCount = mergeCount + 1;
                $("tr:eq("+row+") > td:eq("+num+")").attr("rowspan",1);
                $('td:eq('+num+')',$(this)).show(); //병합될 값들 숨김처리
                }
            })
        }

        var testArray = new Array();
        var data = [];
        var fortest = [];
        for(var i = 0; i<a.length ; i++){
            var rowcell = a[i].classdate;
            var colcell = a[i].start;
            alert(colcell);
            alert(a[i].long);
            for(var k = 0; k < a[i].long; k++){
                var cells = rows[colcell+k].getElementsByTagName("td");
                cells[rowcell].innerHTML = a[i].name;
            }

            data[i] = new Object();
            fortest[i] = new Object();
            fortest[i].name = a[i].name;
            fortest[i].classdate = a[i].classdate;
            fortest[i].start = a[i].start;
            fortest[i].long = a[i].long;
            fortest[i].alarm = "Y";
            data[i].activities = fortest[i];
            testArray.push(data[i]);
        }
        var jsonData = JSON.stringify(testArray, null, 4);
        alert(jsonData);


        
        for (var num = 1; num < 7; num++) {
            var mergeItem = "절대나올수없는값"; //병합구분값
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
        // for(var i = 0 ; i< a.length; i++){
        //     var query = "INSERT IGNORE activity VALUES('" + `${id}` +"',"+ a[i].classdate + ", " + a[i].start + ", " + a[i].long+", '" + a[i].name + "') ";
        //     socket.emit('query', query);
        // }
        // socket.emit('jsondata', jsonData);
    });
    // for(var i = 0; i < a.length; i++){
    //     alert(a[i].name);
    // }
    
    // var rows;
    // //var cols;
    //     //-------------------------위까지 기존 json파일 a배열에 집어넣음---------------------------------
    //     var flag = true;
    //     i = 0;
    //     //var selectarr = []; // 유효한 랜덤값 배열
    //     var tempTime =0;
    //     var alength = 0;
    //     var x = 0;
    //     var y = 0;
    //     var repeat = 10000;
    //     while(true){ // selectarr를 inputarr만큼 얻을 때 까지 반복
    //         flag = true; // a arr에 값있는지 확인용
    //         x = Math.floor(Math.random()*6)+1   //랜덤으로 요일 설정
    //         y = Math.floor(Math.random()*30)+1   //랜덤으로 시간 설정
            
    //         if((y+(arr[i].long)-1) > 30){
    //             continue;
    //         }

    //         for(var j = 0; j < a.length ; j++){
    //             var pStart = a[j].start; //기존시작점
    //             var pEnd = a[j].start + a[j].long -1; //기존종료점
    //             var nStart = y; //추가할 시작점
    //             var nEnd = y+ arr[i].long -1; //추가할 종료점
    //             if(a[j].name == arr[i].name && a[j].classdate == x){
    //                 flag = false;
    //                 break;
    //             }
    //             if(a[j].classdate == x && pStart <= nStart && pEnd >= nStart){
    //                 flag = false;
    //                 break;
    //             } else if (a[j].classdate == x && pStart <= nEnd && pEnd >= nEnd ){
    //                 flag = false;
    //                 break;
    //             } else if (a[j].classdate == x && pStart >= nStart &&  pEnd <= nEnd){
    //                 flag = false;
    //                 break;
    //             }
    //         }
            
    //         if(flag == true){
    //             alength = a.length; //a배열의 끝에 추가
    //             a[alength] = new act(arr[i].name, x, y, arr[i].long, true);
    //             i++;
    //             if(i==arr.length){
    //                 break;
    //             }
    //         }
    //         repeat--;
    //         if(repeat==0){
    //             alert("넣을 자리가 없어요~");
    //             break;
    //         }
    //     }
        
    //     //----------------랜덤한 좌표로 classdate start잡아서 a배열 뒤에 집어넣음--------------------
    //     //window.location.reload();
    //     //alert(a.length);
    //     var testArray = new Array();
    //     var data = [];
    //     var fortest = [];
    //     for(var i = 0; i<a.length ; i++){
    //         var rowcell = a[i].classdate;
    //         //alert(rowcell);
    //         var colcell = a[i].start;
    //         for(var k = 0; k < a[i].long; k++){
    //             var cells = rows[colcell+k].getElementsByTagName("td");
    //             cells[rowcell].innerHTML = a[i].name;
    //         }

    //         data[i] = new Object();
    //         fortest[i] = new Object();
    //         fortest[i].name = a[i].name;
    //         //alert(a[i].name);
    //         fortest[i].classdate = a[i].classdate;
    //         fortest[i].start = a[i].start;
    //         fortest[i].long = a[i].long;
    //         fortest[i].alarm = "Y";
    //         data[i].activities = fortest[i];
    //         testArray.push(data[i]);
    //     }
    //     var jsonData = JSON.stringify(testArray, null, 4);
    //     alert(jsonData);


        
    //     for (var num = 1; num < 7; num++) {
    //         var mergeItem = "절대나올수없는값"; //병합구분값
    //         var mergeCount = 0; //병합 수
    //         var mergeRowNum = 0;  //병합들num갈 r1w
    //         $('tr','#time_table').each(function(row){  // #테이블ID값
    //             if(row > 0 ){
    //                 var item = $(':eq(' + num +')',$(this)).html();
    //                 if(mergeItem != item  ) {
    //                     mergeCount = 1;
    //                     mergeItem = item ;
    //                     mergeRowNum = row;
    //                 }else{
    //                     mergeCount = mergeCount + 1;
    //                     $("tr:eq("+mergeRowNum+") > td:eq("+num+")").attr("rowspan",mergeCount);
    //                     $('td:eq('+num+')',$(this)).hide(); //병합될 값들 숨김처리
    //                 }
    //             }
    //         })
    //     }
    //     for(var i = 0 ; i< a.length; i++){
    //         var query = "INSERT IGNORE activity VALUES('" + `${id}` +"',"+ a[i].classdate + ", " + a[i].start + ", " + a[i].long+", '" + a[i].name + "') ";
    //         socket.emit('query', query);
            
    //     }
    //     socket.emit('jsondata', jsonData);
    // })
}

function saveDB(){
    for(var i = 0 ; i< a.length; i++){
        var query = "INSERT IGNORE activity VALUES('" + `${id}` +"',"+ a[i].classdate + ", " + a[i].start + ", " + a[i].long+", '" + a[i].name + "') ";
        socket.emit('query', query);
    }
    socket.emit('jsondata', jsonData);
}

function pageReload(){
    window.location.reload();
}

