
function loadJSON(callback) {   
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', '../time_table.json', true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(JSON.parse(xobj.responseText));
    }
  };
  xobj.send(null);  
}

loadJSON(function(json){
	for (var i = 0; i < json.activities.length; i++) {
		console.log(json.activities[i].name);
		$(".content .list #course").append("<option onclick=\"load_memo("+"\'"+json.activities[i].name+"\'"+")\" ld="+json.activities[i].name+" value="+json.activities[i].name+">"+json.activities[i].name+"</option>");
	}
	
});

function load_memo(course_name){
  console.log(1);
}
