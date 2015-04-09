
var getData = function (){
	$.ajax({
	  url: "localhost:8080/data",
	})
  .done(function( data ) {
    console.log(data);
    return data;
  });
}