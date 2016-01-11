var data;

$('.button').click(function(){
	var zipSearch = ($('.zipcode').val());

	//remove any previously attached events
	$('.event').remove();
	
	if (zipSearch.length != 5 || isNaN(zipSearch)) {
		$('.alert').remove();
		$('form').append('<div class="alert">This is not a valid zip code.</div>')
	} else {
		console.log(zipSearch);
		$('.alert').remove();

	$.ajax ({
		type: "GET",
		url: "http://api.meetup.com/2/open_events/?zip=" + zipSearch + "&and_text=False&offset=0&format=json&limited_events=False&photo-host=public&page=100&radius=25&category=34&desc=False&status=upcoming&sign=true&key=54347e276174919776f82826417369",
		dataType: "jsonp",
		success: function(data){
			console.log(data);
		var i = 0;	
		
		$.each(data.results, function(){

			//create the event wrapper
			$('.wrapper').append('<div class="event' + ' ' + i + '"></div>')	

			//select event wrapper and append content for each event

			//check if content exists in json file, if it does append it, otherwise move on to next step
			if (data.results[i].name){
				$('.' +i).append('<div class="title"><h3>' + data.results[i].name + '</h3></div>' );
			};
			if (data.results[i].description) {
				$('.' +i).append('<div class="description"><span>Click this field to read the full event description...</span></br>' + (data.results[i].description) + '...' + '' + '</div>');
			};
			if (data.results[i].time) {
				$('.' +i).append('<div class="date">' + new Date(data.results[i].time) + '</div>');
			};
			if (data.results[i].venue) {
				if ((data.results[i].venue.name) && (data.results[i].venue.address_1)) {
					$('.' +i).append('<div class="venue">' + data.results[i].venue.name + ' @ ' + data.results[i].venue.address_1 + '</div>');
				} else if (data.results[i].venue.name) {
					$('.' +i).append('<div class="venue">' + data.results[i].venue.name + '</div>');
				} else if (data.results[i].venue.address_1) {
					$('.' +i).append('<div class="venue">' + data.results[i].venue.address_1 + '</div>');
				} 
			};
			if (data.results[i].yes_rsvp_count) {
				$('.' +i).append('<div class="rsvp_yes rsvp">Yes: ' + data.results[i].yes_rsvp_count + '</div>');
			};
			//if there is a no_rsvp_count then (if the object has a value of 0 it still needs to be manually set to 0 otherwise it is
			//interpreted as boolean "false")
			if (data.results[i].no_rsvp_count) {
				//add this as a div
				$('.' +i).append('<div class="rsvp_no rsvp">No: ' + data.results[i].no_rsvp_count + '</div>');
				//otherwise
			} else {
				//just write 0 
				$('.' +i).append('<div class="rsvp_no rsvp">No: 0</div>');
			};
			if (data.results[i].maybe_rsvp_count) {
				$('.' +i).append('<div class="rsvp_maybe rsvp">Maybe: ' + data.results[i].maybe_rsvp_count + '</div>');
			} else {
				$('.' +i).append('<div class="waitlist rsvp">Waitlist: 0</div>');
			}
			if (data.results[i].waitlist_count) {
				$('.' +i).append('<div class="waitlist rsvp">Waitlist: ' + data.results[i].waitlist_count + '</div>');
			} else {
				$('.' +i).append('<div class="waitlist rsvp">Waitlist: 0</div>');
			};
			if (data.results[i].event_url) {
				$('.' +i).append('<div class="signup"><a href="' + data.results[i].event_url + '" target="blank">Sign up for the event</a></div>')
			};
			i++;
		});
		}
	});
	}
});

$(document).ajaxComplete(function(){
//setTimeout(function(){
	console.log('ajax complete');
	$('.description').click(function(){
		$(this).toggleClass('full');
	});
//}, 2000);
});
