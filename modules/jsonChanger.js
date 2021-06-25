//제이슨->제이슨(설정한 형태에 맞도록)

function change(data) {
    var a = [];
    jsonData = JSON.parse(data);

    for(var i=0; i<jsonData['activities'].length; i++) {
        for(var j=0; j<jsonData['activities'][i]['classdate'].length; j++) {
            act = jsonData['activities'][i];
            var newAct = {'activities' : ''};
            newAct['activities'] = {'name':'', 'classdate':'', 'start':'', 'long':''};
            newAct['activities']['name'] = act['name'];
            newAct['activities']['classdate'] = datToInt(jsonData['activities'][i]['classdate'][j]);

            var rowcell;
            var diff= jsonData['activities'][i]['start'][j].charCodeAt(0) //ASCII Code로 변환함
            var long=0;
            if(Number(diff)>=65 && Number(diff)<=70){ //A~F의 값일 경우 조건문
                var pluscell= Number(diff)-Number('A'.charCodeAt(0));
                rowcell=1+3*pluscell;
                long=3;
            }
            else { //문자가 아닌 숫자형식
                var time_num = Number(jsonData['activities'][i]['start'][j]);
                var pluscell = time_num - 1; //2.5-1 =1.5
                rowcell = 1 + pluscell * 2;
                long=2;
            }
            
            newAct['activities']['start'] = rowcell;
            newAct['activities']['long'] = long;

            a.push(newAct);
        }

    }
    return JSON.stringify(a, null, 4);
}

function datToInt(day) {
    switch(day) {
        case '월':
            return 1;
        case '화':
            return 2; 
        case '수':
            return 3;
        case '목':
            return 4;
        case '금':
            return 5;
        case '토':
            return 6;
        default:
            break;
    }
}

module.exports.change = change;