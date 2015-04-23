module.exports = {
	all: {},
	initiate: function(func, period, options){
		var newInterimObject = {
			objective: func,
			start: start,
			stop: stop,
			mute: mute,
			unmute: unmute,
			period: period,
			id: 0,
		};
		newInterimObject.id = Object.keys(this.all).length;
		this.all[newInterimObject.id]	= {};
		return newInterimObject;
	},
};

function start() {
	var relevantFunction = this.objective;
	var argumentString = "relevantFunction("
	var argumentArray = [],
			args = [];
	for (var i = 0; i < arguments.length; i++) {
		argumentArray.push("args[" + i + "]");
		args.push(arguments[i]);
	}
	argumentString += argumentArray.join(", ") + (")");
	setInterval(function(){
		eval(argumentString);
	}, this.period);
};

function stop() {};

function mute() {};

function unmute() {};