$.getJSON('time_table.json', function(data){ // 기존 시간표 읽어오기
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
                // var cells = rows[rowcell].getElementsByTagName("td");
                // cells[colcell].innerHTML = value.name;
                // var cells = rows[rowcell+1].getElementsByTagName("td");
                // cells[colcell].innerHTML = value.name;
                // var cells = rows[rowcell+2].getElementsByTagName("td");
                // cells[colcell].innerHTML = value.name;
            }
            i++;
        });
    })
})
var inputarr;
for(var i = 0; i < inputarr.length; i++){
    
}

