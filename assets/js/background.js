$(document).on("ready", function() {
	//AJAX Call for Picture of the day
	$.ajax({
		url: "https://api.nasa.gov/planetary/apod?api_key=qVFWydcClpA2utQfaZBW0s0R70S0XQvDyh59Y2Jh",
		method: "GET"
	}).done(function(res) {
	//Adds Picture of the Day to the background of Project
		var imageUrl = res.hdurl
		$('html').css('background-image', 'url("' + imageUrl + '")');
	}).fail(function(err) {
		console.log(err);
	});
	//End code Background Image Code
});