# mtr-datepicker [![Build Status](https://travis-ci.org/mtrdesign/mtr-datepicker.svg?branch=master)](https://travis-ci.org/mtrdesign/mtr-datepicker) [![Coverage Status](https://coveralls.io/repos/mtrdesign/mtr-datepicker/badge.svg?branch=master&service=github)](https://coveralls.io/github/mtrdesign/mtr-datepicker?branch=master) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
The pure JavaScript ultimate datepicker

<p align="center">
  <a href="http://mtrdesign.github.io/mtr-datepicker/" target="_blank">
    <img src="https://raw.githubusercontent.com/mtrdesign/mtr-datepicker/gh-pages/images/mtr-datepicker-screen.png" alt="MTR Datepicker - Screen"/>
  </a>
</p>

## About

MTR Datepicker is a library written in pure JavaScript which allows you to create great looking and lightweight datepickers for you web apps. It is supported by all of the modern internet browsers and comes with a few customizable themes.

Use these docs to learn how to use it or if you need more details go to the official [Documentation](http://mtrdesign.github.io/mtr-datepicker/docs.html). If you are interested in that "How it is made?" you can check the [jsdocs](http://mtrdesign.github.io/mtr-datepicker/docs/MtrDatepicker.html) or directly dive into the [code](https://github.com/mtrdesign/mtr-datepicker/blob/master/scripts/mtr-datepicker.js). We appreciate your feedback so you can contact us aways in the [issues](https://github.com/mtrdesign/mtr-datepicker/issues) section. And don't forget to check the [Contributions guide](http://mtrdesign.github.io/mtr-datepicker/docs.html#scrollspy-contribute), maybe you can help us to make the datepicker better.

## Demo

A simple preview of the datepicker is available [here](http://mtrdesign.github.io/mtr-datepicker/demo.html). You can customize the datepicker and make it works the way you want.

## Documentation

###Installation

#### Get the code
There are two possible ways to include the mtr-datepicker library in your project. You can download the latest stable release form the official site and include it in your templates. 

Or if you prefer to be up-to-date with our latest releases with a package manager you can use Bower, just type in your Terminal or CMD the following command:

```bash
bower install --save mtr-datepicker
```

Or if you are an NPM fan you can use it to install the lib

```
npm install --save mtr-datepicker
```

#### Load the library
First you need to load the styles of the datepicker. Put the following lines in the head section of your html file or template:

```html
<link rel="stylesheet" type="text/css" href="dist/mtr-datepicker.min.css">
<link rel="stylesheet" type="text/css" href="dist/mtr-datepicker.default-theme.min.css">
```

Then you should load the JavaScript, we suggest you to put the lines at the bottom of the body section of your html file or template. That is all, now you are ready to initialize your first datepicker.

```html
<script type="text/javascript" src="dist/mtr-datepicker.min.js"></script>
```

### How to use
To use the loaded scripts just add an element with specific id to your html and then tell the library to make it a datepicker. Here is a simple example:

```html
<div id="first-mtr-datepicker"></div>

<script>
  var config = {
    target: 'first-mtr-datepicker'
  };
  var myDatepicker = new MtrDatepicker(config);
</script>
```

You can use more advanced datepickers and customize their behavior. 
To learn how, you should go and read more from the [API](http://mtrdesign.github.io/mtr-datepicker/docs.html#scrollspy-api) section of the docs.



## Contribute

We will appreciate it if you want to support our project and contribute to make it better. 
You can read our [Contributions guide](http://mtrdesign.github.io/mtr-datepicker/docs.html#scrollspy-contribute) in the official docs or go to the [CONTRIBUTING.md](https://github.com/mtrdesign/mtr-datepicker/blob/master/CONTRIBUTING.md) file here in GitHub.

## License
MTR Datepicker is open source and available under the GPL license.
