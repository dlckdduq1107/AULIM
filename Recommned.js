function Recommend(inputarr){ // 추천시간표에 추가해야할 활동내용 
    $.getJSON('time_table' , function(data){ // 기존 시간표 읽어오기
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
                    a[i] = [rowcell, colcell];
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
        var selectarr; // 유효한 랜덤값 배열
        while(true){ // selectarr를 inputarr만큼 얻을 때 까지 반복
            flag = true; // a arr에 값있는지 확인용
            var x = Math.floor(math.random()*6)+1   //랜덤으로 요일 설정
            var y = Math.floor(math.random()*30)+1   //랜덤으로 시간 설정  
            var select = [x,y];    // a arr모양으로 랜덤값 설정
            for(var j = 0; j < a.length; j++){
                if (select == a[j]){    // a arr에 랜덤값과 같은 값있으면 flag false로 바꿈 -> 다시 랜덤값 구해야함
                    flag = false;
                    break;
                }
            }
            if (flag){ // 랜덤값이 유효한 값인 경우
               // selectarr[i] = [x,y,inputarr[i].name, inputarr[i].long]; // selectarr에 추가함
                selectarr[i] = new Object()
                selectarr[i].name = inputarr[i].name;
                selectarr[i].start = inputarr[i].start;
                selectarr[i].long = selectarr[i].long;
                selectarr[i].alarm = selectarr[i].alarm;

                if(i >= inputarr.length){
                    break;
                }else{
                i++;
                }
            }
        }
        for(var i = 0; i<selectarr.length ; i++){
            var rowcell = selectarr[i][0];
            var colcell = selectarr[i][1];
            for(var k = 0; k < selectarr[i][3]; k++){
                var cells = rows[rowcell+k].getElementsByTagName("td");
                cells[colcell].innerHTML = value.name;
            }
        }
            var jsonTT = JSON.stringify(selectarr);

    })
}

