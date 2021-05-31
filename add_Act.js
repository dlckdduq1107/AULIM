var arr = [];
var count = 0;
function actSubmit1(act_name, time_input){
    //arr[count] = new object;
    const name = act_name.value + "  "+ time_input.value + "시간";
    rtn.append(name);
    const name1 = act_name.value;
    const time1 = time_input.value;
    arr[count].name = name1;
    arr[count].time = time1;
    if(count != 0)
    count++;
}