function init(){
	$(".wrapper-header").css("height", ($(window).height()- 100));

	$(document).ready(function(){
		$('.scrollspy').scrollSpy();
		$('ul.tabs').tabs({swipeable: true});
	});

	$(".button-collapse").sideNav();
};

window.onresize = function() {
	$(".wrapper-header").css("height", ($(window).height()- 100));
};

window.onscroll = function() {
	if(document.body.scrollTop > (($(window).height()- 100) / 2)) {
		$('nav').css("background", "#890073");
	} else {
		$('nav').css("background", "transparent");
	}
};

init();