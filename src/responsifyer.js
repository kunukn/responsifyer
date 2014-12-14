/*
Author: Kunuk Nykjaer
version 0.1

About: prototype util to make a webpage responsive

Usage: copy and run this code in a browser console 
and see the result by changing the width size of the browser

Optionally edit the config data at the bottom of this script 
to see different results, e.g. if the page uses tables
*/
var responsifyer;
(function (config) {
	responsifyer = {};
	responsifyer.changeTables = function () {
		var $elements = $('table, thead, tbody, th, td, tr');
		$elements.each(function () {
			this.style.setProperty('display', 'block', 'important');
		});
	};

	function runResponsify(root, $) {

		responsifyRecursive(root, $);

		var $elements = $('img');
		$elements.each(function () {
			this.style.setProperty('max-width', '100%', 'important');
			this.style.setProperty('height', 'auto', 'important');
		});

		$elements = $('table');
		$elements.each(function () {
			this.style.setProperty('table-layout', 'auto', 'important');
			this.style.setProperty('width', 'auto', 'important');
		});

		$elements = $('table th, table td');
		$elements.each(function () {
			this.style.setProperty('overflow', 'hidden', 'important');
		});

		/* Make tables to not be like table anymore */
		if (config.changeTables) {
			$elements = $('table, thead, tbody, th, td, tr');
			$elements.each(function () {
				this.style.setProperty('display', 'block', 'important');
			});
		}

		$elements = $('pre');
		$elements.each(function () {
			this.style.setProperty('white-space', 'pre-wrap', 'important');
			this.style.setProperty('word-wrap', 'break-word', 'important');
		});

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

				if ($this.is('img'))
					return;

				else {
					this.style.setProperty('min-width', '0', 'important');
					this.style.setProperty('min-height', '0', 'important');
					this.style.setProperty('max-width', '100%', 'important');
					this.style.setProperty('max-height', '100%', 'important');
					if (config.changeWidthToAuto) {
						this.style.setProperty('width', 'auto', 'important');
					}
				}

				// Recursive work on the children
				responsifyRecursive(this, $);
			}
		});
	}

	// Add meta tag
	var viewPortTag = document.createElement('meta');
	viewPortTag.id = "viewport";
	viewPortTag.name = "viewport";
	viewPortTag.content = "width=device-width, initial-scale=1";
	document.getElementsByTagName('head')[0].appendChild(viewPortTag);

	if (typeof jQuery !== 'undefined') {
		runResponsify(document, jQuery);
	} else {
		var jquery = document.createElement('script');
		jquery.src = "https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
		document.getElementsByTagName('head')[0].appendChild(jquery);

		setTimeout(function () {
			// Give time to load jQuery before invoking function
			runResponsify(document, jQuery);
		}, 1000 * 2); // wait n seconds
	}
})({ changeTables: false, changeWidthToAuto: false });
