

//AJAX Call for Picture of the day
    $.ajax({
        url: "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=Asteroid&callback=?",
        method: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",

    }).done(function(res) {
    //Adds Picture of the Day to the background of Project
        var summaryURL = res['query']['pages']['791']['extract'];
        $('#summary').append(summaryURL);

        console.log(res);

    }).fail(function(err) {
        console.log(err);
    });
    //End code Background Image Code

var nasaApiKey = "&api_key=qVFWydcClpA2utQfaZBW0s0R70S0XQvDyh59Y2Jh";
var startUrl = "https://api.nasa.gov/neo/rest/v1/feed?start_date=";
var endUrl = "&end_date=";
var finalUrl = "&api_key=qVFWydcClpA2utQfaZBW0s0R70S0XQvDyh59Y2Jh";


$("#send").on('click', function() {
  var start = $("#start").val().trim();
  var nasaUrl = startUrl + start + endUrl + start + finalUrl;
  console.log(nasaUrl);


$.ajax({
      url: nasaUrl,
      method: "GET"

    }).done(function(res){
      console.log(res);
      var asteroids = res.near_earth_objects;
      console.log(asteroids);
      for (var key in asteroids) {
        console.log("YEA");
          if (asteroids.hasOwnProperty(start)) {
              console.log(key + " -> " + asteroids[key]);
              var nEobs = asteroids[key];
          }
        }
      var proximity = 1000000000000000000;
      console.log(nEobs);
      for (i = 0; i < nEobs.length; i++) {
        if (nEobs[i].close_approach_data[0].miss_distance.miles < proximity) {
          proximity = nEobs[i].close_approach_data[0].miss_distance.miles;
          var diameter = nEobs[i].estimated_diameter.feet.estimated_diameter_max;
          var velocity = nEobs[i].close_approach_data[0].relative_velocity.miles_per_hour;
        }
      }
      console.log(proximity, Math.round(diameter), Math.round(velocity));
      var output = "<br><br>On " + start + " the closest asteroid was " + proximity + " miles away moving at a velocity of " + Math.round(velocity) + " miles/hour with an approximate maximum diameter of " + Math.round(diameter) + " feet.";

      $(".go").append(output);
  });

//AJAX Call for Picture of the day
    $.ajax({
        url: "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=Earth-grazing_fireball&callback=?",
        method: "GET",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",

    }).done(function(res) {
    //Adds Picture of the Day to the background of Project
        var summaryURL = res['query']['pages']['28605823']['extract'];
        $('#summary').append(summaryURL);

        console.log(res);

    }).fail(function(err) {
        console.log(err);
    });
    //End code Background Image Code

});


