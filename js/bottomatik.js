let pricingResultWrapper = null;

init = function () {
	$(".wrapper-header").css("height", ($(window).height() - 100));

	$(document).ready(function () {
		$('.scrollspy').scrollSpy();
		$(".button-collapse").sideNav();
		$(".dropdown-button").dropdown();
		$('.tooltipped').tooltip({delay: 50});
		$('ul.tabs').tabs({'swipeable': true, 'responsiveThreshold': true});
		$('.parallax').parallax();
		initPopulatePricing();
		initTranslate();
	});

	pricingResultWrapper = document.getElementById('pricingResultWrapper').innerHTML;
};

window.onresize = function () {
	$(".wrapper-header").css("height", ($(window).height() - 100));
};

window.onscroll = function () {
	if ($(window).scrollTop() > (($(window).height() - 100) / 2)) {
		$('nav').css("background", "#890073");
	} else {
		$('nav').css("background", "transparent");
	}
};

init();

function pricingCalcul() {
	let price = 0;
	document.getElementById('pricingResultWrapper').innerHTML = pricingResultWrapper;
	if (parseInt(document.getElementById('selectEventType').value) === 2000) {
		if (parseInt(document.getElementById('selectComplexity').value) === 1000) {
			price = parseInt(document.getElementById('selectEventType').value) / 2;
			document.getElementById('pricingResult').textContent = `${price}€`;
			$('#quote').css('display', 'block');
			$('#no-quote').css('display', 'none');
			$('#pricingMonth').css('display', 'initial');
		} else if (parseInt(document.getElementById('selectComplexity').value) === 0) {
			price = parseInt(document.getElementById('selectEventType').value) / 2;
			document.getElementById('pricingResult').textContent = `${price}€`;
			$('#pricingMonth').css('display', 'initial');
			$('#quote').css('display', 'block');
			$('#no-quote').css('display', 'none');
		} else {
			$('#quote').css('display', 'none');
			$('#no-quote').css('display', 'block');
		}
	} else if (parseInt(document.getElementById('selectEventType').value) === 0) {
		$('#quote').css('display', 'none');
		$('#no-quote').css('display', 'block');
	} else {
		price = parseInt(document.getElementById('selectEventType').value) * parseFloat(document.getElementById('selectAudienceSize').value) + parseInt(document.getElementById('selectComplexity').value);
		if (document.getElementById('selectComplexity').value !== '?') {
			document.getElementById('pricingResult').textContent = `${price}€`;
			$('#quote').css('display', 'block');
			$('#no-quote').css('display', 'none');
			$('#pricingMonth').css('display', 'none');
		} else {
			$('#quote').css('display', 'none');
			$('#no-quote').css('display', 'block');
		}
	}
	initTranslate();
}

/***************************************************************/
/***********************     LANG     **************************/
/***************************************************************/

let langs = ['en', 'fr'];
let langCode = '';

langCode = navigator.language.substr(0, 2);

let translate = function (jsdata) {
	$("[tkey]").each(function (index) {
		let strTr = jsdata [$(this).attr('tkey')];
		$(this).html(strTr);
	});
};

Array.prototype.contains = function (element) {
	return this.indexOf(element) > -1;
};

let initTranslate = function () {
	if (langs.contains(langCode)) {
		$.getJSON('lang/' + langCode + '.json', translate);
	} else {
		$.getJSON('lang/en.json', translate);
	}
};

/***************************************************************/
/*********************  POPULATE PRICING  **********************/
/***************************************************************/

let initPopulatePricing = function () {
	if (langs.contains(langCode)) {
		$.getJSON('lang/' + langCode + '.json', populatePricing);
	} else {
		$.getJSON('lang/en.json', populatePricing);
	}
};

let populatePricing = function (jsData) {
	console.log('POULET');

	let pricingEventTypeOptions = $('#selectEventType').find("option").toArray();

	pricingEventTypeOptions.forEach(function (option, idx) {
		option.textContent = jsData [$(option).attr("translate")];
	});

	let pricingComplexictyOptions = $('#selectComplexity').find("option").toArray();

	pricingComplexictyOptions.forEach(function (option, idx) {
		option.textContent = jsData [$(option).attr("translate")];
	});

	let pricingAudienceSizeOptions = $('#selectAudienceSize').find("option").toArray();

	pricingAudienceSizeOptions.forEach(function (option, idx) {
		option.textContent = jsData [$(option).attr("translate")];
	});

	$('select').material_select();
};