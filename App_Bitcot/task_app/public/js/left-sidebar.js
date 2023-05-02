// $(".sidebar-content-wrapper").each(function(){
//   if ($(this).children().length == 0) {
//      $(this).addClass('has-subnav');
//   }
// })

$( "li.has-subnav a").click(function(e) {
	$(this).parent().toggleClass("open");
});


$( ".toggle-sidebar").click(function(e) {
	$(".sidebar-wrapper").toggleClass("open");
});

$( ".toggle-sidebar").click(function(e) {
	if (!$(".sidebar-wrapper").hasClass("open")) {
		$(".has-subnav").removeClass("open");
	}
	else {
		//$(".has-subnav").addClass("open");
	}
});