# Webcore

Lightweight, feature-rich, all purpose library for the web.

## API

###### [core.js](core.js)

---
### [`Core.init [function]`](core.js#L9)
#### Options

##### `forceHTTPS`

Type: `Boolean` Default: `false`
Will refresh with HTTPS if user loads the page on HTTP.


---
### [`Array.remove [function]`](core.js#L36)
Remove index from array by its value.

#### Justify

This is a simpler integration than Array.splice, as you need not know the index beforehand.

#### Usage

```javascript

['This', 'is', 'not', 'a', 'complete', 'sentence'].remove('not');
```

#### Returns

The new array without the removed item.


---
### [`String.replaceAll [function]`](core.js#L53)
Replaces all instances of substring in string.

#### Usage

Replace multiple substrings

```javascript
'Hi (unwanted1)(unwanted2)Bob'.replaceAll(['(unwanted1)', '(unwanted2)'], '');
```
Replace one substring
```javascript
'Hi (unwanted)'.replaceAll('(unwanted)', '');
```

#### Returns

The new string with proper replacement(s).


---
### [`String.capitalize [function]`](core.js#L76)
Capitalize the first letter of a string.

#### Usage

Will set `test` equal to `'Test'`

```javascript
var test = 'TEST';
test = test.capitalize();
```

#### Returns

`String` with first letter capitalized.


---
### [`Function.async [function]`](core.js#L89)
Loads a function asynchronously.

#### Usage

Run a function asynchronously

```javascript
function() { console.log('Will log async!') }.async();
```
Run a function asynchronously with a callback
```javascript
function() { console.log('Will log async!') }.async(function() {
console.log('Will log when first logging is done!')
});
```


---
### [`$('selector').getMargins [function]`](core.js#L113)
Get the margins of a particular element, returned as a float.

#### Usage

```javascript

$('selector').getMargins().top
```

#### Justify

This function removes the 'px' off of jQuery's `$('selector').css('margin')`

#### Returns

Type: `Object`

Top, bottom, left, and right pixel margin numbers of the element.
```javascript
{ top: <margin-top>, right: <margin-right>, bottom: <margin-bottom>, left: <margin-left> }
```


---
### [`$('selector').globalCSS [function]`](core.js#L139)
An upgrade from jQuery's $('selector').css; adds a cross-browser CSS property all in one go.

#### Justify

Add -webkit-, -moz-, -ms-, -o-, and standard all in one.

#### Usage

```javascript

// Will automatically add -webkit-animation, -moz-animation, -ms-animation, -o-animation
$('button').globalCSS({ animation: 'myanimation 1s forwards' })
```

#### Returns

Element(s) passed in.


---
### [`$('selector').rotate [function]`](core.js#L167)
Rotates an element with an optional animation.

#### Usage

Rotate `#my-div` 90 degrees with a smooth transition.

```javascript
$('#my-div').rotate({ degrees: 90, duration: 1000 });
```
Rotate `#my-div` and `#my-other-div` -70 degrees without a transition.
```javascript
$('#my-div, #my-other-div').rotate({ degrees: -70 });
```

#### Returns

Element(s) passed in.


---
### [`$('selector').isFilled [function]`](core.js#L204)
Check if an input or a set of inputs have text in them.

#### Returns

Type: `Boolean`


---
### [`$('selector').dumpCSS [function]`](core.js#L225)
Get all CSS for element

#### Returns

Type: `Object`

Strings of the CSS for the element(s) specified, with a chronological numeric index for each element.
```javascript
{ 0: 'width:10px;height:5px;', 1: 'background:green' }
```


---
### [`Core.setOptions [function]`](core.js#L251)
Merge two objects that may or may not overlap where the options override the default but the default are a fallback if an option wasn't set.

#### Usage

```javascript

Core.setOptions({ unsetOption: 'defaultValue', otherOption: 'defaultValue' }, { otherOption: 'set' })
```

#### Returns

Type: `Object`

```javascript
{ unsetOption: 'defaultValue', otherOption: 'set' }
```


---
### [`Core.addScript [function]`](core.js#L287)
Add a script to the DOM with a callback.

#### Usage

```javascript

Core.addScript({ src: 'myscript.js', callback: function() { console.log('Script '+src+' is ready!') } });
```

#### Returns

Type: `Element`

The script element that has been added.


---
### [`Core.isMobile [object]`](core.js#L319)
Detect if user is on a mobile device, and if so which device.

#### Usage

```javascript

Core.isMobile.any();
Core.isMobile.Android();
Core.isMobile.Blackberry();
Core.isMobile.iOS();
Core.isMobile.Opera();
Core.isMobile.Windows();
```

#### Returns

Type: `Array`

`null` or the device data for the mobile device being used.


---
### [`getParameter [function]`](core.js#L354)
Get a parameter from a URL. If no URL is passed, the current one is used.

#### Usage

Returns 'beagle'

```javascript
getParameter('dog', 'https://mydogs.net?dog=beagle');
```

#### Returns

Parameter value specified.


---
### [`setParameter [function]`](core.js#L377)
Set a query to the current URL.

#### Usage

Sets as 'https://mysite.com/?cat=siamese'

```javascript
setParameter('cat', 'siamese');
```
Set a parameter and refresh the page afterwards.
```javascript
setParameter('param', 'value', { refresh: true });
```

#### Options

##### `refresh`

Type: `Boolean` Default: `false`
Refresh the page after adding the parameter to the URL.

#### Returns

Type: `Object`

Contains `key` which is the parameter name, as well as its `value` and the new `url`


---
### [`getMS [function]`](core.js#L427)
Get the current time since last epoch in milliseconds.

#### Returns

Type: `Number`

MS since last epoch.


---
### [`random [function]`](core.js#L437)
Get random `Integer` with a specified ceiling and optional blacklist of numbers.

#### Usage

Get a random integer between 0-5000.

```javascript
random(5000);
```
Get a random integer between 0-10, EXCEPT 7, 8, or 9
```javascript
random(10, [7, 8, 9]);
```

#### Options

##### `blacklist`

Type: `Array` Required: `false`
An array of numbers that will be re-randomized if hit.

#### Returns

Random `Number`


---
### [`uncacheFile [function]`](core.js#L463)
Get a new file name with an uncaching query on the end.

#### Usage

```javascript

uncacheFile('file.js');
```

#### Returns

Type: `String`

The pre-existing file name with a randomized number as a query to prevent caching. For example:
```
file.js_?=4540647
```


---
### [`preload [function]`](core.js#L479)
Preload an array of images synchronously with a callback at the end.

#### Usage

Preload `landscape.png` with no callback.

```javascript
preload(['landscape.png']);
```
Preload `image.gif` and `sun.jpg` with a callback when the last one is done.
```javascript
preload(['image.gif', 'sun.jpg'], function(metadata) {
console.log('Images preloaded! Now they will be lagless when added to an element!');

// [ { src: 'image.gif', success: true, elapsed: 312 }, { src: 'sun.jpg', success: true, elapsed: 53 } ]
// Note: 'elapsed' in each index has a margin of error of about 3ms.
console.log(JSON.stringify(metadata));
});
```


---
### [`waitUntilThis [function]`](core.js#L523)
Wait until a specific condition happens. Make sure to wrap the condition in a function and a return statement so that the Boolean can be checked dynamically!

#### Usage

Run the callback when #entry is visible, and timeout after 5000ms.

```javascript
waitUntilThis({ condition: function() { return $('#entry').is(':visible') }, timeout: 5000, callback: function(metadata) {
console.log('Entry is now visible!');

// { success: true, elapsed: 189, checkGap: 5, timeout: 5000 }
console.log(JSON.stringify(metadata));
}})
```

#### Options

##### `condition`

Type: `Function` Required: `true` Example: `function() { return myBoolean == true }`
The condition to wait until. It must be a function with a return statement, not a boolean! If it is a boolean, the value will be passed through statically, and will never change!
##### `callback`
Type: `Function` Required: `true`
Function to run when operation in `condition` is `true`
##### `timeout`
Type: `Number` Required: `false` Default: `5000`
Time in milliseconds to abort the operation if `condition` is never satisfied.
##### `checkGap` Required: `false` Default: `5`
How frequently in milliseconds the condition is checked.


