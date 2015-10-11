$(function() {
	if( $('body').hasClass('packery')){
	  initPackery('.article-list');
	} 
});

function initPackery(selector) {
	
	var content = document.querySelector(selector);
	$(content).prepend('<div class="gutter-sizer" />');
	
	imagesLoaded( content, function() {
	
		pckry = new Packery( content, {
		    itemSelector: 'li.article-list__item',
		    columnWidth: 'li.article-list__item',
		    gutter: content.querySelector('.gutter-sizer')
		});
		
		pckry.layout();
		pckry.bindResize();
		
		
		$(selector).parents('.packery-layout').find('.ajax-loader').hide();
		$(selector).addClass("show");	
	});
}
