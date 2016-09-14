	
var nasaApiKey = "&api_key=qVFWydcClpA2utQfaZBW0s0R70S0XQvDyh59Y2Jh";
var startUrl = "https://api.nasa.gov/neo/rest/v1/feed?start_date=";
var endUrl = "&end_date=";
var finalUrl = "";
var dataObj = {api_key:nasaApiKey};

$("#send").on('click', function() {
	var start = $("#start").val().trim();
	var end = $("#end").val().trim();
	var nasaUrl = startUrl + start + endUrl + end + finalUrl;
	console.log(nasaUrl);


$.ajax({
			url: nasaUrl,
			method: "GET",
			data: dataObj

		}).done(function(res){
			console.log(res);
		}

});

