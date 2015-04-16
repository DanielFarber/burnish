var chai = require("chai"),
		should = chai.should(),
		expect = chai.expect,
		interim = require("../index"),
		sinon = require("sinon");

describe("#interim", function(){

	it("is an object", function(){
		(interim instanceof Object).should.equal(true);
	});

	it("contains an object called all", function(){
		(interim.all instanceof Object).should.equal(true);
	});

	it("contains a function called initiate", function(){
		(interim.initiate instanceof Function).should.equal(true);
	});

});

describe("#initiate", function(){

	var initiate = interim.initiate;

	it("should return an object", function(){
		(initiate() instanceof Object).should.equal(true);
	});

	it("should accept a function as an argument", function(){
		(initiate(new Function) instanceof Object).should.equal(true);
	});

	it("should accept a second argument, either an object or an integer", function(){
		(initiate(new Function, {}) instanceof Object).should.equal(true);
		(initiate(new Function, 27) instanceof Object).should.equal(true);
	});

});

describe("#the_returned_object", function(){
	var returnedObject = interim.initiate(new Function);

	it("should have a function called start", function(){
		(returnedObject.start instanceof Function).should.equal(true);
	});

	it("should have a function called stop", function(){
		(returnedObject.stop instanceof Function).should.equal(true);
	});

	it("should have a function called mute", function(){
		(returnedObject.mute instanceof Function).should.equal(true);
	});

	it("should have a function called unmute", function(){
		(returnedObject.unmute instanceof Function).should.equal(true);
	});

	it("should have a key called 'objective' that stores the supplied function-argument", function(){
		function testFunc(){return true;}
		(interim.initiate(testFunc).objective).should.equal(testFunc);
	});

	it("should store the 'period' argument", function(){
		var testPeriod = 10;
		returnedObject = interim.initiate(new Function, testPeriod);
		(returnedObject.period).should.equal(testPeriod);
	});
});

describe("#start", function(){
	it("should start an interval that executes the function supplied in the argument", function()	{
		var testObject = [];
		var clock = sinon.useFakeTimers();
		function testFunc() {
			testObject.push("Glaben");
		}
		var interimObject = interim.initiate(testFunc, 30);
		interimObject.start();
		testObject.length.should.equal(0);
		clock.tick(25);
		testObject.length.should.equal(0);
		clock.tick(4);
		testObject.length.should.equal(0);
		clock.tick(1);
		testObject.length.should.equal(1);
	});
	//The last test can prove what this demonstrates and this test should
	//show that start() starts the interval (although there are a few other things that
	// should be in place first.)
	it("shouldn't interrupt the interval", function() {
		var testObject = [];
		var clock = sinon.useFakeTimers();
		function testFunc() {
			testObject.push("Glaben");
		}
		var interimObject = interim.initiate(testFunc, 30);
		interimObject.start();
		testObject.length.should.equal(0);
		clock.tick(30);
		testObject.length.should.equal(1);
		clock.tick(30);
		testObject.length.should.equal(2);
	});

	it("can pass its argument along to the function in the interval", function(){
		var testObject = [];
		var clock = sinon.useFakeTimers();
		function testFunction(arg) {
			testObject.push(arg);
		}
		var interimObject = interim.initiate(testFunction, 30);
		interimObject.start("Franks and Beans");
		testObject.length.should.equal(0);
		clock.tick(30);
		testObject.filter(function(string){
			return string === "Franks and Beans";
		}).length.should.equal(1);
	});

	it("can pass an unlimited amount of arguments", function(){
		var testObject = [];
		var clock = sinon.useFakeTimers();
		function testFunction(first, second, third) {
			testObject.push(first);
			testObject.push(second);
			testObject.push(third);
		}
		var interimObject = interim.initiate(testFunction, 30);
		interimObject.start("Franks", "and", "Beans");
		testObject.length.should.equal(0);
		clock.tick(30);
		testObject.join(" ").should.equal("Franks and Beans");
	});
});