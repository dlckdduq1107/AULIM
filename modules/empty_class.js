var table = [[],[],[],[],[]];
var monTable  = [];
var monCount = 0;

function dayToInt(day) {
    switch(day) {
        case '월':
            return 0;
            break;
        case '화':
            return 1;
            break;
        case '수':
            return 2;
            break;
        case '목':
            return 3;
            break;
        case '금':
            return 4;
            break;
        default:
            return;
    }
}

const empty = async(index) => {

   for (var i = 1; i <= index; i++) {//인원수만큼 반복
      $.getJSON(`../data/sample_empty/student${i}.json`, function(data){//제이슨 파일 읽기
        // console.log(data);
         for (var j = 0; j < data["activities"].length; j++) {//과목수만큼 반복
            for (var k = 0; k < data["activities"][j]["classdate"].length; k++) {//시간수만큼 반복
                monTable.push(data["activities"][j]["start"][k]);//딕셔너리에 추가
                //if(dayToInt(data["activities"][j]["classdate"][k]) == 0) monCount++;
            }
         }
      });
   
    }
    console.log(monTable);
    find();
}

function find(){
    var rowcell = 1;
    var colcell = 0;
    
    console.log(monTable.length);
    for(var idx=0; idx<=monTable.length; idx++){
        // console.log(table["월"]);
        value = table[idx];
        
    
       for (var i = 0; i < value.length; i++) {
          colcell = idx+1;
        //    console.log('here');
           var diff= value[i].charCodeAt(0) //ASCII Code로 변환함
           var long=0;
           if(Number(diff)>=65 && Number(diff)<=70){ //A~F의 값일 경우 조건문
               var pluscell= Number(diff)-Number('A'.charCodeAt(0))
               rowcell=1+3*pluscell
               long=3
           }
           else { //문자가 아닌 숫자형식
               var time_num = Number(value[i])
               var pluscell = time_num - 1 //2.5-1 =1.5
               rowcell = 1 + pluscell * 2
               long=2
           }

           for(var j=0;j<long;j++){
                var cells = rows[rowcell+j].getElementsByTagName("td");
                // console.log(cells);
                cells[colcell].innerHTML = "수업시간";
            }

       } 
    }

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