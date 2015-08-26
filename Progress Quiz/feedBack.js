'use strict';


(function(){
    var APPFEEDBACK_API_KEY = '2b48c8e0-4bf1-11e5-ac35-631fe4971ab1';
	app.sendFeedback = function() {
		feedback.showFeedback();
	};
	
	document.addEventListener('deviceready', function () {
		var feedbackOptions = {
			enableShake: true
		};
		try {
			feedback.initialize(APPFEEDBACK_API_KEY, feedbackOptions);
		}
		catch(err) {
			console.log('Something went wrong:');
			console.log(err);
		}
		navigator.splashscreen.hide();
	}, false);
})();