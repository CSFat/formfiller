/**
* iReserve Robot
* Step 1: visit ireserve, then copy and paste the entire script into chrome console.
* Step 2: run asd(<sms code>, <captcha>);
* Step 3: after redirected to second reserve page, repeat step 1 and 2.
*/

/* User Config */
/*
localStorage.phoneNumber  = '';
localStorage.emailAddress = '';
localStorage.firstName    = '';
localStorage.lastName     = '';
localStorage.govtID       = '';
*/

/* System Config - DO NOT CHANGE */
localStorage.contextPath  = 'https://ireservea.apple.com';
localStorage.country      = 'HK';
localStorage.pathLocale   = (location.href.match(/en_HK/ig)) ? 'en_HK' : 'zh_HK';
localStorage.tag          = 'iPhone';
localStorage.pickUpMode   = 'POST_LAUNCH';
localStorage.plan         = 'UNLOCKED';
localStorage.productName  = 'iPhone 5s';
localStorage.cToken       = jQuery('input[name="cToken"]').val();

var currentDate  = new Date(),
		currentYear  = currentDate.getFullYear(),
		currentMonth = currentDate.getMonth(),
		currentDay   = currentDate.getDate(),
		origDate     = new Date(2013,9,31),
		dateDiff     = Math.floor((currentDate.getTime() - origDate.getTime()) / (1000*60*60*24)),
		reloadTime   = [new Date(currentYear, currentMonth, currentDay, 5, 55, 0, 0),new Date(currentYear, currentMonth, currentDay, 14, 55, 0, 0)],
		targetTime   = [Date.UTC(currentYear, currentMonth, currentDay, 13, 0, 0, 0),Date.UTC(currentYear, currentMonth, currentDay, 19, 0, 0, 0)];
		
window.quantity       = 2;
window.timeSlots      = (localStorage.timeSlots) ? JSON.parse(localStorage.timeSlots) : {"R428":[], "R409":[], "R485":[]};
window.dummyTimeSlots = {
	"R428":[
		{"startTime":targetTime[1],"timeslotID":(dateDiff*15 + 658225),"formattedTimeForDisplay":"7:00 PM - 8:00 PM"},
		{"startTime":targetTime[0],"timeslotID":(dateDiff*15 + 658219),"formattedTimeForDisplay":"1:00 PM - 2:00 PM"}
	], 
	"R409":[
		{"startTime":targetTime[1],"timeslotID":(dateDiff*15 + 656292),"formattedTimeForDisplay":"6:00 PM - 7:00 PM"},
		{"startTime":targetTime[0],"timeslotID":(dateDiff*15 + 656287),"formattedTimeForDisplay":"1:00 PM - 2:00 PM"}
	], 
	"R485":[
		{"startTime":targetTime[1],"timeslotID":(dateDiff*15 + 655494),"formattedTimeForDisplay":"8:00 PM - 9:00 PM"},
		{"startTime":targetTime[0],"timeslotID":(dateDiff*15 + 655487),"formattedTimeForDisplay":"1:00 PM - 2:00 PM"}
	]
};

window.skusList     = {"R428":[], "R409":[], "R485":[]};
window.skusTotal    = [];
window.storeNumbers = {"R428":"Hong Kong, ifc mall", "R409":"Hong Kong, Causeway Bay", "R485":"Hong Kong, Festival Walk"}; // Causeway Bay, ifc mall, Festival Walk
window.storeQuota   = {"R428":{}, "R409":{}, "R485":{}};
window.timePriority = {"R428":1, "R409":3, "R485":2};
window.partNumbers  = {"MF360ZP/A":"iPhone 5s 64GB Gold", "MF357ZP/A":"iPhone 5s 32GB Gold", "MF354ZP/A":"iPhone 5s 16GB Gold", "MF353ZP/A":"iPhone 5s 16GB Silver", "MF356ZP/A":"iPhone 5s 32GB Silver", "MF359ZP/A":"iPhone 5s 64GB Silver", "MF352ZP/A":"iPhone 5s 16GB Space Gray", "MF355ZP/A":"iPhone 5s 32GB Space Gray", "MF358ZP/A":"iPhone 5s 64GB Space Gray"}; // Gold>Silver>Gray,16GB>32GB>64GB
window.partPriority = (localStorage.partPriority) ? JSON.parse(localStorage.partPriority) : [
	{"MF354ZP/A":"iPhone 5s 16GB Gold", "MF357ZP/A":"iPhone 5s 32GB Gold"},
	//{"MF352ZP/A":"iPhone 5s 16GB Space Gray", "MF353ZP/A":"iPhone 5s 16GB Silver"},
];

var pickUpTimes    = 0,
		waitingRequest = 0;

window.bruteMode    = (localStorage.bruteMode) ? JSON.parse(localStorage.bruteMode) : false;
window.brutePeriods = [
		{'start': new Date(currentYear,currentMonth,currentDay,5,59,55),  'end': new Date(currentYear,currentMonth,currentDay,6,1,00)},
		//{'start': new Date(currentYear,currentMonth,currentDay,6,59,30),  'end': new Date(currentYear,currentMonth,currentDay,7,0,30)},
		//{'start': new Date(currentYear,currentMonth,currentDay,7,59,30),  'end': new Date(currentYear,currentMonth,currentDay,8,0,30)},
		//{'start': new Date(currentYear,currentMonth,currentDay,8,59,30),  'end': new Date(currentYear,currentMonth,currentDay,9,0,30)},
		//{'start': new Date(currentYear,currentMonth,currentDay,9,59,30),  'end': new Date(currentYear,currentMonth,currentDay,10,0,30)},
		//{'start': new Date(currentYear,currentMonth,currentDay,10,59,30),  'end': new Date(currentYear,currentMonth,currentDay,11,0,30)},
		//{'start': new Date(currentYear,currentMonth,currentDay,11,59,30),  'end': new Date(currentYear,currentMonth,currentDay,12,0,30)},
		//{'start': new Date(currentYear,currentMonth,currentDay,12,59,30),  'end': new Date(currentYear,currentMonth,currentDay,13,0,30)},
		//{'start': new Date(currentYear,currentMonth,currentDay,13,59,30),  'end': new Date(currentYear,currentMonth,currentDay,14,0,30)},
		{'start': new Date(currentYear,currentMonth,currentDay,14,59,55),  'end': new Date(currentYear,currentMonth,currentDay,15,1,00)},
		//{'start': new Date(currentYear,currentMonth,currentDay,15,59,30),  'end': new Date(currentYear,currentMonth,currentDay,16,0,30)},
		//{'start': new Date(currentYear,currentMonth,currentDay,16,59,30),  'end': new Date(currentYear,currentMonth,currentDay,17,0,30)},
		//{'start': new Date(currentYear,currentMonth,currentDay,17,59,30),  'end': new Date(currentYear,currentMonth,currentDay,18,0,30)}
];
window.members      = (localStorage.members) ? JSON.parse(localStorage.members) :[{
	'phoneNumber':localStorage.phoneNumber,	
	'emailAddress':localStorage.emailAddress, 
	'firstName':localStorage.firstName, 
	'lastName':localStorage.lastName, 
	'govtID':localStorage.govtID
}];

localStorage.reservationCode = (localStorage.reservationCode) ? localStorage.reservationCode :'';
localStorage.captchaAnswer   = (localStorage.captchaAnswer)   ? localStorage.captchaAnswer   :'';

localStorage.retailPage          = 'http://www.apple.com/hk/retail';
localStorage.reservationForm     = localStorage.contextPath + '/' + localStorage.country + '/' + localStorage.pathLocale + '/' + 'reserve' + '/' + localStorage.tag;
localStorage.productsPageForm    = localStorage.contextPath + '/' + localStorage.country + '/' + localStorage.pathLocale + '/' + 'reserve' + '/' + localStorage.tag + '/productReservation';
localStorage.reservationInactive = localStorage.contextPath + '/' + localStorage.country + '/' + localStorage.pathLocale + '/' + 'reserve' + '/' + localStorage.tag + '/reservationInactive';
localStorage.productConfirmation = localStorage.contextPath + '/' + localStorage.country + '/' + localStorage.pathLocale + '/' + 'reserve' + '/' + localStorage.tag + '/productConfirmation';
localStorage.createPickUp        = localStorage.contextPath + '/' + localStorage.country + '/' + localStorage.pathLocale + '/' + 'reserve' + '/' + localStorage.tag + '/createPickUp';
localStorage.getTimeSlots        = localStorage.contextPath + '/' + localStorage.country + '/' + localStorage.pathLocale + '/' + 'reserve' + '/' + localStorage.tag + '/getTimeSlots';
localStorage.skusForStoreProduct = localStorage.contextPath + '/' + localStorage.country + '/' + localStorage.pathLocale + '/' + 'reserve' + '/' + localStorage.tag + '/skusForStoreProduct';

var asd = function(sms, captcha){
	landing(sms, captcha);
}

var landing = function(sms, captcha){
	sms     = (!sms) ? localStorage.reservationCode : sms;
	captcha = (!captcha) ? localStorage.captchaAnswer : captcha;
	
  jQuery('#phoneNumber').val(localStorage.phoneNumber);
  jQuery('#reservationCode').val(sms);
  jQuery('#captchaAnswer').val(captcha);

  jQuery('#productsPageForm').attr('action', localStorage.productsPageForm);
  jQuery('#productsPageForm').submit();
}

var patrol = function(both) {
	jQuery.each(window.storeNumbers, function( storeNumber, storeName ) {
		if (window.bruteMode || both) {
			getSkus(storeNumber, null);
			getCustomTimeSlots(localStorage.productName, storeNumber, localStorage.plan, localStorage.pickUpMode);
		}
		else {
			getSkus('R428', null);
			return false;
		}
	});
	
	window.patrolInterval = window.setTimeout(patrol, 60000);
}

var getSkus = function(storeNumber, product) {	
	var dataString = 'tag=' + localStorage.tag + '&store=' + storeNumber +'&product='+ product;
	waitingRequest++;
	
	jQuery.ajax({
		type: "POST",
		url: localStorage.skusForStoreProduct,
		dataType : "json",
		data: dataString,
		success: function(data) {
			checkSkus(storeNumber, product, data);
		},
		error: function (xhr, ajaxOptions, thrownError) {
			console.log('error getting skus');
		} 		
	}).always(function() {
		waitingRequest--;
  });
}

var checkSkus = function(storeNumber, product, data){
	try {
		var isActive = (window.skusList[storeNumber].length > 0);
		var products = data.productResponse.productGroupedSku[localStorage.productName];
		
		jQuery.each(products, function( color, model ) {
			jQuery.each(model[localStorage.productName]['Unlocked'], function( capacity, info ) {
				var isEnabled  = info[0]['enabled'];
				var partNumber = info[0]['partNumber'];
				var isNewPart  = (window.skusList[storeNumber].indexOf(partNumber) < 0) ? true : false;
				var isNewItem  = (window.skusTotal.indexOf(partNumber) < 0) ? true : false;
				
				if (isEnabled && isNewPart) {
					window.skusList[storeNumber].push(partNumber);
				}
				
				if (isEnabled && isNewItem) {
					window.skusTotal.push(partNumber);
				}
			});
		});
		
		var hasProduct = (window.skusList[storeNumber].length > 0) ? true : false;
		if (!isActive && hasProduct) {
			window.setTimeout(reserve, 10000);
			localStorage.skusList = JSON.stringify(window.skusList);
			var message = 'Skus ' + storeNumber + ' available at ' + (new Date).getTime();
			console.warn(message);
			logMessage(message);
		}
		
		if (!isActive && !hasProduct && window.bruteMode) {
			getSkus(storeNumber, product);
		}			
	}
	catch(err) {};
}

var getCustomTimeSlots = function(productName, storeNumber, plan, pickUpMode) {
	var hasTimeSlots = (window.timeSlots[storeNumber].length > 0);
	var dataString   = 'productName=' + productName + '&storeNumber=' + storeNumber +'&plan='+ plan + '&mode=' + pickUpMode;
	waitingRequest++;
	
	jQuery.ajax({
		type: "POST",
		url: localStorage.getTimeSlots,
		dataType : "json",
		data: dataString,
		success: function(data) {
			var hasDummyTimeSlots = (window.dummyTimeSlots[storeNumber].length > 0) ? true : false;
			var hasData           = (data.timeSlots != null) ? true : false;
			if (hasData) {
				window.timeSlots[storeNumber] = data.timeSlots;
				if (!hasTimeSlots) { window.setTimeout(reserveLoop, 10000, storeNumber); }
				localStorage.timeSlots = JSON.stringify(window.timeSlots);
				console.warn('Timeslot available at ', (new Date).getTime());
			}
			
			if (!hasDummyTimeSlots && !hasData && window.bruteMode) {
				getCustomTimeSlots(productName, storeNumber, plan, pickUpMode);
			}
		},
		error: function (xhr, ajaxOptions, thrownError) {
			console.log('error getting timeslot');
		}
	}).always(function() {
		waitingRequest--;
  });
}

var reserve = function(){
	jQuery.each(window.storeNumbers, function( storeNumber, storeName ) {
		reserveLoop(storeNumber);
	});
}

var reserveLoop = function(storeNumber) {
	jQuery.each(window.partPriority, function( priorityIndex, partNumbers ) {
		var multiplier = (priorityIndex > 0) ? 1 : 0;
		window.setTimeout(reserveSubLoop, 10 * multiplier, storeNumber, partNumbers);
	});
}

var reserveSubLoop = function(storeNumber, partNumbers) {
	var isFullHouse     = false;
	var hasTimeSlots    = (window.timeSlots[storeNumber].length > 0) ? true : false;
	var targetTimeSlots = (hasTimeSlots) ? window.timeSlots[storeNumber] : window.dummyTimeSlots[storeNumber];
	var totalTimeSlots  = targetTimeSlots.length;
	
	if (totalTimeSlots > 0) {
		//var luckyNumber = Math.max(1, Math.floor(Math.random() * totalTimeSlots));
		var timeShift   = (totalTimeSlots <= 2) ? 1 : window.timePriority[storeNumber];
		var timeSlot 		= targetTimeSlots[totalTimeSlots - timeShift];
		jQuery.each(partNumbers, function( partNumber, partName ) {
			//var isEnabled = (window.skusList[storeNumber].indexOf(partNumber) > -1) ? true : false;
			var isEnabled = (window.skusTotal.indexOf(partNumber) > -1) ? true : false;
			if (!isEnabled) { return true; }

			var personIndex     = (pickUpTimes % window.members.length);
			var hasFreeQuota    = (!window.storeQuota[storeNumber][window.members[personIndex].govtID]) ? true : false;
			var freePersonIndex = (hasFreeQuota) ? personIndex : findFreePerson(storeNumber);
			
			isFullHouse = (freePersonIndex == -1);			
			if (!isFullHouse && timeSlot) {
				pickUpTimes++;
				createPickUp(storeNumber, partNumber, timeSlot, window.members[freePersonIndex]);
			}
			else {
				return false;
			}
		});
	}
}

var findFreePerson = function(storeNumber) {
	var person = -1;
	
	jQuery.each(window.members, function( personIndex, personInfo ) {
		var hasFreeQuota = (!window.storeQuota[storeNumber][personInfo.govtID]) ? true : false;
		if (hasFreeQuota) { person = personIndex; return false; }
	});
	
	return person;
}

var createPickUp = function(storeNumber, partNumber, timeSlot, person) {
	var storeName  = window.storeNumbers[storeNumber];
	var partName   = window.partNumbers[partNumber];  
  
	var dataString = {
		emailAddress : person.emailAddress,
		firstName    : person.firstName,
		lastName     : person.lastName,
		phoneNumber  : person.phoneNumber,
		govtID       : person.govtID,
		storeNumber  : storeNumber,
		partNumber   : partNumber,
		pickUpMode   : localStorage.pickUpMode,
		timeSlotId   : timeSlot.timeslotID,
		plan         : localStorage.plan,
		productName  : localStorage.productName, 
		quantity     : parseInt(window.quantity),
		startTime    : timeSlot.startTime,
		skuName      : partName,
		pickUpSlot   : timeSlot.formattedTimeForDisplay
	};

	jQuery.ajax({
		type : "POST",
		url : localStorage.createPickUp,
		dataType : "json",
		contentType: "application/json",
		data : JSON.stringify(dataString)
	}).done(function(data){
		if (data != null) {
			if (data.isError) {
				console.log('create pickup error ', data.errorMessage);
				logMessage(data.errorMessage);
			} else {
				var hasFreeQuota = (!window.storeQuota[storeNumber][dataString.govtID]) ? true : false;
				window.storeQuota[storeNumber][dataString.govtID] = true;

				if (hasFreeQuota) {
					var reservation = {
						'productName':dataString.quantity + " " + partName,
						'pickupMode':dataString.pickUpMode,
						'pickUpSlot':timeSlot.formattedTimeForDisplay,
						'storeName':storeName,
						'pickupDateAndTimeText':data.pickupDateAndTimeText,
						'storeMapUrl':data.storeMapUrl,
						'tagName':localStorage.tag,
						'cToken':localStorage.cToken
					};
					window.setTimeout(confirmPickUp, 300000, reservation);

					var message = 'Submitted: ' + partName + ' at ' + storeName + '@' + timeSlot.formattedTimeForDisplay + '(' + dataString.govtID + ');' + (new Date).getTime();
					console.warn(message);
					logMessage(message);
				}
				else {
					var message = 'Store quota used up: ' + partName + ' at ' + storeName + '@' + timeSlot.formattedTimeForDisplay + '(' + dataString.govtID + ');' + (new Date).getTime();
					console.warn(message);
					logMessage(message);
				}
			}
		}
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.log(jqXHR, textStatus, errorThrown);
		logMessage(textStatus + errorThrown);
	}).always(function() {
	});  
}

var confirmPickUp = function(reservation) {
	var pickUpForm = jQuery('#pickUpForm').clone();
					
	jQuery('#productName', pickUpForm).val(reservation.productName);
	jQuery('#pickupMode', pickUpForm).val(reservation.pickupMode);
	jQuery('#pickUpSlot', pickUpForm).val(reservation.pickUpSlot);
	jQuery('#storeName', pickUpForm).val(reservation.storeName);
	jQuery('#pickupDateAndTimeText', pickUpForm).val(reservation.pickupDateAndTimeText);
	jQuery('#storeMapUrl', pickUpForm).val(reservation.storeMapUrl);
	jQuery('#tagName', pickUpForm).val(reservation.tagName);
	jQuery('#cToken', pickUpForm).val(reservation.cToken);
	
	pickUpForm.attr('action', localStorage.productConfirmation);	
	pickUpForm.submit();
}

var redirectToPage = function(url, timeout) {
	setTimeout(function(){ location.href = url; }, timeout);
}

var displayCaptcha = function() {
	try {
		var hasCaptchaImage = (jQuery('#imageCaptcha[src*="data:image/jpeg;"]').length > 0) ? true : false;
		if (hasCaptchaImage) {
			window.clearInterval(window.captchaInterval);
			
			var answer = (!window.captchaAndSMS && localStorage.popup) ? prompt('Please enter captcha and sms, seperated by space') : '';
			window.captchaAndSMS = answer.split(' ');
			if (window.captchaAndSMS.length > 1) {
				localStorage.captchaAnswer   = (captchaAndSMS[0]) ? captchaAndSMS[0] : localStorage.captchaAnswer;
				localStorage.reservationCode = (captchaAndSMS[1]) ? captchaAndSMS[1] : localStorage.reservationCode;
				
				landing(localStorage.reservationCode, localStorage.captchaAnswer);
			}
		}
	}
	catch(err) {}
}

var toggleBruteMode = function() {
	var currentTime = new Date();
	var isBruteMode = window.bruteMode;
	
	jQuery.each(window.brutePeriods, function( bruteIndex, brutePeriod ) {
		window.bruteMode = ((currentTime.getTime() >= brutePeriod['start'].getTime()) && (currentTime.getTime() <= brutePeriod['end'].getTime()));
		
		if (!isBruteMode && window.bruteMode) {
			if (window.patrolInterval) { window.clearTimeout(window.patrolInterval); }
			patrol();
			return false;
		}
	});
	
	var shouldReload = (((currentTime.getTime() >= reloadTime[0].getTime()) && (currentTime.getTime() <= reloadTime[0].getTime() + 1000)) ||
										  ((currentTime.getTime() >= reloadTime[1].getTime()) && (currentTime.getTime() <= reloadTime[1].getTime() + 1000))) ? true : false;
	if (shouldReload) {
		localStorage.removeItem('log');
		localStorage.removeItem('timeSlots');
		redirectToPage(localStorage.productsPageForm, 2000);
	}
	
	if (!window.bruteMode) {
		window.bruteInterval = window.setTimeout(toggleBruteMode, 1000);		
	}
}

var eraseCookie = function() {
	try {
		var date    = new Date(2013,1,1);
		var expires = "; expires=" + date.toGMTString();
		var cookies = ['AWSELB', 'JSESSIONID', 'Microsoft.VB.Net.Language'];	
		
		for (var i = 0; i < cookies.length; i++) {
			document.cookie = cookies[i] + "=" + expires + "; path=/";
		}
	}
	catch(err) {}
}

var logMessage = function(message) {
	message = message + '@' + (new Date).getTime() + '; ';
	localStorage.log = (localStorage.log) ? localStorage.log + message : message;
}

var isErrorPage  = location.href.match(/(data:text\/html)+/ig);
if (isErrorPage) { redirectToPage(localStorage.productsPageForm, 1000); }

var isRetailPage = location.href.match(/(retail)+\/?$/ig);
if (isRetailPage) { redirectToPage(localStorage.productsPageForm, 0); }

var isInActivePage = (jQuery('#main.reservation-unavailable').length > 0);
//if (isInActivePage) { redirectToPage(localStorage.reservationForm, 5000); } 

var isCaptchaPage = location.href.match(/(iPhone)+\/?$/ig);
if (isCaptchaPage) {
	jQuery('#phoneNumber').val(localStorage.phoneNumber);
	jQuery('#reservationCode').val(localStorage.reservationCode);
	
	var captchaElement = jQuery('#captcha');
	if (captchaElement.length > 0) {
		var captchaPos = captchaElement.parent().offset().top;
		jQuery('body').animate({ scrollTop: captchaPos }, 0);
	}
	
	window.captchaInterval = window.setInterval(displayCaptcha, 200);
}

var isProductSelectionPage = location.href.match(/(productReservation)+\/?$/ig);
if (isProductSelectionPage) {
	jQuery("#firstname").val(localStorage.firstName);
  jQuery("#lastname").val(localStorage.lastName);
  jQuery("#email").val(localStorage.emailAddress);
  jQuery("#phone").val(localStorage.phoneNumber);
  jQuery("#govid").val(localStorage.govtID);
	
	patrol(true);
	localStorage.cookie = document.cookie;
	toggleBruteMode();
}

redirectToPage(localStorage.productsPageForm, 1680000);
