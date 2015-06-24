var NewKeywordView = Backbone.View.extend({
	tagName: "div",

  className: "navbar-default",

  events: {
    'click #kwque':'QueKeyWord'
  },

  QueKeyWord: function (event){

  	var queryURL ="";
  	var keyword = _.escape(document.getElementById('newKeyWord').value);
  	var startDate = _.escape(document.getElementById('startDate').value);
  	var endDate = _.escape(document.getElementById('endDate').value);
  	
  	function validKeyWord (){
  		return keyword !== "Search Term";
  	}




  	if (validKeyWord()){
  		queryURL += "keyword="+keyword;
  	}

  	if (startDate != "Start Date" && validKeyWord()){
  		queryURL += "&startDate="+startDate;
  	}

  	if (endDate != "End Date" && validKeyWord()) {
  		queryURL += "&endDate="+endDate;
  	}
  	if (queryURL.length > 0){
  		queryURL ="?"+queryURL;
  	}
  	
  	console.log(queryURL);


  	//build query on url
  	$.ajax({
	 	url: "/newsapi" + queryURL,
	  	type: "GET"
		})
	  .done(function( data ) {
	    console.log("successful post");
    return data;
	  });
  },

  initialize: function() {
  	this.render();
  	//Date Picker is wrapped in document ready because the date picker will only work with jQuery selector.
  	$(function (){
	  	var start = $("#startDate");
	  	start.datepicker({
	  		dateFormat: "yymmdd",
		    changeMonth: true,
		    changeYear: true
	    });
	  	var stop = $("#endDate");
	  	stop.datepicker({
	  		dateFormat: "yymmdd",
		    changeMonth: true,
		    changeYear: true
	    });
  	});
  },

  render: function() {
  	return this.$el.html('<input id="newKeyWord" type="text" value="Search Term"></input><input id="startDate" type="text" value="Start Date"></input><input id="endDate" type="text" value="End Date"></input><input id="kwque" type="submit" value="Que Keyword"></input>');
  }

});