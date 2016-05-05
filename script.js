var data;
var zipSearch;

function errorPosition() {                  
    alert('Sorry couldn\'t find your location');                        
}

function exportPosition(position) {
    // Get the geolocation properties and set them as variables
    var latitude = position.coords.latitude;
    var longitude  = position.coords.longitude;
    ajaxCallLocation(latitude, longitude);
}

var buildUI = function(data) {
	console.log(data);
	var i = 0;	
	//if there is no result for the search 
	if (data.results.length < 1) {
		$('.nothingHere').remove();
		$('.wrapper').append('<div class="nothingHere">It seems like there are no upcoming tech meetups within 25 miles of zip code: ' + zipSearch + '</div>');
	//otherwise
	} else {
		$('.nothingHere').remove();
		$.each(data.results, function(){
		var listItem;
		var listItemID;
			//create the event wrapper
			$('#contentWrapper').append('<div class="panel panel-default event' + ' ' + i + '" id="eventNmbr' + i + '"></div>')	
			//select event wrapper and append content for each event
			//check if content exists in json file, if it does append it, otherwise move on to next step
			if (data.results[i].name){
				listItem = data.results[i].name.substring(0,30);
				listItemID = listItem.replace(/\s/g, '');

			//add the scrollspy li items
			$('#scrollSpyList').append('<li><a href="#eventNmbr' + i + '">' + listItem + '</a></li>');

			$('.' +i).append('<div class="panel-heading" role="tab" id="' + listItemID + '"><a role="button" data-toggle="collapse" href="#event' + i + '" aria-expanded="true" aria-controls=#event' + i + '"><h3 class="panel-title title">' + data.results[i].name + '&nbsp&nbsp&nbsp<small>Click here to see full event description</small></h3></a></div>');
			};
			if (data.results[i].description) {
				$('.' +i).append('<div role="tabpanel" class="panel-collapse collapse" id="event' + i + '"><div class="panel-body"><p>' + (data.results[i].description) + '</p></div></div></div>');
			};
			if (data.results[i].time) {
				$('.' +i).append('<div class="panel-body">' + new Date(data.results[i].time).toLocaleString() + '</div>');
			};
			if (data.results[i].venue) {
				if ((data.results[i].venue.name) && (data.results[i].venue.address_1)) {
					$('.' +i).append('<div class="panel-body">' + data.results[i].venue.name + ' @ ' + data.results[i].venue.address_1 + '</div>');
				} else if (data.results[i].venue.name) {
					$('.' +i).append('<div class="panel-body">' + data.results[i].venue.name + '</div>');
				} else if (data.results[i].venue.address_1) {
					$('.' +i).append('<div class="panel-body">' + data.results[i].venue.address_1 + '</div>');
				} 
			};
			if (data.results[i].yes_rsvp_count) {
				$('.' +i).append('<table class="table"><tbody><tr id="RSVP' + i + '"><td>Yes: ' + data.results[i].yes_rsvp_count + '</td>');
			};
			//if there is a no_rsvp_count then (if the object has a value of 0 it still needs to be manually set to 0 
			//otherwise it is interpreted as boolean "false")
			if (data.results[i].no_rsvp_count) {
				//add this as a div
				$('#RSVP' + i).append('<td>No: ' + data.results[i].no_rsvp_count + '</td>');
				//otherwise
			} else {
				//just write 0 
				$('#RSVP' + i).append('<td>No: 0</td>');
			};
			if (data.results[i].maybe_rsvp_count) {
				$('#RSVP' + i).append('<td>Maybe: ' + data.results[i].maybe_rsvp_count + '</td>');
			} else {
				$('#RSVP' + i).append('<td>Maybe: 0</td>');
			}
			if (data.results[i].waitlist_count) {
				$('#RSVP' + i).append('<td>Waitlist: ' + data.results[i].waitlist_count + '</td>');
			} else {
				$('#RSVP' + i).append('<td>Waitlist: 0</td></tr></tbody></table>');
			};
			if (data.results[i].event_url) {
				$('.' +i).append('<div class="panel-footer"><a href="' + data.results[i].event_url + '" target="blank">Sign up for the event</a></div>')
			};
			i++;
		});
	}
};

var ajaxCallLocation = function(latitude, longitude, data){
	console.log('latitude:' + latitude);
	console.log('longitude:' + longitude);
	$.ajax ({
		type: "GET",
		url: "https://api.meetup.com/2/open_events?and_text=False&offset=0&format=json&lon=" + longitude + "&limited_events=False&photo-host=public&page=100&radius=25&category=34&lat=" + latitude + "&desc=False&status=upcoming&sign=true&key=54347e276174919776f82826417369",
		dataType: "jsonp",
		success: function(data){
			buildUI(data);
		}
	});
}

var ajaxCallZip = function(zipSearch, data){
	$.ajax ({
		type: "GET",
		url: "http://api.meetup.com/2/open_events/?zip=" + zipSearch + "&time=,1w&and_text=False&offset=0&format=json&limited_events=False&photo-host=public&page=100&radius=25&category=34&desc=False&status=upcoming&sign=true&key=54347e276174919776f82826417369",
		dataType: "jsonp",
		success: function(data){
			buildUI(data);
		}	
	});
}

var zipCheck = function(zipSearch) {
	console.log(zipSearch);
	if (zipSearch.length != 5 || isNaN(zipSearch)) {
		$('.alert').remove();
		$('form').append('<div class="alert">This is not a valid zip code.</div>')
	} else {
		$('.alert').remove();
		//remove any previously attached events
		$('.event').remove();
		ajaxCallZip(zipSearch);
	}
}

if (navigator.geolocation) {    
    $('#geoButton').click(function(e) {
	    e.preventDefault();
	    navigator.geolocation.getCurrentPosition(exportPosition, errorPosition);
	});     
    } else {    
    alert('Sorry your browser doesn\'t support the Geolocation API');    
}

$('#zipInput').submit(function(e){
	e.preventDefault();
	var zipSearch = ($('#zipcode').val());
	zipCheck(zipSearch);
});

$(document).ajaxComplete(function(){
	$('.description').click(function(){
		$(this).toggleClass('full');
	});
});

