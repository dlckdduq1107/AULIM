
const empty = async(index) => {
   for (var i = 1; i <= index; i++) {//인원수만큼 반복
      $.getJSON(`../data/sample_empty/student${i}.json`, function(data){//제이슨 파일 읽기
        var rows = document.getElementById("time_table").getElementsByTagName("tr");
        var cells = rows[4].getElementsByTagName("td");
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
    function merge() {
        for (var num = 1; num < 7; num++) {
            var mergeItem = "q"; //병합구분값
            var mergeCount = 0; //병합 수
            var mergeRowNum = 0;  //병합들num갈 r1w
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
                });
            }
    }

    setTimeout(()=>{
        var tab = document.getElementById('time_table');
        for(var i=1; i<32; i++) {
            for(var j=1; j<7; j++) {
                    if(tab.rows[i].cells[j].innerHTML != " ")
                    tab.rows[i].cells[j].style.backgroundColor = 'cornflowerblue';
                    tab.rows[i].cells[j].innerHTML = "공강 시간";
            }
        }
        merge();
    }, 200);
    

}

