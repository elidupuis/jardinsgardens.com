/**
 *	jQuery blockify plugin
 *	@version 0.2
 *	@date Feb 10, 2010
 *	@author Eli Dupuis
 *	@copyright (c) 2009 Lift Interactive (http://liftinteractive.com)
 *	Dual licensed under the MIT and GPL licenses:
 *	http://www.opensource.org/licenses/mit-license.php
 *	http://www.gnu.org/licenses/gpl.html
 *	Requires: jQuery v1.3.2 or later (most likely works fine with earlier versions, but untested)

*/

(function($) {

var ver = '0.2';

jQuery.fn.blockify = function(options) {

	// iterate and reformat each matched element
	return this.each(function() {
		var $this = $(this);
		var opts = $.extend({}, $.fn.blockify.defaults, options);

		var elm = $this.find(opts.selector);
		
		//	exit if there's no link found-based on
		if (elm.length < 1) return;

		//	if user option true, use mouse pointer on hover: 
		if (opts.pointer) $(this).css({cursor:'pointer'});
		
		//	add hover class to element for custom styling
		if (opts.hoverClass) {
			$this.hover(function(){
				$(this).addClass(opts.hoverClass);
			},function(){
				$(this).removeClass(opts.hoverClass);
			});			
		};
		
		$this.click(function(e){
			if (e.target.nodeName.toLowerCase() != 'a') {
				//	target is not a standard <a> link.

				//	make sure no text has been selected:
				if(getSelectedText() == "") {
					/*
						tried to trigger click on elm here, but got stuck on recursion
						equivalent to elm.click() would be ideal and we could get rid of externalClass crap
					*/	
					if (elm.hasClass(opts.externalClass)) {
						window.open(elm.attr('href'));
					}else{
						window.location = elm.attr('href');
					};
				};
			};
		});
		
	});
};	

//	defaults
$.fn.blockify.defaults = {
	selector:'a:last',		//	selector to specific anchor (or other element), in case there's more than one!
	pointer:true,			//	if true, sets css cursor to pointer
	hoverClass:'hover',		//	class attached to element on hover
	externalClass:'ext'		//	if target anchor has this class, link will be opened in a new window
};

//	public function/method
$.fn.blockify.ver = function() { return "jquery.blockify ver. " + ver; };


//	get selected text:
//	from http://newism.com.au/blog/post/58/bigtarget-js-increasing-the-size-of-clickable-targets/
function getSelectedText(){
	if(window.getSelection){
		return window.getSelection().toString();
	}
	else if(document.getSelection){
		return document.getSelection();
	}
	else if(document.selection){
		return document.selection.createRange().text;
	}
};


// end of closure
})(jQuery);