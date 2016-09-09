$(document).on("ready",function(){
	var rovers = ["curiousity","opportunity","spirit"];

	var cameras = {
		curiousity:[
			{id: "FHAZ", name: "Front Hazard Avoidance Camera"},
			{id: "RHAZ", name: "Rear Hazard Avoidance Camera"},
			{id: "MAST", name: "Mast Camera"},
			{id: "CHEMCAM", name: "Chemistry and Camera Complex"},
			{id: "MAHLI", name: "Mars Hand Lens Imager"},
			{id: "MARDI", name: "Mars Descent Imager"},
			{id: "NAVCAM", name: "Navigation Camera"}
		],
		opportunity:[
			{id: "FHAZ", name: "Front Hazard Avoidance Camera"},
			{id: "RHAZ", name: "Rear Hazard Avoidance Camera"},
			{id: "NAVCAM", name: "Navigation Camera"},
			{id: "PANCAM", name: "Panoramic Camera"},
			{id: "MINITES", name: "Miniature Thermal Emission Spectrometer (Mini-TES)"}
		],
		spirit:[
			{id: "FHAZ", name: "Front Hazard Avoidance Camera"},
			{id: "RHAZ", name: "Rear Hazard Avoidance Camera"},
			{id: "NAVCAM", name: "Navigation Camera"},
			{id: "PANCAM", name: "Panoramic Camera"},
			{id: "MINITES", name: "Miniature Thermal Emission Spectrometer (Mini-TES)"}
		]
	};

	var roverHtmlSelector = "#roverSelect";
	var cameraHtmlSelector = "#cameraSelect";
	var nasaApiKey = "qVFWydcClpA2utQfaZBW0s0R70S0XQvDyh59Y2Jh";

	rovers.forEach(function(r){
		$(roverHtmlSelector).append($("<option value='"+r+"'>"+r+"</option>"));
	});
	//Select a rover
	rover = rovers[0];//default - first rover
	updateCameras(cameraHtmlSelector,rover,cameras);

	$(roverHtmlSelector).on("change",function(ev)
	{
		//Setting currently changed option value to roverId variable
		var roverId = $(this).find('option:selected').val();
		updateCameras(cameraHtmlSelector,roverId,cameras);
	});

	$("#send").on("click",function(ev){
		ev.preventDefault();
		var roverId = $(roverHtmlSelector).find('option:selected').val();
		var cameraId = $(cameraHtmlSelector).find('option:selected').val();
		var nasaUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/"+roverId+"/photos";
		var dataObj = {api_key:nasaApiKey};
		//MODIFY HERE!!!!
		var earthDateSelected = false;
		var earthDate = ""
		var sol = 1000;
		//END MODIFY

		if( cameraId.toLowerCase() !== "all" )
		{
			dataObj["camera"] = cameraId;
		}

		if( earthDateSelected )
		{
			dataObj["earth_date"] = earthDate;
		}
		else
		{
			dataObj["sol"] = parseInt(sol);
		}

		//AJAX Call
		$.ajax({
			url: nasaUrl,
			method: "GET",
			data: dataObj
		}).done(function(res){
			//MODIFY HERE TOO!!
			console.log(res);
			//END MODIFY
		}).fail(function(err){
			console.log(err);
		});	


	});

	/* Function Update Cameras */
	//--------------------------------
	// cameraHtmlSelector: ID (HTML) of the "<select>" tag of the cameras
	// roverId: ID (JS) of the selected rover
	// cams: array of rover objects (with their cameras)
	function updateCameras(cameraHtmlSelector,roverId,cams)
	{
		//clean html element
		$(cameraHtmlSelector).html("");
		//get an array of cameras of the selected rover
		arrCameras = cams[roverId];
		//append an option for all the cameras 
		$(cameraHtmlSelector).append($("<option value='all'>All</option>"));
		//for each rover
		arrCameras.forEach(function(c){
			//append an option to the select with an available cameras
			$(cameraHtmlSelector).append($("<option value='"+c.id+"'>"+c.name+"</option>"));
		});
	}
	/* End Update Cameras */
});