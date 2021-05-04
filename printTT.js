

$(document).ready(function(){
    class act{
        constructor(name, classdate, start, long, alarm){
            this.name = name;
            this.classdate = classdate;
            this.start = start;
            this.long = long;
            this.alarm = alarm;
        }
    }
    $.getJSON('time_table.json', function(data){
        var rows = document.getElementById("time_table").getElementsByTagName("tr");
        var cells = rows[4].getElementsByTagName("td");
        var a = [];
        var i = 0;
        $.each(data,function(key,value){
            a[i] = new act;
            a[i].name = value.name;
            a[i].classdate = value.classdate;
            a[i].start = value.start;
            a[i].alarm = value.alarm;
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
                //alert(rowcell, colcell);
                var cells = rows[rowcell].getElementsByTagName("td");
                cells[colcell].innerHTML = value.name;
                var cells = rows[rowcell+1].getElementsByTagName("td");
                cells[colcell].innerHTML = value.name;
                var cells = rows[rowcell+2].getElementsByTagName("td");
                cells[colcell].innerHTML = value.name;
            }
            i++;
        });
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
    });
});
    
/*
Act = Function(naem, classdate, start, long, alarm){
    this.name= naem;
    this.classdate=classdate;
}

/*
for(var key in activity){
    for(activity[key] in value){
        if(activity[key]=='start'){
            // 10.5 a.start = value[activity][key]
        }
        if(activity[key]=='actname'){

        }
        if(activity[key]=='classdate'){
            //숫자로 표현 1월,2화,3수,4목,5금
        }
        if(activity[key]=='long'){

        }
    }

    timeFinder(a)
    //객체 초기화
}
*/