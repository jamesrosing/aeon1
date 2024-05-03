$stateMobile = jQuery(window).width() < 768;
$stateTablet = jQuery(window).width() >= 768 && jQuery(window).width() < 1025;
$stateDesktop = jQuery(window).width() >= 1025;
$stateLargeDesktop = jQuery(window).width() >= 2020;
$stateNotphone = jQuery(window).width() >= 768;
$stateNotdesktop = jQuery(window).width() < 1025;



jQuery(document).ready( function(){
  slideshow();
  header();
  //mosaic_layout();
  mainmenu();
  thoughts();
 //homepage();
  videoplay();
  waypoints();

  //nice scroll
//   jQuery("body").niceScroll({
// 	  cursorcolor:"black",
// 	  cursorwidth:"5px",
// 	  cursorborder: "black 1px"
// });
  //bottom

   jQuery('.arrow-up').click(function(){
        jQuery('html, body').animate({scrollTop:0}, 'slow');
        return false;
    });

  jQuery(".menu-icon").click(function(){
    jQuery("body").toggleClass("menu-visible");
  });
  jQuery(".menu-close-overlay").click(function(){
  	jQuery("body").removeClass("menu-visible");
  });
});

jQuery(window).on('load', function(){
	jQuery("body").addClass("body-loaded");
});

function mainmenu(){
	jQuery(".menu-item-has-children").find("> a").removeAttr("href");
	jQuery(".main-menu li").on('mouseover', function(){
		jQuery(this).removeClass("faded");
		jQuery(this).siblings().addClass("faded");
	})
	.on('mouseout', function(){
		jQuery(".main-menu li").removeClass("faded");
	})
}

function homepage(){
if(jQuery("body").is(".home")){
$windowHeight = jQuery(window).height();

			jQuery(window).scroll(function(){
			var nowScrollTop = jQuery(this).scrollTop() + $windowHeight - $windowHeight*0.3;


			jQuery(".scrollAnimatedItem").each(function(){
				$thisTop = jQuery(this).offset().top ;
				jQuery(this).attr("data-top", $thisTop);
				//
			
				if( nowScrollTop >= $thisTop){
					jQuery(this).addClass("inview");
				}
				else{
					jQuery(this).removeClass("inview");
				}
			});
		});
}
}
function header(){
var lastScrollTop = 0, delta = 5;
$height = jQuery(window).height();
if(!jQuery("main > .fullbleed-image").length == 0){
		jQuery("body").addClass("withheroimage");
		jQuery(".header").addClass("whiteheader");
	}
	 jQuery(window).scroll(function(){
		 var nowScrollTop = jQuery(this).scrollTop();
		 if(Math.abs(lastScrollTop - nowScrollTop) >= delta){
		 	if (nowScrollTop > lastScrollTop && nowScrollTop > 100){
		 		jQuery('body').addClass("scrolled");
		 	} else {
		 		jQuery('body').removeClass("scrolled");
			}

		//turn white header to dark

		
		 lastScrollTop = nowScrollTop;
		 if(nowScrollTop >= $height){
		 	jQuery(".header").removeClass("whiteheader");
		 }
		 else if (nowScrollTop < $height && jQuery("body").is(".withheroimage")){
		 	jQuery(".header").addClass("whiteheader");
		 }
		 }
	 });	
}
	 
 
function slideshow(){
	jQuery(".flexslider").flexslider({
	selector: ".slide",
	animation: "fade",
	animationloop: true,
	slideshow: true,
	controlNav: true, 
	start: function(){
		
		var current = jQuery('li.flex-active-slide');
		function caption(){
			jQuery("li.flex-active-slide").siblings().removeClass("caption-visible");
 			current.addClass("caption-visible"); 
		} 
		setTimeout(caption, 100);
		jQuery(".flexslider").removeClass('loading');
		},
	after: function(){
		var current = jQuery('li.flex-active-slide');
		function caption(){
			jQuery("li.flex-active-slide").siblings().removeClass("caption-visible");
 			current.addClass("caption-visible"); 
		} 
		setTimeout(caption, 500);
		},
	slideshowSpeed: 7000

	});
		
}

function mosaic_layout(){
debugger;
var $grid = jQuery(".masonry");
$grid.imagesLoaded( function() {
  $grid.addClass("imagesloaded");
  $grid.masonry({
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    isFitWidth:true,
    gutter: 0
    });
});
// if ($stateDesktop && !$stateLargeDesktop){
// FlexMasonry.init('.mosaic', {
//     responsive: false,
//     numCols: 4
// });
// }
// else if ($stateLargeDesktop){
// FlexMasonry.init('.mosaic', {
//     responsive: false,
//     numCols: 5
// });
// }

}

function videoplay(){
	if(jQuery("body").is(".home")){
	var iframe = document.querySelector('#overlay-video iframe');
	var player = new Vimeo.Player(iframe);
	var status = jQuery('.status');

	player.on('pause', function() {
		status.text('paused');
	});

	player.on('ended', function() {
		status.text('ended');
	});

	player.on('timeupdate', function(data) {
		status.text(data.seconds + 's played');
	});

	jQuery('.video-button').on('click', function() {
		var method = jQuery(this).attr("data-action");
		player[method]();
		jQuery("body").addClass("overlay-video-visible"); 
	});

	jQuery(".video-close-overlay").click(function(){
		var method = jQuery(this).attr("data-action");
		player[method]();
	  	jQuery("body").removeClass("overlay-video-visible");
	  });

	
	// $videoStart = jQuery(".video-container").offset().top; 
	// $videoTop = jQuery(".video-container").offset().top + jQuery(".video-container").outerHeight();
	// jQuery(".video-container").attr({
	// 	"data-top" : $videoTop,
	// 	"data-start" : $videoStart

	// });

	// jQuery(window).scroll(function(){
	// 		$windowScroll = jQuery(this).scrollTop();
	// 		if(jQuery(".video-container").hasClass("play")){
	// 		if( $windowScroll + 300 < $videoStart  || $windowScroll - 100>= $videoTop){
	// 			var method = 'pause';
	// 			player[method]();
	// 		}
	// 		else{
	// 			var method = 'play';
	// 			player[method]();
	// 		}
	// 		}
		
	// });
	
}
		
}

function waypoints(){
jQuery('.scrollAnimatedItem').each(function() {
        jQuery(this).waypoint(function(direction) {
        	if (direction === "down") {
            jQuery(this.element).addClass('animated fadeInUp inview');
        	}
        	else{
        		jQuery(this.element).removeClass('animated fadeInUp inview');
        	}
        },{ offset: '90%'});
    });	
}
 
function thoughts(){
	jQuery(".thought-item .video-overlay-link").each(function(){
		
		jQuery(this).click(function(){
			$videoSrc = jQuery(this).attr("data-video");
			jQuery(".overlay-video .overlay-video-inner iframe").attr("src", $videoSrc);
			var iframe = jQuery('.overlay-video .overlay-video-inner iframe')[0];
			var player = new Vimeo.Player(iframe);
			var method = jQuery(this).attr("data-action");
			player[method]();
			jQuery("body").addClass("overlay-video-visible"); 

			

		});

		jQuery(".thoughts-video-close-overlay").click(function(){
			jQuery("body").removeClass("overlay-video-visible");
			var iframe2 = jQuery('.overlay-video .overlay-video-inner iframe')[0];
			var player = new Vimeo.Player(iframe2);
			var method = jQuery(this).attr("data-action");
			player[method]();
			jQuery(".overlay-video .overlay-video-inner iframe").removeAttr("src");
		  	
		 	 });


	});
}