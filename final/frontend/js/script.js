$( document ).ready(function() {
    var credential = localStorage.getItem('credentialCheck');
    if (credential == 'false' || credential == null){
        location.href="login.html";
    }
    getBookName();
    getAllBooks();
});

function getBookName(){
    $("#bookSearch").keyup(function(){
        var bookToSearch = $("#bookSearch").val();
        var url = "http://localhost:5555/getBookInfo/" + bookToSearch;
        $("#books").empty();
        $.ajax({url: url, success: function(data){
            console.log("data :>", data["result"])
            if (data["result"] !== null){
                console.log(data["result"]["imageName"])
                $("#books").append(
                    '<div class="col-md-3">' +
                        '<div class="card">' +
                            '<img src="http://localhost:5555/'+ data["result"]["imageName"] +'" class="card-img-top" alt="...">'+
                            '<div class="card-body">' +
                                '<h5 class="card-title">'+ data["result"]["bookName"] +'</h5>' +
                                '<a href="'+ data["result"]["amazonUrl"] +'" target="_blank">Go to Maxi</a>'+
                            '</div>'+
                        '</div>' +
                    '</div> ');
            }
            
          }});
    });
}

function getAllBooks(){
    var url = "http://localhost:5555/getAllBooks/";
    $.ajax({url: url, success: function(data){
        var result = data["foodInfoJSON"];
        for (var i=0; i < result.length; i++){
            if (data["result"] !== null){
                $("#books").append(
                    '<div class="col-md-3">' +
                        '<div class="card">' +
                            '<img src="http://localhost:5555/'+ result[i]["imageName"] +'" class="card-img-top" alt="...">'+
                            '<div class="card-body">' +
                                '<h5 class="card-title">'+ result[i]["bookName"] +'</h5>' +
                                '<a href="'+ result[i]["amazonUrl"] +'" target="_blank">Go to Maxi</a>'+
                            '</div>'+
                        '</div>' +
                    '</div>');
                $("#showAllBooksInUpdateBook").append(
                    '<tr>' +
                    '<th scope="row">' + parseInt(i + 1) + '</th>' +
                    '<td>' + result[i]["bookName"] + '</td>' +
                    '<td class="text-wrap" style="width: 15px;"><a href="' + result[i]["amazonUrl"] + '" target="_blank">' + result[i]["amazonUrl"] + '</a></td>' +
                    '<td><div style="width:15em;"><img src="http://localhost:5555/' + result[i]["imageName"] + '" style="width:100%;" class="img-responsive"></div></td>' +
                    '<td><button id="' + result[i]["id"] + '" type="button" class="btn btn-dark" onClick="showTableBasedOnId(\'' + result[i]["id"] + '\'); hideShow();">Update Item</button></td>' +
                    '</tr>');
                $("#showAllBooksInDeleteBook").append(
                    '<tr>' +
                    '<th scope="row">' + parseInt(i + 1) + '</th>' +
                    '<td>' + result[i]["bookName"] + '</td>' +
                    '<td class="text-wrap" style="width: 15px;"><a href="' + result[i]["amazonUrl"] + '" target="_blank">' + result[i]["amazonUrl"] + '</a></td>' +
                    '<td><div style="width:15em;"><img src="http://localhost:5555/' + result[i]["imageName"] + '" style="width:100%;" class="img-responsive"></div></td>' +
                    '<td><button id="' + result[i]["id"] + '" type="button" class="btn btn-dark" onClick="deleteBook(\'' + result[i]["id"] + '\')">Delete Item</button></td>' +
                    '</tr>');

            }
          }      
      }});
}
