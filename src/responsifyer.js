/*
Author: Kunuk Nykjaer
version 0.13

About: prototype util to make a webpage responsive

Usage: copy and run this code in a browser console 
and see the result by changing the width size of the browser

Optionally edit the config data at the bottom of this script 
to see different results, e.g. if the page uses tables
*/
var responsifyer;
(function (config) {
	responsifyer = {};
	responsifyer.responsifyTables = function () {
		var $ = responsifyer.$ // jQuery
		, $elements;

		/* Make tables responsive */
		$elements = $('table');
		$elements.each(function () {
			this.style.setProperty('table-layout', 'auto', 'important');
			this.style.setProperty('width', 'auto', 'important');
		});

		$elements = $('table th, table td');
		$elements.each(function () {
			this.style.setProperty('overflow', 'hidden', 'important');
		});
		$elements = $('table, thead, tbody, th, td, tr');
		$elements.each(function () {
			this.style.setProperty('display', 'block', 'important');
		});		
	};

	function runResponsify(root, $) {

		// Recursive work
		responsifyRecursive(root, $);

		// Specific work on node elements
		var $elements = $('img');
		$elements.each(function () {
			this.style.setProperty('max-width', '100%', 'important');
			this.style.setProperty('height', 'auto', 'important');
		});
		
		if (config.responsifyTables) {
			responsifyer.responsifyTables();
		}

		$elements = $('pre');
		$elements.each(function () {
			this.style.setProperty('white-space', 'pre-wrap', 'important');
			this.style.setProperty('word-wrap', 'break-word', 'important');
		});

	/*
	// template code for doing stuff on screen size changes
	var screenInfo = '',
	screen = '',
	small = 'small device',
	large = 'large device',
	info = ' - do stuff when size changes - ';		
	$(window).resize(function () {
		var width = $(document).width();
		if (width < 760) {
			screen = small;
			if (screenInfo !== screen) {
				screenInfo = screen;
				console.log(width + 'px ' + screenInfo + info + new Date());
			}
		} else {
			screen = large;
			if (screenInfo !== screen) {
				screenInfo = screen;
				console.log(width + 'px ' + screenInfo + info + new Date());
			}
		}
	});
	*/
	}

	function responsifyRecursive(root, $) {
		var $root = $(root);
		$root.contents().each(function () {

			// If is element type
			if (this.nodeType === 1) {
				var $this = $(this);
				
				// skip iframe
				if ($this.is('iframe'))
					return;

				// skip head
				if ($this.is('head'))
					return;

				$this.removeAttr('width');
				$this.removeAttr('height');

				this.style.setProperty('min-width', '0','important');
				this.style.setProperty('min-height','0','important');
				this.style.setProperty('max-width', '100%','important');
				this.style.setProperty('max-height','100%','important');
				if (config.changeWidthToAuto) {
					this.style.setProperty('width','auto','important');
				}

				// Recursive work on the children
				responsifyRecursive(this, $);
			}
		});
	}

	+function (d) {
		// Add viewport meta tag
		var viewPortTag = d.createElement('meta');
		viewPortTag.id = "viewport";
		viewPortTag.name = "viewport";
		viewPortTag.content = "width=device-width, initial-scale=1";
		d.getElementsByTagName('head')[0].appendChild(viewPortTag);

		// if jQuery is available then use it
		if (typeof jQuery !== 'undefined') {
			responsifyer.$ = jQuery; // setter injection
			runResponsify(d, jQuery);
		// else first load it from a CDN 
		} else {
			var jQueryScript = d.createElement('script');
			jQueryScript.src
				= 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
			d.getElementsByTagName('head')[0].appendChild(jQueryScript);

			var seconds = 2;
			setTimeout(function () {
				// Give time to load jQuery before invoking function
				responsifyer.$ = jQuery; // setter injection
				runResponsify(d, jQuery);
			}, 1000 * seconds); // wait n seconds
		}
	}(document);
	
	// configuration data
})({ responsifyTables: false, changeWidthToAuto: false });
