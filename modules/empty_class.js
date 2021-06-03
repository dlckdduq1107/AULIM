
const empty = async(index) => {
   for (var i = 1; i <= index; i++) {//인원수만큼 반복
      $.getJSON(`../data/sample_empty/student${i}.json`, function(data){//제이슨 파일 읽기
        var rows = document.getElementById("time_table").getElementsByTagName("tr");
        var cells = rows[4].getElementsByTagName("td");
         for (var j = 0; j < data["activities"].length; j++) {//과목수만큼 반복
            for (var k = 0; k < data["activities"][j]["classdate"].length; k++) {//시간수만큼 반복
              switch(data["activities"][j]["classdate"][k]){
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
              var diff= data["activities"][j]["start"][k].charCodeAt(0) //ASCII Code로 변환함
              var long=0;
              if(Number(diff)>=65 && Number(diff)<=70){ //A~F의 값일 경우 조건문
                  var pluscell= Number(diff)-Number('A'.charCodeAt(0))
                  rowcell=1+3*pluscell
                  long=3
              }
              else { //문자가 아닌 숫자형식
                  var time_num = Number(data["activities"][j]["start"][k])
                  var pluscell = time_num - 1 //2.5-1 =1.5
                  rowcell = 1 + pluscell * 2
                  long=2
              }

              //value.long[j]=long
              for(var q=0;q<long;q++){
                  var cells = rows[rowcell+q].getElementsByTagName("td");
                  cells[colcell].innerHTML = "수업시간";
              }



            }
         }
      });
   
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
                    mergeItem = item;
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

