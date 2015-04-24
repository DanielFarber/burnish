var chai = require("chai"),
		should = chai.should(),
		expect = chai.expect,
		burnish = require("../index"),
		sinon = require("sinon");

describe("#burnish", function(){

	it("is an object", function(){
		(burnish instanceof Object).should.equal(true);
	});

	it("contains an object called all", function(){
		(burnish.all instanceof Object).should.equal(true);
	});

	it("contains a function called initiate", function(){
		(burnish.initiate instanceof Function).should.equal(true);
	});

});

describe("#initiate", function(){

	it("should return an object", function(){
		(burnish.initiate() instanceof Object).should.equal(true);
	});

	it("should accept a function as an argument", function(){
		(burnish.initiate(new Function) instanceof Object).should.equal(true);
	});

	it("should accept a second argument, either an object or an integer", function(){
		(burnish.initiate(new Function, {}) instanceof Object).should.equal(true);
		(burnish.initiate(new Function, 27) instanceof Object).should.equal(true);
	});

	it("gives each returned object a new id", function(){
		var firstObject = burnish.initiate(new Function, 10);
		var secondObject = burnish.initiate(new Function, 11);
		firstObject.id.should.not.equal(secondObject.id);
	});

});

describe("#the_returned_object", function(){
	var returnedObject = burnish.initiate(new Function);

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
		(burnish.initiate(testFunc).objective).should.equal(testFunc);
	});

	it("should store the 'period' argument", function(){
		var testPeriod = 10;
		returnedObject = burnish.initiate(new Function, testPeriod);
		(returnedObject.period).should.equal(testPeriod);
	});

	it("has an 'id' attribute which is an integer, like a primary key", function(){
		var testPeriod = 10;
		returnedObject = burnish.initiate(new Function, testPeriod);
		(typeof returnedObject.id).should.equal('number');
	});
});

describe("#start", function(){
	it("should start an interval that executes the function supplied in the argument to #initiate", function()	{
		var testObject = [];
		var clock = sinon.useFakeTimers();
		function testFunc() {
			testObject.push("Glaben");
		}
		var interimObject = burnish.initiate(testFunc, 30);
		interimObject.start();
		testObject.length.should.equal(0);
		clock.tick(25);
		testObject.length.should.equal(0);
		clock.tick(4);
		testObject.length.should.equal(0);
		clock.tick(1);
		testObject.length.should.equal(1);
	});

	it("shouldn't interrupt the interval", function() {
		var testObject = [];
		var clock = sinon.useFakeTimers();
		function testFunc() {
			testObject.push("Glaben");
		}
		var interimObject = burnish.initiate(testFunc, 30);
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
		var interimObject = burnish.initiate(testFunction, 30);
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
		var interimObject = burnish.initiate(testFunction, 30);
		interimObject.start("Franks", "and", "Beans");
		testObject.length.should.equal(0);
		clock.tick(30);
		testObject.join(" ").should.equal("Franks and Beans");
	});
});

describe("#burnish.all", function(){
	it("stores the ids of all initiated objects", function(){
		var returnedObject = burnish.initiate(new Function, 10);
		(burnish.all[returnedObject.id]).should.not.be.undefined;
	});
	

});


