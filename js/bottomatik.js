var pricingResultWrapper = null;

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
	var price = 0;
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

var initIframeBot = function ($event) {
	document.getElementById('IframeBot').setAttribute('src', 'https://d363qlcydfevm6.cloudfront.net/');
};

/***************************************************************/
/***********************     LANG     **************************/
/***************************************************************/

var langs = ['en', 'fr'];
var langCode = '';

langCode = navigator.language.substr(0, 2);

var translate = function (jsdata) {
	$("[tkey]").each(function (index) {
		var strTr = jsdata [$(this).attr('tkey')];
		$(this).html(strTr);
	});
	typed();
};

Array.prototype.contains = function (element) {
	return this.indexOf(element) > -1;
};

var initTranslate = function () {
	if (langs.contains(langCode)) {
		$.getJSON('lang/' + langCode + '.json', translate);
	} else {
		$.getJSON('lang/en.json', translate);
	}
};

var typed_read = function(element, header){
	var langs = element.querySelectorAll('lang');
	var ret = [];
	for(var i = 0; i < langs.length; i++){
		ret.push(langs[i].innerText + (header ? ' ^5000' : ''));
	}
	return ret;
}

var typed = function(){
	// pre-punchline
	var data = typed_read(document.querySelector('#typed-pre-punchline'));
	type('.pre-punchline span', data);
	// punchline
	data = typed_read(document.querySelector('#typed-punchline'), true);
	type('.punchline', data);
};

var type = function(element, data, speed){
	var typed = new Typed(element, {
		strings: data,
		typeSpeed: speed || 75,
		loop:true
	});
	console.log('typed', typed);
}

/***************************************************************/
/*********************  POPULATE PRICING  **********************/
/***************************************************************/

var initPopulatePricing = function () {
	if (langs.contains(langCode)) {
		$.getJSON('lang/' + langCode + '.json', populatePricing);
	} else {
		$.getJSON('lang/en.json', populatePricing);
	}
};

var populatePricing = function (jsData) {

	var pricingEventTypeOptions = $('#selectEventType').find("option").toArray();

	pricingEventTypeOptions.forEach(function (option, idx) {
		option.textContent = jsData [$(option).attr("translate")];
	});

	var pricingComplexictyOptions = $('#selectComplexity').find("option").toArray();

	pricingComplexictyOptions.forEach(function (option, idx) {
		option.textContent = jsData [$(option).attr("translate")];
	});

	var pricingAudienceSizeOptions = $('#selectAudienceSize').find("option").toArray();

	pricingAudienceSizeOptions.forEach(function (option, idx) {
		option.textContent = jsData [$(option).attr("translate")];
	});

	$('select').material_select();
};

/***************************************************************/
/************************  SCROLL FIRE  ************************/
/***************************************************************/

var options = [
	{selector: '.wrapper-stats', offset: 200, callback: function() {
		$('.count').each(function () {
			$(this).prop('Counter',0).animate({
				Counter: $(this).text()
			}, {
				duration: 4000,
				easing: 'easeOutQuart',
				step: function (now) {
					$(this).text(commaSeparateNumber(Math.ceil(now)));
				}
			});
		});
	} },
];
Materialize.scrollFire(options);

function commaSeparateNumber(val){
	while (/(\d+)(\d{3})/.test(val.toString())){
		val = val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	}
	return val;
}