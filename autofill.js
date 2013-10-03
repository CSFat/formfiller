var fillForm = function() {
	try {
		if (localStorage.phoneNumber) { jQuery('#phoneNumber').val(localStorage.phoneNumber); }
		if (localStorage.reservationCode) { jQuery('#reservationCode').val(localStorage.reservationCode); }
		if (localStorage.captchaAnswer) { jQuery('#captchaAnswer').val(localStorage.captchaAnswer); }

		if (localStorage.firstName) { jQuery("#firstname").val(localStorage.firstName); }
		if (localStorage.lastName) { jQuery("#lastname").val(localStorage.lastName); }
		if (localStorage.emailAddress) { jQuery("#email").val(localStorage.emailAddress); }
		if (localStorage.phoneNumber) { jQuery("#phone").val(localStorage.phoneNumber); }
		if (localStorage.govtID) { jQuery("#govid").val(localStorage.govtID); }

		var quantity = jQuery('.step-five .select .menu').children(':last').html();
		if (quantity) {
			jQuery('.step-five .selection').html(quantity);
		}

		var timeslot = jQuery('.step-seven .select .menu').children(':last');
		if (timeslot.length > 0) {
			jQuery('.step-seven .selection').html(timeslot.html());
			jQuery('#hiddenTimeSlot').val(timeslot.attr('data-tag'));
			jQuery('#hiddenTimeSlot').html(timeslot.html());
		}
	}
	catch (err) {}
}

var isCaptchaPage = location.href.match(/(iPhone)+\/?$/ig);
var isProductSelectionPage = location.href.match(/(productReservation)+\/?$/ig);

if (isCaptchaPage || isProductSelectionPage) {
	window.fillInterval = window.setInterval(fillForm, 400);
}

if (isCaptchaPage) {
	try {
		var captchaElement = jQuery('#captcha');
		if (captchaElement.length > 0) {
			var captchaPos = captchaElement.parent().offset().top;
			jQuery('body').animate({ scrollTop: captchaPos }, 0);
		}
	}
	catch(err) {}
}
