/**
 * @title Webcore
 * @description Lightweight, feature-rich, all purpose library for the web.
 * @author ethancrist
 * @git https://github.com/ethancrist/webcore.git
 **/

const Core = {
	init: function(options) {
		/**
		 * @meta Core.init [function]
		 * @options ##### `ready`
		 *          Type: `Function`
		 *          Function that loads once Webcore is fully initialized.
		 *          ##### `forceHTTPS`
		 *          Type: `Boolean` Default: `false`
		 *          Will refresh with HTTPS if user loads the page on HTTP.
		 **/
		const defaultOptions = {
		    ready: function() {},
		    forceHTTPS: false
		};
		options = Core.setOptions(defaultOptions, options);

		if (options.forceHTTPS) {
		    if (location.href.substring(0, 5) !== 'https') location.href = 'https'+location.href.substring(4);
		};

		this.addScript({ src: 'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js', callback: function() {
		    $(document).ready(function() {
			Core.supplementJS();
			Core.supplementJQuery();
			options.ready();
		    });
		}});

	},

	supplementJS: function() {
		// Adding functions to native JavaScript
		Array.prototype.remove = function(item) {
			 /**
			  * @meta Array.remove [function]
			  * @purpose Remove index from array by its value.
			  * @justify This is a simpler integration than Array.splice, as you need not know the index beforehand.
			  * @usage ```javascript
			  *        ['This', 'is', 'not', 'a', 'complete', 'sentence'].remove('not');
			  *        ```
			  * @returns The new array without the removed item.
			  **/

			 // Removing the item at its index
			 this.splice(this.indexOf(item), 1);

			 // Returning the new array
			 return this
		};
		String.prototype.replaceAll = function(search, replacement) {
			 /**
			  * @meta String.replaceAll [function]
			  * @purpose Replaces all instances of substring in string.
			  * @usage Replace multiple substrings
			  *        ```javascript
			  *        'Hi (unwanted1)(unwanted2)Bob'.replaceAll(['(unwanted1)', '(unwanted2)'], '');
			  *        ```
			  *         Replace one substring
			  *        ```javascript
			  *        'Hi (unwanted)'.replaceAll('(unwanted)', '');
			  *        ```
			  * @returns The new string with proper replacement(s).
			  **/
			 let searches = Array.isArray(search) ? search : [search];

			 let result = this;
			 searches.forEach(function(phrase) {
				  result = result.replace(new RegExp(phrase, 'g'), replacement);
			 });

			 return result
		};
		String.prototype.capitalize = function() {
			 /**
			  * @meta String.capitalize [function]
			  * @purpose Capitalize the first letter of a string.
			  * @usage Will set `test` equal to `'Test'`
			  *        ```javascript
			  *        var test = 'TEST';
			  *        test = test.capitalize();
			  *        ```
			  * @returns `String` with first letter capitalized.
			  **/
			 return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
		};
		Function.prototype.async = function(callback) {
			 /**
			  * @meta Function.async [function]
			  * @purpose Loads a function asynchronously.
			  * @usage Run a function asynchronously
			  *        ```javascript
			  *        function() { console.log('Will log async!') }.async();
			  *        ```
			  *        Run a function asynchronously with a callback
			  *        ```javascript
			  *        function() { console.log('Will log async!') }.async(function() {
			  *            console.log('Will log when first logging is done!')
			  *        });
			  *        ```
			  **/
			 // Storing function in variable so it can be accessed in below function
			 let functionToRun = this;

			 setTimeout(function() { functionToRun(); if (callback) callback(); }, 0)
		}
	},

	supplementJQuery: function() {
		// Adding functions to jQuery
		$.fn.getMargins = function() {
			/**
			 * @meta $('selector').getMargins [function]
			 * @purpose Get the margins of a particular element, returned as a float.
			 * @usage ```javascript
			 * 	      $('selector').getMargins().top
			 *		  ```
			 * @justify This function removes the 'px' off of jQuery's `$('selector').css('margin')`
			 * @returns Type: `Object`
			 *			Top, bottom, left, and right pixel margin numbers of the element.
			 *			```javascript
			 *			{ top: <margin-top>, right: <margin-right>, bottom: <margin-bottom>, left: <margin-left> }
			 * 			```
			 **/
			 let marginValues = {};

			 let marginTypes = ['top', 'right', 'bottom', 'left'];
			 for (let i = 0, len = marginTypes.length; i < len; i++) {
				// Turning e.g. "10px" ==> 10
				let thisMarginType = $(this).css('margin-'+marginTypes[i]);

				marginValues[marginTypes[i]] = parseFloat(thisMarginType.substring(0, thisMarginType.length - 2))
			 };

			 return marginValues
		};
		$.fn.globalCSS = function(css) {
			/**
			 * @meta $('selector').globalCSS [function]
			 * @purpose An upgrade from jQuery's $('selector').css; adds a cross-browser CSS property all in one go.
			 * @justify Add -webkit-, -moz-, -ms-, -o-, and standard all in one.
			 * @usage ```javascript
			 *        // Will automatically add -webkit-animation, -moz-animation, -ms-animation, -o-animation
			 *        $('button').globalCSS({ animation: 'myanimation 1s forwards' })
			 *        ```
			 * @returns Element(s) passed in.
			 **/
			let keys = Object.keys(css);
			let browsers = ['-webkit-', '-moz-', '-ms-', '-o-'];

			let newCSS = {};
			keys.forEach(function(key) {
				browsers.forEach(function(browser) {
				    // Adding browser preface to key name, i.e. -o-animation
				    newCSS[browser+key] = css[key];
				});

				// Adding standard CSS, i.e. 'animation' with no browser preface
				newCSS[key] = css[key];
			});

			// Applying the css and returning the DOM object
			return $(this).css(newCSS);
		};
		$.fn.rotate = function(options) {
			/**
			 * @meta $('selector').rotate [function]
			 * @purpose Rotates an element with an optional animation.
			 * @usage Rotate `#my-div` 90 degrees with a smooth transition.
			 *        ```javascript
			 *        $('#my-div').rotate({ degrees: 90, duration: 1000 });
			 *        ```
			 *        Rotate `#my-div` and `#my-other-div` -70 degrees without a transition.
			 *        ```javascript
			 *        $('#my-div, #my-other-div').rotate({ degrees: -70 });
			 *        ```
			 * @returns Element(s) passed in.
			 **/
			let defaultOptions = {
				degrees: 90,
				duration: 0,
				callback: function() {}
			};
			options = Core.setOptions(defaultOptions, options);

			let transformCSS = 'rotate('+options.degrees+'deg)'+( ($(this).attr('id') === 'phone') ? ' translateX(108%) translateY(-38%)' : '' );
			if (options.degrees === 0) transformCSS = '';

			$(this).globalCSS({
				// Animation
				'transition': 'transform '+(options.duration/1000)+'s',

				// Rotation (adding adjustment if div is #phone)
				'transform': transformCSS
			});

			// Running callback after animation is done
			setTimeout(options.callback, options.duration);

			return $(this)
		};
		$.fn.isFilled = function() {
			/**
			 * @meta $('selector').isFilled [function]
			 * @purpose Check if an input or a set of inputs have text in them.
			 * @returns Type: `Boolean`
			 **/
			let elements = $(this);
			let elementList = Object.keys($(this));
			let isOk = true;

			elementList.forEach(function(element) {
				let thisElement = elements[elementList[element]];

				// Exceptions (not actually elements)
				if (['selector', 'context', 'length'].indexOf(element) > -1) return;

				if (!$(thisElement).val() || $(thisElement).val().length < 1) isOk = false; 
			});

			return isOk
		};
		$.fn.dumpCSS = function(){
			/**
			 * @meta $('selector').dumpCSS [function]
			 * @purpose Get all CSS for element
			 * @returns Type: `Object`
			 *          Strings of the CSS for the element(s) specified, with a chronological numeric index for each element.
			 *          ```javascript
			 *          { 0: 'width:10px;height:5px;', 1: 'background:green' }
			 *          ```
			 **/
			let allCSS = {};

			for (var e = 0; e < $(this).length; e++) {
				let cssString = '';
				let css = getComputedStyle($(this).get(e));

				for(let i = 0, len = css.length; i < len; i++) {
					cssString += css[i] + ':' + css.getPropertyValue(css[i])+';';
				};
				allCSS[e] = cssString;
			};

			return allCSS
		};
		$.fn.hasScrollbar = function() {
			/**
			 * @meta $('selector').hasScrollbar [function]
			 * @purpose Check whether or not an element currently has a scrollbar attached to it.
			 * @returns Type: `Boolean`
			 *          Whether or not the specified element has a scrollbar.
			 **/
			// If the scrollHeight is bigger than the height of the element (w/ 2px offset), then true.
			return $(this)[0].scrollHeight > ($(this).outerHeight()+2);
		};
		$.fn.hold = function(holdListener, liftListener) {
			/**
			 * @meta $('selector').hold [function]
			 * @purpose Run listeners while an element is being held and released by the mouse.
			 * @usage ```javascript
			 *        $('#hold').hold(holdListener, liftListener);
			 *	  ```
			 */
			$(this).on('mousedown', function() {
				if (typeof(holdListener) === 'function') holdListener();

				$(window).on('mouseup', liftListener);
			});
		};
	},

	setOptions: function(defaultOptions, options) {
		/**
		 * @meta Core.setOptions [function]
		 * @purpose Merge two objects that may or may not overlap where the options override the default but the default are a fallback if an option wasn't set.
		 * @usage ```javascript
		 *        Core.setOptions({ unsetOption: 'defaultValue', otherOption: 'defaultValue' }, { otherOption: 'set' })
		 *        ```
		 * @returns Type: `Object`
		 *          ```javascript
		 *          { unsetOption: 'defaultValue', otherOption: 'set' }
		 *          ```
		 **/
		if (options === undefined) options = {};

		let newOptions = {};
		for (let i = 0, len = Object.keys(defaultOptions).length; i < len; i++) {
		    // { "thisKey": "thisValue" } <= Looping through the entire object like this, treating as an array
		    let thisKey = Object.keys(defaultOptions)[i];
		    let defaultValue = defaultOptions[thisKey];

		    let allOptionsUnset = options === undefined || options === null;
		    let thisOptionUnset = options[thisKey] === undefined || options[thisKey] === null || options[thisKey] === '';

		    // Falling back to default if not set, overriding the default if set
		    if (allOptionsUnset || thisOptionUnset) {
			// This option wasn't set; falling back to default
			newOptions[thisKey] = defaultValue;
		    } else {
			// This option was set; not using default
			newOptions[thisKey] = options[thisKey];
		    }
		};
		
		// The result: an object that need not any if statements to check if null
		return newOptions
	},

	addScript: function(options) {
		/**
		 * @meta Core.addScript [function]
		 * @purpose Add a script to the DOM with a callback.
		 * @usage ```javascript
		 *        Core.addScript({ src: 'myscript.js', callback: function() { console.log('Script '+src+' is ready!') } });
		 *        ```
		 * @returns Type: `Element`
		 *          The script element that has been added. 
		 **/
		const defaultOptions = {
		    id: '', // HTML element ID to be set
		    classes: [], // Any and all classes the element will have
		    src: 'site.js', // Source for the script
		    callback: function() {} // Callback when the script is loaded
		};
		options = Core.setOptions(defaultOptions, options);

		let script = document.createElement('script');
		script.id = options.id;

		for (let i = 0, len = options.classes.length; i < len; i++) {
		    script.classList.add(options.classes[i])
		};

		script.src = options.src;
		script.onload = options.callback;

		// document.head.append is not yet fully cross-browser, hence [...].appendChild
		return document.getElementsByTagName('head')[0].appendChild(script);
	},

	isMobile: {
		/**
		 * @meta Core.isMobile [object]
		 * @purpose Detect if user is on a mobile device, and if so which device.
		 * @usage ```javascript
		 *        Core.isMobile.any();
		 *        Core.isMobile.Android();
		 *        Core.isMobile.Blackberry();
		 *        Core.isMobile.iOS();
		 *        Core.isMobile.Opera();
		 *        Core.isMobile.Windows();
		 *        ```
		 * @returns Type: `Array`
		 *          `null` or the device data for the mobile device being used.
		 **/  
		Android: function() {
		    return navigator.userAgent.match(/Android/i)
		},
		BlackBerry: function() {
		    return navigator.userAgent.match(/BlackBerry/i)
		},
		iOS: function() {
		    return navigator.userAgent.match(/iPhone|iPod|iPad/i)
		},
		Opera: function() {
		    return navigator.userAgent.match(/Opera Mini/i)
		},
		Windows: function() {
		    return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i)
		},
		any: function() {
		    return this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows()
		}
	},
        
	getParameter: function(name, url) {
		/**
		 * @meta Core.getParameter [function]
		 * @purpose Get a parameter from a URL. If no URL is passed, the current one is used.
		 * @usage Returns 'beagle'
		 *		  ```javascript
		 *		  getParameter('dog', 'https://mydogs.net?dog=beagle');
		 *		  ```
		 * @returns Parameter value specified.
		 **/
		url = url || window.location.href;

		name = name.replace(/[\[\]]/g, "\\$&");

		let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
		let results = regex.exec(url);

		if (!results) return null;
		if (!results[2]) return '';

		return decodeURIComponent(results[2].replace(/\+/g, " "));
	},

	setParameter: function(key, value, options) {
		/**
		 * @meta Core.setParameter [function]
		 * @purpose Set a query to the current URL.
		 * @usage Sets as 'https://mysite.com/?cat=siamese'
		 *		  ```javascript
		 *		  setParameter('cat', 'siamese');
		 *		  ``` 
		 *		  Set a parameter and refresh the page afterwards.
		 *		  ```javascript
		 *		  setParameter('param', 'value', { refresh: true });
		 *		  ```
		 * @options ##### `refresh`
		 *                Type: `Boolean` Default: `false`
		 *                Refresh the page after adding the parameter to the URL.
		 * @returns Type: `Object`
		 *			Contains `key` which is the parameter name, as well as its `value` and the new `url`
		 **/
		let defaultOptions = {
		    refresh: false
		};
		options = Core.setOptions(defaultOptions, options);

		let newURL = '';
		let currentParam = getParameter(key);

		if (currentParam) {
		    // Param exists; editing existing instead of adding anew
		    let currentStartPos = location.href.indexOf(key);
		    let currentEndPos = location.href.indexOf(key+'='+currentParam)+key.length+1+currentParam.length;

		    // 'clouds=2' in https://mysite.com/?clouds=2&other=value2
		    let current = location.href.substring(currentStartPos, currentEndPos);

		    // Editing new parameter
		    newURL = location.href.substring(0, currentStartPos)+key+'='+value+location.href.substring(currentEndPos)
		} else {
		    // Creating new parameter
		    newURL = location.href+(location.href.includes('?') ? '&' : '?')+key+'='+value;
		}; 
		
		// Changing the URL without refreshing
		history.pushState(options.key+options.value, document.title, newURL);

		if (options.refresh) location.reload();

		// Returning metadata
		return { key: key, value: value, url: location.href }
	},
	
	getMS: function() {
		/**
		 * @meta Core.getMS [function]
		 * @purpose Get the current time since last epoch in milliseconds.
		 * @returns Type: `Number`
		 * 			MS since last epoch.
		 **/
		return new Date().getTime();
	},

	random: function(max, blacklist) {
		/**
		 * @meta Core.random [function]
		 * @purpose Get random `Integer` with a specified ceiling and optional blacklist of numbers.
		 * @usage Get a random integer between 0-5000.
		 *		  ```javascript
		 *		  random(5000);
		 *		  ```
		 *		  Get a random integer between 0-10, EXCEPT 7, 8, or 9
		 *		  ```javascript
		 *		  random(10, [7, 8, 9]);
		 *		  ```
		 * @options ##### `blacklist`
		 *          Type: `Array` Required: `false`
		 *          An array of numbers that will be re-randomized if hit.
		 * @returns Random `Number`
		 **/
		const value = Math.floor(Math.random()*Math.floor(max+1));

		// Catching if blacklist isn't set
		blacklist = blacklist || [];

		// If random value is a blacklisted number, try again; otherwise, return it as is
		return blacklist.indexOf(value) > -1 ? random(max, blacklist) : value
	},

	uncacheFile: function(file) {
		/**
		 * @meta Core.uncacheFile [function]
		 * @purpose Get a new file name with an uncaching query on the end.
		 * @usage ```javascript
		 * 			 uncacheFile('file.js');
		 * 		  ```
		 * @returns Type: `String`
		 * 			The pre-existing file name with a randomized number as a query to prevent caching. For example:
		 *			```
		 *			file.js_?=4540647
		 *			```
		 **/
		return file+'?_='+Core.random(5000000000)
	},

	preload: function(images, callback) {
		/**
		 * @meta Core.preload [function]
		 * @purpose Preload an array of images synchronously with a callback at the end.
		 * @usage Preload `landscape.png` with no callback.
		 *	      ```javascript
		 *		  preload(['landscape.png']);
		 *		  ```
		 *		  Preload `image.gif` and `sun.jpg` with a callback when the last one is done.
		 *		  ```javascript
		 *		  preload(['image.gif', 'sun.jpg'], function(metadata) {
		 *		      console.log('Images preloaded! Now they will be lagless when added to an element!');
		 *			  
		 *            // [ { src: 'image.gif', success: true, elapsed: 312 }, { src: 'sun.jpg', success: true, elapsed: 53 } ]
		 *            // Note: 'elapsed' in each index has a margin of error of about 3ms.
		 *            console.log(JSON.stringify(metadata));
		 *		  });
		 *		  ```   
		 **/
		if (!callback) callback = function() {};
		let index = 0;

		let metadata = [];
		const loadNext = function() {
		    const src = Core.uncacheFile(images[index]);
		    const isLastImage = index + 1 === images.length;
		    index++;

		    const startTime = Core.getMS();
		    let image = new Image();
		    image.src = src;

		    // Not continuing the loop or running the final callback until this image is loaded
		    const proceed = function(success) {
		        metadata[index-1] = { src: src, success: success, elapsed: Core.getMS() - startTime };
		        !isLastImage ? loadNext() : callback(metadata); 
		    };
		    image.onload = function() { proceed(true) };
		    image.onerror = function() { proceed(false) };
		};

		loadNext();
	},

	waitUntilThis: function(options) {
		/**
		 * @meta Core.waitUntilThis [function]
		 * @purpose Wait until a specific condition happens. Make sure to wrap the condition in a function and a return statement so that the Boolean can be checked dynamically!
		 * @usage Run the callback when #entry is visible, and timeout after 5000ms.
		 *        ```javascript
		 *        waitUntilThis({ condition: function() { return $('#entry').is(':visible') }, timeout: 5000, callback: function(metadata) {
		 *            console.log('Entry is now visible!');
		 *
		 *            // { success: true, elapsed: 189, checkGap: 5, timeout: 5000 }
		 *            console.log(JSON.stringify(metadata));
		 *        }})
		 *        ```
		 * @options ##### `condition`
		 *          Type: `Function` Required: `true` Example: `function() { return myBoolean == true }`
		 *          The condition to wait until. It must be a function with a return statement, not a boolean! If it is a boolean, the value will be passed through statically, and will never change!
		 *          ##### `callback`
		 *          Type: `Function` Required: `true`
		 *          Function to run when operation in `condition` is `true`
		 *          ##### `timeout`
		 *          Type: `Number` Required: `false` Default: `5000`
		 *          Time in milliseconds to abort the operation if `condition` is never satisfied.
		 *          ##### `checkGap` Required: `false` Default: `5`
		 *          How frequently in milliseconds the condition is checked.
		 **/
		const defaultOptions = {
		    condition: function() { return $('body').is(':visible') }, // Condition to wait for
		    callback: function() {}, // Function to run on timeout or when element is visible 
		    timeout: 5000, // The total ms ceiling before timing out
		    checkGap: 5 // The ms between each check
		};
		options = Core.setOptions(defaultOptions, options);

		// By default, this will check 1000 times, 5ms between each check
		let checks = 0;
		let limit = options.timeout/options.checkGap;
		let success = false;

		let check = function() {
		    checks++;

		    if (options.condition()) return options.callback({ success: true, elapsed: checks*options.checkGap, checkGap: options.checkGap, timeout: options.timeout });

		    // Limit reached
		    if (checks >= limit) return options.callback({ success: false, elapsed: options.timeout, checkGap: options.checkGap, timeout: options.timeout });

		    // It wasn't visible; rechecking...
		    setTimeout(check, options.checkGap);
		};

		check()
	}
       
}
