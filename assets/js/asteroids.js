$(document).on("ready", function() {
	//AJAX Call for Picture of the day
	$.ajax({
		url: "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=Asteroid&callback=?",
		method: "GET",
		contentType: "application/json; charset=utf-8",
		dataType: "json"
		
	}).done(function(res) {
	//Adds Picture of the Day to the background of Project
		var summaryURL = res['query']['pages']['791']['extract'];
		$('#summary').append(summaryURL);
	}).fail(function(err) {
		console.log(err);
	});
	//End code Background Image Code

	var nasaApiKey = "&api_key=qVFWydcClpA2utQfaZBW0s0R70S0XQvDyh59Y2Jh";
	var startUrl = "https://api.nasa.gov/neo/rest/v1/feed?start_date=";
	var endUrl = "&end_date=";
	var finalUrl = "&api_key=qVFWydcClpA2utQfaZBW0s0R70S0XQvDyh59Y2Jh";

	function numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	var inputDate = "#start";
	$(inputDate).datepicker({
		dateFormat: 'yy-mm-dd'
	});

	$("#btnClear").on('click', function() {
		$("#result").html("");
	});

	$("#btnSend").on('click', function() {
		var start = $("#start").val().trim();
		var nasaUrl = startUrl + start + endUrl + start + finalUrl;

		$.ajax({
			url: nasaUrl,
			method: "GET"
		}).done(function(res){
			var asteroids = res.near_earth_objects;
			var nEobs = {};
			for (var key in asteroids)
			{
				if (asteroids.hasOwnProperty(start))
				{
					nEobs = asteroids[key];
				}
			}
			var proximity = 1000000000000000000;
			var year = start.slice(0,4);
			var date = start.slice(5,start.length);
			var newDate = date + "-" + year;
			var diameter = 0;
			var velocity = 0;
			var neoLink = "";
			var neoName = "";
			var output = "";
			var moreInfo = "";

			if(nEobs.length > 0)
			{
				for (i = 0; i < nEobs.length; i++)
				{
					if(i === 0)
					{//this takes the proximity of the first asteroid
						proximity = parseInt(nEobs[i].close_approach_data[0].miss_distance.miles);
						diameter = nEobs[i].estimated_diameter.feet.estimated_diameter_max;
						velocity = nEobs[i].close_approach_data[0].relative_velocity.miles_per_hour;
						neoLink = nEobs[i].nasa_jpl_url;
						neoName = nEobs[i].name;
					}
					else if (parseInt(nEobs[i].close_approach_data[0].miss_distance.miles) < proximity)
					{
						proximity = parseInt(nEobs[i].close_approach_data[0].miss_distance.miles);
						diameter = nEobs[i].estimated_diameter.feet.estimated_diameter_max;
						velocity = nEobs[i].close_approach_data[0].relative_velocity.miles_per_hour;
						neoLink = nEobs[i].nasa_jpl_url;
						neoName = nEobs[i].name;
					}
				}
				output = "<br><br>On " + newDate + " the nearest asteroid, NASA ID: " + neoName + ", missed Earth by " 
				  + numberWithCommas(proximity) + " miles, was moving at a velocity of " + numberWithCommas(Math.round(velocity)) 
				  + " miles/hour and had an approximate maximum diameter of " + numberWithCommas(Math.round(diameter)) + " feet.";
				moreInfo = "<br><div><a target ='_blank' href=" +neoLink + ">Would you like to know more?</a></div>";
			}
			else
			{
				output = "No data found";	
				moreInfo = "";
			}
			// console.log(proximity, Math.round(diameter), Math.round(velocity));
			$("#result").append(output);
			$("#result").append(moreInfo);
		});
	});
});