# Vanilla TOC

Table of contents with vanilla javascript.

Once I wanted to generate simple index for html formatted document. Just that. Highlighting active section and maybe hiding inactive sections would be nice.

I learned that it's called Table of contents and I need `40-pound jQuery file and 83 polyfills`¹ for that. And also Bootstrap, jQuery UI and some additional css files. Thank you very much. Not-long-ago downloading all that crap would take longer than writing the code yourself.

So I wrote it myself, with help of famous [Vanilla JS](http://vanilla-js.com/) framework.

## Use

```html
<script src="vanilla.toc.js"></script>
<link href="vanilla.toc.css" rel="stylesheet">
```

Then:

```javascript
vanillatoc(document.getElementById('myTocElement'))
```

¹ courtesy of http://motherfuckingwebsite.com/
