ng-text-truncate
================

This is a simple, but fully functional, directive for truncating text in angularjs apps. This directive not only truncates your text, but also permits the toggling of the hidden part of the truncated text.

If you are using ng-text-truncat in a project that already uses Twitter Boostrap, then the toggling elements (i.e. links with the texts "More" and "Less") shall inherit Bootstrap's styles for textual links. If you are not using Twitter Boostrap or if you would like to customize some aspect of the toggling elements, then your can write your own CSS for the class csTruncateToggleText.

Usage Instructions
==================

1. Include the JS file
----------------------

```html
<script src="ng-text-truncate.js"></script>
```

2. In your controller, set a text to some variable
--------------------------------------------------

```javascript
$scope.longText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla semper augue vel scelerisque egestas. Praesent odio lacus, porta vitae nisl a, semper tempor elit. Etiam fringilla ut nisl non dictum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis eros euismod, elementum tortor ut, sagittis felis. Nulla lectus ante, eleifend non felis pharetra, porta aliquet urna. Curabitur nec elit sit amet tortor accumsan volutpat sed vitae ante. Cras semper consequat nunc, in tincidunt dolor scelerisque eget. Morbi volutpat quis est bibendum aliquet. Sed euismod neque nisl, congue fermentum eros sagittis sit amet. Nulla at tincidunt nibh.";
```

3. Apply the directive to the element where you intend to put your text
-----------------------------------------------------------------------

Use the cs-truncate attribute to pass the variable holding your text. In the cs-truncate-threshould attribute you should indicate the maximum number of chars to be displayed before truncation. That is, any string bigger than cs-truncate-threshould will be truncated.

```html
<p cs-text-truncate
   cs-truncate="longText"
   cs-truncate-threshold="40"></p>
```

4. That's all folks
-------------------

Now open your HTML and I expect everything should be working as intended.
