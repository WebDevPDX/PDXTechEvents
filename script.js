var data;

$.ajax ({
	type: "GET",
	url: "https://api.meetup.com/2/open_events?and_text=False&offset=0&format=json&lon=-122.206984&limited_events=False&photo-host=public&page=200&radius=25&category=34&lat=45.507739&desc=False&status=upcoming&sig_id=13612177&sig=927ad5b4ced9bf275c584a51cf1e683144e585b3",
	dataType: "jsonp",
	success: function(data){
		console.log(data);
	$('.wrapper').append('<div class="event"></div>')	
	$('.event').append('<div class="title"><h3>' + data.results[0].name + '</h3></div>' );
	$('.event').append('<div class="description">' + data.results[0].description + '</div>');
	$('.event').append('<div class="date">' + new Date(data.results[0].time) + '</div>');
	$('.event').append('<div class="venue">' + data.results[0].venue.name + ' @ ' + data.results[0].venue.address_1 + '</div>');
	$('.event').append('<div class="rsvp_yes">Yes: ' + data.results[0].yes_rsvp_count + '</div>');
	$('.event').append('<div class="rsvp_maybe">Maybe: ' + data.results[0].maybe_rsvp_count + '</div>');
	$('.event').append('<div class="rsvp_no">No: ' + data.results[0].no_rsvp_count + '</div>');
	$('.event').append('<div class="waitlist">Waitlist: ' + data.results[0].waitlist_count + '</div>');
	$('.event').append('<div class="signup"><a href="' + data.results[0].event_url + '" target="blank">Sign up for the event</a></div>')
	}
});

