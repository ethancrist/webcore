/**
 * @title Webcore
 * @description Lightweight, feature-rich, all purpose library for the web.
 * @author ethancrist
 * @git https://github.com/ethancrist/webcore.git
 **/

var Core = {
    init: function(options) {
        // May or may not need this to set global options for the lib
    	//this.setOptions()},
    },

    setOptions: function(defaultOptions, options) {
        /**
         * @purpose Merge two objects that may or may not overlap where the options override
         *          the default but the default are a fallback if an option wasn't set
         * @usage Core.setOptions({ unsetOption: 'defaultValue', otherOption: 'defaultValue' }, { otherOption: 'set' })
         * @returns [object] e.g. { unsetOption: 'defaultValue', otherOption: 'set' }
         **/
        if (options === undefined) options = {};

        var newOptions = {};
        for (var i = 0; i < Object.keys(defaultOptions).length; i++) {
            // { "thisKey": "thisValue" } <= Looping through the entire object like this, treating as an array
            var thisKey = Object.keys(defaultOptions)[i];
            var defaultValue = defaultOptions[thisKey];

            var allOptionsUnset = options === undefined || options === null;
            var thisOptionUnset = options[thisKey] === undefined || options[thisKey] === null || options[thisKey] === '';

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
	 * @purpose Add a script to the DOM without jQuery
	 * @usage addScript({ src: 'myscript.js', callback: function() { console.log('Script '+src+' is ready!') } })
	 * @returns [DOM object] Script 
	 **/
	 var defaultOptions = {
             id: '', // HTML element ID to be set
             classes: [], // Any and all classes the element will have
             src: 'site.js', // Source for the script
	     callback: function() {} // Callback when the script is loaded
	 };
	 options = this.setOptions(defaultOptions, options);
	 
	 var script = document.createElement('script');
	 script.id = options.id;
	 
	 for (var i = 0; i < options.classes.length; i++) {
	     script.classList.add(options.classes[i])
	 };
	 
	 script.src = options.src;
	 script.onload = options.callback;
	 
	 // document.head.append is not yet fully cross-browser, hence [...].appendChild
	 return document.getElementsByTagName('head')[0].appendChild(script);
    },
	
    isMobile: {
        /**
         * @purpose Detect if user is on a mobile device, and if so which device
         * @usage Core.isMobile.any() || Core.isMobile.Android() **etc**
         * @returns [Array (device data) || null] 
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
    
}
