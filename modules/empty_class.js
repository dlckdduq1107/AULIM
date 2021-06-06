
const empty = async(index) => {
   for (var i = 1; i <= index; i++) {//인원수만큼 반복
      $.getJSON(`../data/sample_empty/student${i}.json`, function(data){//제이슨 파일 읽기
        var rows = document.getElementById("time_table").getElementsByTagName("tr");
        $.each(data,function(key1,value1){
            $.each(value1,function(key,value){
                console.log(value);

                var colcell = value.classdate;
                var long = value.long;
                var rowcell = value.start;
                
                //value.long[j]=long
                for(var i=0;i<long;i++){
                    var cells = rows[rowcell+i].getElementsByTagName("td");
                    cells[colcell].innerHTML = " ";
                    cells[colcell].style.backgroundColor = "#ffffff";
                }

            });
        });
         
      });
   
    }

    var tab = document.getElementById('time_table');//타임테이블 로드
    for(var i=1; i<32; i++) {//총 가로 길이
        for(var j=1; j<7; j++) {//총 세로 길이
                tab.rows[i].cells[j].style.backgroundColor = 'cornflowerblue';//모든 셀을 코발트 블루 색으로 먼저 칠함
                tab.rows[i].cells[j].innerHTML = "공강 시간";//모든 셀을 공강시간으로 초기화 설정
        }
    }


    setTimeout(function(){//셀병합 부분
      for (var num = 1; num <= 7; num++) {
        var mergeItem = "절대나올수 없는값"; //병합구분값
        var mergeCount = 0; //병합 수
        var mergeRowNum = 0;  //병합들num갈 
          $('tr','#time_table').each(function(row){  // #테이블ID값
              if(row > 0 ){
                var item = $(':eq(' + num +')',$(this)).html();
                if(mergeItem != item) {
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
    setTimeout(()=> {for (var num = 1; num <= 7; num++) {
        $('tr','#time_table').each(function(row){  // #테이블ID값
            if(row > 0 ){
            mergeCount = mergeCount + 1;
            $("tr:eq("+row+") > td:eq("+num+")").attr("rowspan",1);
            $('td:eq('+num+')',$(this)).show(); //병합될 값들 숨김처리
            }
        })
    }}, 1000)
       
    },1000);//비동기화 문젤 해결을 위한 setTimeout


}

