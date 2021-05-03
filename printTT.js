

$(document).ready(function(){
    var rows = document.getElementById("이름입니당").getElementByTagName("tr");

}


class act{
    constructor(name, classdate, start, long, alarm){
        this.name = name;
        this.classdate = classdate;
        this.start = start;
        this.long = long;
        this.alarm = alarm;
    }
    timeFinder(){
        var cells = rows[this.classdate].getElementsByTagName("td"); //행찾기요일찾기
        var timeplace = this.start //실수를 변수로 변경 , 열찾기
        cells[timeplace].innerHTML = a.name;// 위치 내용 변경
    }
}

Act = Function(naem, classdate, start, long, alarm){
    this.name= naem;
    this.classdate=classdate;
}
var act1=Act('SE',1,10,2,'N');

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

