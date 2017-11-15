
# Contributing to MTR Datepicker

We will appreciate it if you want to support our project and contribute to make it better. You can read this file or refer to the official docs [here](http://mtrdesign.github.io/mtr-datepicker/docs.html#scrollspy-contribute). In order to change the source of the datepicker you have to install the following software to your PC or Mac:

- Node.js and npm
- Grunt
- Less

## Our guidelines
Please, if you want to contribute to our project be sure that your code comply with these guidelines:

- 2 spaces for indentation, not tabs please.
- Please check that your code will pass jshint code standards, grunt jshint will run this for you.
- Please ensure you're changing the individual files in /scripts or /styles/less, not the concatenated outputs in /dist directory
- Please keep pull requests concise, and document new functionality with jsdocs and usage docs
- Consider whether your changes are useful for all users

## How to build

### Get the source
To prepare your environment you should follow these simple steps First you need to fork our repository in GitHub and then clone it to your PC or Mac with the GitHub app for your platform or type the following command in your Terminal or CMD.

```bash
git clone https://github.com/[YOUR-USERNAME]/mtr-datepicker.git
```

*WARNING: Fix the url and place your username when you start cloning your forked repository.*

*NOTE: We don't obligate you to fork our repo. You can just download the code but if you want to submit your changes later it will be easy for you to send us a pull request. Because of this we suggest you to fork our repository.**


### Setup packages
Download the required development packages with npm. Just type the following command in your Terminal or CMD. It will take a while to download all of the packages so don't terminate it and be patient.

```bash
npm install
```

### Lets build the code
That's all, you are ready to make changes in the code. Probably you'll want to build the source and see in action the changes which you made. As we said in the beginning, the datepicker is build with Grunt and comes with a setup for this. Just type the following command in your Terminal or CMD and then open [http://localhost:8080/dev.html](http://localhost:8080/dev.html) in your browser.

```bash
grunt

Running "connect:server" (connect) task
Started connect web server on http://localhost:8080

Running "watch" task
Waiting...
```         

### Run the tests
Yup, the datepicker has some tests and it will be good to run them after finishing your changes, we don't want to break the build. So to run the test you just have to type the following command in your Terminal or CMD.

```bash
node_modules/karma/bin/karma start karma.conf.js --single-run
```

### Write some tests
If you want you can add more tests and increase the code coverage of the project, it will be great. We are using the Jasmine framework and running the tests on all supported browsers with the Karma runner. Everything is setuped and ready for use but if you are not familiar with writing tests with these tools we suggest you to read something about them before you start. 

When you write some tests you can check their execution on the following url [http://localhost:8080/tests/SpecRunner.html](http://localhost:8080/tests/SpecRunner.html).

*NOTE: Be sure that you have started the server with Grunt before trying to visit the web tests runner.*