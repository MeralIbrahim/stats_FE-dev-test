$(document).ready(function(e) {
	function displayData(){
		var selectedSeason = $('#season-list').find(":selected").text(),
		raceData = 'http://semikolsf1.azurewebsites.net/api/Season/getraces/' + selectedSeason,
		driverData = 'http://semikolsf1.azurewebsites.net/api/Season/getdriverstandings/' + selectedSeason;
		$.getJSON(raceData , function( data ) {
			var races = [];
			races = data;
			for (var i = 0; i < races.length; i++) {
				var race = '<div class="race-data desktop-col-25 tablet-col-33"><div class="race-data__inner"><div><b>Round ' + races[i].Round + ':</b> ' + races[i].Circuit.Location.Country + '</div><div>' + races[i].RaceName + ' <a href="' + races[i].URL + '" target="_blank">(read more)</a></div><div>' + races[i].Date + ',' + races[i].Time + '</div><div class="circuit-info"><div>Circuit</div><span>' + races[i].Circuit.CircuitID + ': ' + races[i].Circuit.CircuitName + ' <a href="' + races[i].Circuit.URL + '" target="_blank">(read more)</a></span><span>Located in ' + races[i].Circuit.Location.Locality + ' (' + races[i].Circuit.Location.Lat + '&#186 N, ' + races[i].Circuit.Location.Long + '&#186 W)</span></div></div></div>';
				$(race).appendTo('.selected-season__race-list');
			}
			$('<h2>F1 - '+ races[0].Season +'</h2>').appendTo('.selected-season__title');
			$('<h2>Drivers of the season '+ races[0].Season +'</h2>').appendTo('.selected-season__drivers-title');
		});
		$.getJSON(driverData , function( data ) {
			var drivers = [];
			drivers = data;
			for (var i = 0; i < drivers.length; i++) {
				var driver = '<div class="driver-data"><div>Position ' + drivers[i].Position + ': ' + drivers[i].Driver.GivenName + ' ' + drivers[i].Driver.FamilyName + ' (' + drivers[i].Driver.Code + ')</div><div>DOB: ' + drivers[i].Driver.DateOfBirth + '</div><div>Nationality: ' + drivers[i].Driver.Nationality + '</div><div>Driver ID: ' + drivers[i].Driver.DriverId + '</div><div>Permanent Number: ' + drivers[i].Driver.PermanentNumber + '</div><div>Points: ' + drivers[i].Points + '</div><div>Wins: ' + drivers[i].Wins + '</div><div><div>Constructors:</div><span>Name: ' + drivers[i].Constructors[0].Name + '</span><span>ID: ' + drivers[i].Constructors[0].ConstructorId + '</span><span>Nationality: ' + drivers[i].Constructors[0].Nationality + '</span></div><div>Constructor: ' + drivers[i].Constructor + '</div></div>';
				$(driver).appendTo('.selected-season__drivers-conrainer');
			}
			$('.selected-season__drivers-conrainer').slick();
		});
	}

	// on load
	displayData();

	// on select change
	$( "#season-list" ).change(function() {
		$('.selected-season__title').empty();
		$('.selected-season__drivers-title').empty();
		$('.selected-season__race-list').empty();

		$('.selected-season__drivers-conrainer').slick('unslick');
		$('.driver-data').remove();
		displayData();
	});
});