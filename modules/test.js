window.onload = function setRowspan() {  //num 병합을 원하는 열
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
