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

function start(argument) {
	var relevantFunction = this.objective;
	setInterval(function(){
		relevantFunction(argument);
	}, this.period);
};

function stop() {};

function mute() {};

function unmute() {};