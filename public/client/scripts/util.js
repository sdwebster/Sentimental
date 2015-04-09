
var getData = function (){
	$.ajax({
	  url: "/data",
	})
  .done(function( data ) {
    console.log(data);
    return data;
  });
}