function init(){
	$(".wrapper-header").css("height", ($(window).height()- 100));

	$(document).ready(function(){
		$('.scrollspy').scrollSpy();
		$('ul.tabs').tabs();
		initTranslate();
	});

	$(".button-collapse").sideNav();
};

window.onresize = function() {
	$(".wrapper-header").css("height", ($(window).height()- 100));
};

window.onscroll = function() {
	if(document.body.scrollTop > (($(window).height()- 100) / 2)) {
		$('nav').css("background", "#0f91ff");
	} else {
		$('nav').css("background", "transparent");
	}
};

init();

/***************************************************************/
/***********************     LANG     **************************/
/***************************************************************/

let langs = ['en', 'fr'];
let langCode = '';

langCode = navigator.language.substr (0, 2);

let translate = function (jsdata)
{
	$("[tkey]").each (function (index)
	{
		let strTr = jsdata [$(this).attr ('tkey')];
		$(this).html (strTr);
	});
};

Array.prototype.contains = function(element){
	return this.indexOf(element) > -1;
};

let initTranslate = function() {
	if (langs.contains(langCode)) {
		$.getJSON('lang/' + langCode + '.json', translate);
	} else {
		$.getJSON('lang/en.json', translate);
	}
};