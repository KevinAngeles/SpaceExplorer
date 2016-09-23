$(document).on("ready", function() {
	var rovers = ["Curiosity", "Opportunity", "Spirit"];

	var cameras = {
		Curiosity: [
			{ id: "FHAZ", name: "Front Hazard Avoidance Camera" },
			{ id: "RHAZ", name: "Rear Hazard Avoidance Camera" },
			{ id: "MAST", name: "Mast Camera" },
			{ id: "CHEMCAM", name: "Chemistry and Camera Complex" },
			{ id: "MAHLI", name: "Mars Hand Lens Imager" },
			{ id: "MARDI", name: "Mars Descent Imager" },
			{ id: "NAVCAM", name: "Navigation Camera" }
		],
		Opportunity: [
			{ id: "FHAZ", name: "Front Hazard Avoidance Camera" },
			{ id: "RHAZ", name: "Rear Hazard Avoidance Camera" },
			{ id: "NAVCAM", name: "Navigation Camera" },
			{ id: "PANCAM", name: "Panoramic Camera" },
			{ id: "MINITES", name: "Miniature Thermal Emission Spectrometer (Mini-TES)" }
		],
		Spirit: [
			{ id: "FHAZ", name: "Front Hazard Avoidance Camera" },
			{ id: "RHAZ", name: "Rear Hazard Avoidance Camera" },
			{ id: "NAVCAM", name: "Navigation Camera" },
			{ id: "PANCAM", name: "Panoramic Camera" },
			{ id: "MINITES", name: "Miniature Thermal Emission Spectrometer (Mini-TES)" }
		]
	};
	var roverDates = {
		Curiosity : {
			minDate: {
				currentDate:false,
				year:2012,
				month:07,
				day:06
			},
			maxDate:{
				currentDate:true
			}
		},
    	Opportunity : {
    		minDate: {
    			currentDate:false,
    			year:2004,
    			month:00,
    			day:25
    		},
    		maxDate:{
    			currentDate:true
    		}
    	},
    	Spirit : {
    		minDate: {
    			currentDate:false,
    			year:2004,
    			month:00,
    			day:04
    		},
    		maxDate:{
    			currentDate:false,
    			year:2010,
    			month:02,
    			day:22
    		}
    	}
	};

	var roverHtmlSelector = "#roverSelect";
	var cameraHtmlSelector = "#cameraSelect";
	var radioDateHtmlSelector = ".radioDate";
	var nasaApiKey = "qVFWydcClpA2utQfaZBW0s0R70S0XQvDyh59Y2Jh";
	var earthDateSelected = true;

	rovers.forEach(function(r) {
		$(roverHtmlSelector).append($("<option value='" + r + "'>" + r + "</option>"));
	});
	//Select a rover
	rover = rovers[0]; //default - first rover
	updateCameras(cameraHtmlSelector, rover, cameras);

	$(roverHtmlSelector).on("change", function(ev) {
		//Setting currently changed option value to roverId variable
		var roverId = $(this).find('option:selected').val();
		updateCameras(cameraHtmlSelector, roverId, cameras);
		var minDate = roverDates[roverId]["minDate"];
		var maxDate = roverDates[roverId]["maxDate"];
		updateCalendarDates(inputDate, minDate, maxDate)
	});

	var earthDateHtmlSelector = "#earthDate";
	var marsDateHtmlSelector = "#marsDate";
	var inputDate = "#inputDate";
	var inputSol = "#inputSol";

	$(radioDateHtmlSelector).on("change", function(ev) {
		//Disable an input depending on the date selected
		var radioId = "#"+$(this).attr("id");

		if(radioId === earthDateHtmlSelector)
		{
			earthDateSelected = true;
			$(inputDate).prop("disabled",false);
			$(inputSol).prop("disabled",true);
		}
		else
		{
			earthDateSelected = false;
			$(inputDate).prop("disabled",true);
			$(inputSol).prop("disabled",false);
		}
	});

	updateCalendarDates(inputDate,roverDates[rover]["minDate"],roverDates[rover]["maxDate"]);

	$("#send").on("click", function(ev) {
		ev.preventDefault();
		var roverId = $(roverHtmlSelector).find('option:selected').val();
		var cameraId = $(cameraHtmlSelector).find('option:selected').val();
		var nasaUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/" + roverId + "/photos";
		// var nasaUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos";
		var dataObj = { api_key: nasaApiKey };

		//MODIFY HERE!!!!
		// we need to put in input validation statements here!!!!
		// Curiosity landed 080520112
		// Oppurtunity landed 06062005 - present
		// Spirit landed 

		//END MODIFY

		if( cameraId.toLowerCase() !== "all" )
		{
			dataObj["camera"] = cameraId;
		}

		if( earthDateSelected )
		{
			var selectedDate = $(inputDate).val().trim();
			var arrDate = selectedDate.split("-");
			var correctedDate = parseInt(arrDate[0])+"-"+parseInt(arrDate[1])+"-"+parseInt(arrDate[2]);
			//ADD A VALIDATION HERE!!!
			dataObj["earth_date"] = correctedDate;
		}
		else
		{
			var selectedDate = $(inputSol).val().trim();            
			//ADD A VALIDATION HERE!!!
			dataObj["sol"] = parseInt(selectedDate);
		}

		//AJAX Call
		$.ajax({
			url: nasaUrl,
			method: "GET",
			contentType: "application/json; charset=utf-8",
			dataType: "json"
			data: dataObj
		}).done(function(res) {
			//MODIFY HERE TOO!!
			$("#pics").empty();
			var picshtml = $("<ul class='rslides' id='roverPics'></ul>");
			$("#pics").append(picshtml);
			var roverPics = res.photos;
			//$("#pics").append($("<ul id='roverPics-pager'></ul>"));
			for (i = 0; i < roverPics.length; i++)
			{
				var roverLi = $("<li><a href='#'><img src='"+roverPics[i].img_src+"'></a></li>");
				$("#roverPics").append(roverLi);
				//$("#roverPics-pager").append(roverLi);
			}

			$("#roverPics").responsiveSlides({
				auto: false,
				pager: true,
				speed: 300,
				maxwidth: 800
				//manualControls: '#roverPics-pager'
			});
			//END MODIFY
		}).fail(function(err) {
			console.log(err);
		});
	});

	function updateCalendarDates(calendarHtmlSelector, minDate, maxDate) {
		var mindt=new Date();
		var maxdt=new Date();
		
		if(!minDate.currentDate)
		{
			mindt=new Date(minDate.year,minDate.month,minDate.day);
		}

		if(!maxDate.currentDate)
		{
			maxdt=new Date(maxDate.year,maxDate.month,maxDate.day);
		}

		$(calendarHtmlSelector).datepicker('destroy');


		$(calendarHtmlSelector).datepicker({
			dateFormat: 'yy-mm-dd',
			minDate: mindt,
			maxDate: maxdt
		});
	}
	/* Function Update Cameras */
	//--------------------------------
	// cameraHtmlSelector: ID (HTML) of the "<select>" tag of the cameras
	// roverId: ID (JS) of the selected rover
	// cams: array of rover objects (with their cameras)
	function updateCameras(cameraHtmlSelector, roverId, cams) {
		//clean html element
		$(cameraHtmlSelector).html("");
		//get an array of cameras of the selected rover
		arrCameras = cams[roverId];
		//append an option for all the cameras 
		$(cameraHtmlSelector).append($("<option value='all'>All</option>"));
		//for each rover
		arrCameras.forEach(function(c) {
			//append an option to the select with an available cameras
			$(cameraHtmlSelector).append($("<option value='" + c.id + "'>" + c.name + "</option>"));
		});
		$("#imageDiv").html("<img id='cur' src='assets/images/"+roverId.toLowerCase()+".jpg' height='150' width='150'>");
	}
	/* End Update Cameras */
});