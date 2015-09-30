$(function(){
		   
/////////////////////// Nav highlighting
	var nav = $('.nav'),
	url = document.URL;
	$(nav).find('li > a').removeClass('active');

	if ( url.indexOf('contact') >= 0 ) {
		
		$('#contact').addClass('active');
		
	} else if ( url.indexOf('project') >= 0 ) {
		$('#projects').addClass('active');
		
	} else if ( url.indexOf('profile') >= 0 ) {
		
		$('#profile').addClass('active');
		
	} else {
		$('#home').addClass('active');
	}
		
/////////////////////// Back to top function 
	var backtop = $('<a id="backtotop" href="#top" title="Take me back!"></a>'); //Build the link
	var top_link = $('<a name="top"></a>').prependTo('body'); //Build & deploy the anchor
	
	
	window.onscroll = function(e){
		//check amount of scrollspace above page AND to see if element has already been added to avoid multiple instances
		if ($(window).scrollTop() > 100 && $('.test:not(backtotop)')){
			if ($(backtop).is(':hidden')){
				backtop.appendTo('body').hide().fadeIn('slow');
			}
		} else if ($(window).scrollTop() < 400){
			backtop.fadeOut('fast');	
		}
	};
	backtop.click(function() {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
	return false;
	});
	
///////////////////////  Carousel show/hide nav on hover
	var carousel_showHide = function() {
		var target_area = $('.carousel-wrapper'),
			target = $('#carousel-nav');
		//target.fadeIn(300).delay(500).fadeOut(600);
		target_area.mouseover(function(event){
			if ( $(target).is(':hidden') ) {
				
				$(target).stop().fadeIn(200);
			}
		});
		target_area.mouseleave(function(event){
			if ( $(target).is(':visible') ) {
				$(target).stop().fadeOut(200);
			}
		})
		
	}
	carousel_showHide();
	
/////////////////////// Carousel functionality

	var carousel = function() {
		var imgs = $('ul.img-carousel-main li img'),
			thumbs_nav = $('ul.img-carousel-thumb').find('a'),
			total = imgs.length,
			counter = 0,
			delay = 5000,
			interrupt = false,
			animating = false,
			rotate_content = setInterval(rotate, delay, counter),
			target = 0,
			direction = 'right',
			zIndex = 0,
			imgHeight, // For correctly sizing the carousel on resize
			container = $('.img-carousel-main');
		$(imgs).not(":first").hide();
		var current = $('ul.img-carousel-main li img:visible');

		$(thumbs_nav[0]).parent('li').addClass('thumb_highlight');
		
		//loop through images and assign stack-height/z-index
		for (i=0; i< total; i++){ 
			$(thumbs_nav[i]).attr('href', i);
			$(imgs[i]).css('zIndex', 200 - i);
		}	
		
			
		function rotate(){
				if ( counter >= 0 && counter <= total - 1 && direction === 'right' ) {
					// advance to the right if target is not last
					++counter;
				} if ( counter > 0 && direction === 'left' ) {
					--counter;
				} else if ( counter === 0 && direction === 'left' ) {
					// set target to last if we have reached the beginning slide **** MUST uSE ELSE IF OR BOTH WILL FIRE
					counter = total - 1;
					
				} if ( direction === 'right' && counter === total ) {
					// set target to first if we have reached the end
					//console.log('start');
					counter = 0;
					
				}
				
				current = $('ul.img-carousel-main li img:visible');
				target = $(imgs[counter]);
				fader(current, target);
				

	} // end rotate function

		function fader(current, target){
			
			//control index to make sure next image appears underneath
			zIndex = current.css('zIndex');
			
			target.css('zIndex', zIndex -1).show();
			current.fadeOut(500, function(){
				$('li.thumb_highlight').removeClass('thumb_highlight');
				$(thumbs_nav[counter]).parent('li').addClass('thumb_highlight');
	
			});
			
		} // End fader function
		
		//Handle the thumbnail navigation
		$(thumbs_nav).click(function(event){
			event.preventDefault();
			var clicked = $(this).attr('href');
			interrupt = true;
			clearInterval(rotate_content);
			counter = clicked;
			current = $('ul.img-carousel-main li img:visible');
			target = $(imgs[clicked]);
			fader(current, target);
			
		});	
		
/////////////////////// Carousel left/right nav
		$('#carousel-nav').find('a').on('click', function(event) {
			clearInterval(rotate_content);
			event.preventDefault();
			interrupt = true;
			direction = $(this).attr('href').slice(1);
			//direction === 'left' ? counter-- : counter++;
			rotate();
			


		});	

/////////////////////// Handle carousel sizing
	window.onload = function() {
		  imgHeight = container.find('img:visible').css('height');
		  container.height(imgHeight);			
	}

/////////////////////// Handle resize
	  window.onresize=function(){
		  imgHeight = container.find('img:visible').css('height');
		  container.height(imgHeight);
	  };
	}

	carousel();
	
///////////////////////  CImage swapper
	if ( $('.bg-img.rotate') ) {
		var target_img = $('.bg-img');
		var images = ['a.jpg', 'a2.jpg', 'b.jpg', 'c.jpg', 'f.jpg'];
		var x = 0;
		
		function displayImage(image) {
              $('.bg-img.rotate').fadeOut(300, function() {
				  $('.bg-img.rotate').attr('src', 'img/bg-img/' + image).fadeIn(300);
			  })
          }
		  
		function displayNextImage() {
              if (x <= 4) {
					x+=1;  
			  } if (x===4) {
					x=0;  
			  } 
              displayImage(images[x]);           
          }
		
		function startTimer() {
			setInterval(displayNextImage, 8000);	
		}
		
		startTimer();
	}

/////////////////////// Recently viewed projects function
	// set defaults
	if (localStorage.getItem('history') ) {
		var $history = JSON.parse( localStorage.getItem('history') );
	} else {
		localStorage.setItem('history', '');
		$history = [];

	}

    var $link = window.location.href, // holds actual link value
		 $title, // holds the text value to display
		 $item, // holder for JSON value pair
		 $length = $history.length, 
		 $limit = 5, // set the history limit to display
		 $validate = 'proj-id', // use this value to check the url. If it contains this value (is one of the pages we want to record) then store in history
		 $target = $('#recentList'), // Target for the links to be deployed
		 $html =[]; // empty object to store link html in
		 
	// Check that there are items in the history and clear "no recently viewed..." message
	if ( $length > 0 ) {
		$target.empty();
	}
		 
	// build the actual link elements
	var buildLinks = function($history) {

		$.each( $history, function(i) {
			$html += '<li><a href="';
			$html += this.link;
			$html += '">';
			$html += this.title;
			$html += '</a></li>';
			
		});
		$target.append($html);
	}	
	
	// if history is greater than our limit then remove first (oldest) value
	if ( $length > $limit ) {
		for ( i = $length; i > $limit; i-- ) {
			$history.shift();	// lose one entry from end of object

		}
		//localStorage.setItem('history', JSON.stringify($history)); // reset history item in browser
		buildLinks($history);
	} else {
		buildLinks($history);	
	}
	
	
	// make sure page is one we want to track
	if ( $link.match($validate) ) {
		$title = $('div.article h1').text();
		$item = {
			'title': $title, 
			'link': $link
		 };
		 //$history = JSON.parse( localStorage.getItem('history') );
		 $history.push($item);
		 localStorage.clear('history');
		 localStorage.setItem('history', JSON.stringify($history));
	}
	   
	
})();

	