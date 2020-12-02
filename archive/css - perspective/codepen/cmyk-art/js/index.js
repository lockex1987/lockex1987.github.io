$('.cub-1').click(function(){
		if (!$(this).hasClass('open')) {
			$(this).css('transform', 'translate3d(4em, -3em, 4em) rotateX(-90deg) rotateY(180deg) rotateZ(-45deg)');
			$(this).addClass('open');
		} else {
			$(this).css('transform', 'translate3D(0em, 0em, 0em) rotateX(0deg) rotateY(90deg) rotateZ(0deg)');
			$(this).removeClass('open');
		};
	});
	$('.cub-2').click(function(){
		if (!$(this).hasClass('open')) {
			$(this).css('transform', 'translate3d(4em, -4em, 4em) rotateX(-90deg) rotateY(180deg) rotateZ(-45deg)');
			$(this).addClass('open');
		} else {
			$(this).css('transform', 'translate3D(0em, -2em, 0em) rotateX(0deg) rotateY(90deg) rotateZ(0deg)');
			$(this).removeClass('open');
		};
	});
	$('.cub-3').click(function(){
		if (!$(this).hasClass('open')) {
			$(this).css('transform', 'translate3d(4em, -5em, 4em) rotateX(-90deg) rotateY(180deg) rotateZ(-45deg)');
			$(this).addClass('open');
		} else {
			$(this).css('transform', 'translate3D(0em, -4em, 0em) rotateX(0deg) rotateY(90deg) rotateZ(0deg)');
			$(this).removeClass('open');
		};
	});
	$('.cub-4').click(function(){
		if (!$(this).hasClass('open')) {
			$(this).css('transform', 'translate3d(4em, -5em, 4em) rotateX(-90deg) rotateY(180deg) rotateZ(-45deg)');
			$(this).addClass('open');
		} else {
			$(this).css('transform', 'translate3D(0em, -6em, 0em) rotateX(0deg) rotateY(90deg) rotateZ(0deg)');
			$(this).removeClass('open');
		};
	});