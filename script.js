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

//select event wrapper and append content for each event and add class [Array Number] to the wrapper to make them specific
//check if content exists in json file, if it does append it, otherwise move on to next step
		
//EVENT TITLE
		if (data.results[i].name){
			$('.' +i).append('<div class="title"><h3>' + data.results[i].name + '</h3></div>' );
		};
		
//EVENT DESCRIPTION
		if (data.results[i].description) {
			$('.' +i).append('<div class="description"><span>Click this field to read the full event description...</span></br>' + (data.results[i].description) + '...' + '' + '</div>');
		};

// EVENT DATE
		if (data.results[i].time) {
			$('.' +i).append('<div class="date">' + new Date(data.results[i].time) + '</div>');
		};
		
//VENUE AND ADDRESS
		//if there is a venue specified
		if (data.results[i].venue) {
			//check if it has name and address and display them
			if ((data.results[i].venue.name) && (data.results[i].venue.address_1)) {
				$('.' +i).append('<div class="venue">' + data.results[i].venue.name + ' @ ' + data.results[i].venue.address_1 + '</div>');
			//else check if it has name and display that
			} else if (data.results[i].venue.name) {
				$('.' +i).append('<div class="venue">' + data.results[i].venue.name + '</div>');
			//else check if it has an address and display that
			} else if (data.results[i].venue.address_1) {
				$('.' +i).append('<div class="venue">' + data.results[i].venue.address_1 + '</div>');
			} 
		};

//RSVP YES
		if (data.results[i].yes_rsvp_count) {
			$('.' +i).append('<div class="rsvp_yes rsvp">Yes: ' + data.results[i].yes_rsvp_count + '</div>');
		};

//RSVP NO
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
		
//RSVP MAYBE
		if (data.results[i].maybe_rsvp_count) {
			$('.' +i).append('<div class="rsvp_maybe rsvp">Maybe: ' + data.results[i].maybe_rsvp_count + '</div>');
		} else {
			$('.' +i).append('<div class="rsvp_maybe rsvp">Maybe: 0</div>');
		}
		
//RSVP HAS WAITLIST
		if (data.results[i].waitlist_count) {
			$('.' +i).append('<div class="waitlist rsvp">Waitlist: ' + data.results[i].waitlist_count + '</div>');
		} else {
			$('.' +i).append('<div class="waitlist rsvp">Waitlist: 0</div>');
		};
		
//EVENT LINK AND MEETUP REDIRECT
		if (data.results[i].event_url) {
			$('.' +i).append('<div class="signup"><a href="' + data.results[i].event_url + '" target="blank">Sign up for the event</a></div>')
		};

//COUNTER UP FOR EACH LOOP
		i++;
	});
	}
});

setTimeout(function(){
	$('.description').click(function(){
		$(this).toggleClass('full');
	});
}, 2000);

