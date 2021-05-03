

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
    $.getJSON('test.json', function(data){
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
            // alert(value.classdate);
            var cells = rows[value.classdate].getElementsByTagName("td");
            // alert(cells[value.start].innerHTML);
            cells[value.start].innerHTML = value.name;

            i++;
            
        });
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