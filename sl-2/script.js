function hideParagraph() {
    $("p").hide(); 
    $("#hideP").hide(); 
    $("#showP").show(); 
}

function showParagraph() {
    $("p").show();  
    $("#hideP").show();
    $("#showP").hide();
}


$(document).ready(function(){
    var myJson = {"name": "john doe", "age": 21, "city": "Montreal"};
    $("h2").html(myJson.name + ", " + myJson.age + ", " + myJson.city);
});
