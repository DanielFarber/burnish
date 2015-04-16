module.exports = {
	all: {},
	initiate: function(func, period, options){
		return {
			objective: func,
			start: start,
			stop: stop,
			mute: mute,
			unmute: unmute,
			period: period,
		};
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