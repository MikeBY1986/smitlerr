$(function() {
//настройка mmenu
	$('#my-menu').mmenu({
		extensions: ['theme-black', 'effect-menu-slide', 'pagedim-black'],
		navbar: {
			title: '<img src="img/logo-1.svg" alt="Салон красоты Смитлер">'
		},
		offCanvas: {
			position: 'right'
		}
	});

	var api = $('#my-menu').data('mmenu');
	api.bind('opened', function(){
		$('.hamburger').addClass('is-active');
	}).bind('closed', function(){
		$('.hamburger').removeClass('is-active');
	});

//колбэк для того, чтобы функция , выравнивающая высоты блоков, срабатывала после инициализации карусели
	$('.carousel-services').on('initialized.owl.carousel', function(){
		setTimeout(function(){carouselService()},100);
	});

//owl карусель	
	$('.carousel-services').owlCarousel({
		dots: false,
		// loop: true,
		nav: true,
		smartSpeed: 700,
		navText: ['<i class="fa fa-angle-double-left"></i>','<i class="fa fa-angle-double-right"></i>'],
		responsiveClass: true,
		responsive: {
			0: {
				items: 1
			},
			800: {
				items: 2
			},
			1100: {
				items: 3
			}
		}
	});

	$('.reviews').owlCarousel({
		loop: true,
		items: 1,
		smartSpeed: 700,
		dots: true,
		autoHeight: true
	});

	$('.partners').owlCarousel({
		loop: true,
		smartSpeed: 700,
		nav: true,
		navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
		dots: false,
		responsiveClass: true,
		responsive: {
			0: {
				items: 1,
			},
			768: {
				items: 2,
			},
			992: {
				items: 3,
			},
			1200: {
				items: 4,
			},
		}
	});
//функция, которая должна бы выравнивать высоты блоков один над другим, но работает некорректно почему то
	function carouselService(){
		$('.carousel-services-item').each(function(){
			var ths = $(this),
				thsHeight = ths.find('.carousel-services-content').outerHeight();
				ths.find('.carousel-services-image').css('min-height', thsHeight);
		});
	};


//функция добавляющая HTML-элемент span (оборачивает последнее слово в тексте)
	$('.carousel-services-composition .h3').each(function(){
		var ths = $(this);
		ths.html(ths.html().replace(/(\S+)\s*$/, '<span>$1</span>'));
	});
//функция добавляющая HTML-элемент span (оборачивает первое слово в тексте)
	$('section .h2').each(function(){
		var ths = $(this);
		ths.html(ths.html().replace(/^(\S+)/, '<span>$1</span>'));
	});
//selectize
	$('select').selectize({

	});
//end selectize

// buttom on top

	$(window).scroll(function(){
		if($(this).scrollTop() > $(this).height()){
			$('.top').addClass('active');
		} else {
			$('.top').removeClass('active');
		}
	});
	$('.top').click(function(){
		$('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
	});


	//E-mail Ajax Send

	$("form.callback").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			// alert("Thank you!");
			$(th).find('.success').addClass('active').css('display', 'flex').hide().fadeIn();
			setTimeout(function() {
				$(th).find('.success').removeClass('active').fadeOut();
				// Done Functions
				th.trigger("reset");
			}, 3000);
		});
		return false;
	});


//Resize Window
	function onResize(){
		$('.carousel-services-content').equalHeights();
	};
	onResize();
	window.onresize = function(){
		onResize();
		carouselService();
	};
});


// preloader!!!
$(window).on('load', function(){
	$('.preloader').delay(1000).fadeOut('slow');
})