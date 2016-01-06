var data;

$.ajax ({
	type: "GET",
	url: "https://api.meetup.com/2/open_events?and_text=False&offset=0&format=json&lon=-122.206984&limited_events=False&photo-host=public&page=200&radius=25&category=34&lat=45.507739&desc=False&status=upcoming&sig_id=13612177&sig=927ad5b4ced9bf275c584a51cf1e683144e585b3",
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
			$('.' +i).append('<div class="venue">' + data.results[i].venue.name + ' @ ' + data.results[0].venue.address_1 + '</div>');
		};
		if (data.results[i].yes_rsvp_count) {
			$('.' +i).append('<div class="rsvp_yes rsvp">Yes: ' + data.results[i].yes_rsvp_count + '</div>');
		};
		if (data.results[i].no_rsvp_count) {
			$('.' +i).append('<div class="rsvp_no rsvp">No: ' + data.results[i].no_rsvp_count + '</div>');
		} else {
			$('.' +i).append('<div class="rsvp_no rsvp">No: 0</div>');
		};
		
		
//if check not working with maybe_rsvp_count (figure out why)
		$('.' +i).append('<div class="rsvp_maybe rsvp">Maybe: ' + data.results[i].maybe_rsvp_count + '</div>');
		

//if check not working with maybe_rsvp_count (figure out why)
		$('.' +i).append('<div class="waitlist rsvp">Waitlist: ' + data.results[i].waitlist_count + '</div>');
		
		if (data.results[i].event_url) {
			$('.' +i).append('<div class="signup"><a href="' + data.results[i].event_url + '" target="blank">Sign up for the event</a></div>')
		};
		i++;
	});
	}
});

setTimeout(function(){
	$('.description').click(function(){
		$(this).toggleClass('full');
	});
}, 2000);

