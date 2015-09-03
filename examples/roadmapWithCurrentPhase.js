requirejs.config({
	baseUrl : '../src/js',
	shim : {
		"bootstrap" : { "deps" :['jquery'] }
	},
	paths: {
		jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min',
		bootstrap: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min',
		'samm-charts': 'https://raw.githubusercontent.com/qudosoft-labs/SAMMCharts/master/samm-charts.min'
	}
});

define(function (require) {
	"use strict";

	var SAMMCharts = require('samm-charts');
	require('bootstrap');

	var roadmap = new SAMMCharts.Roadmap({
		element: '#roadmap',
		phaseCount: 4,
		roadmap: {
			SM: [1,2,2,3,3,3],
			PC: [0,1,1,2,2,2],
			EG: [1,2,2,2,2,2],
			TA: [0,1,1,2,2,2],
			SR: [1,1,2,3,3,3],
			SA: [0,0,1,1,1,1],
			DR: [0,0,1,2,2,2],
			IR: [1,2,2,2,2,2],
			ST: [1,1,2,2,2,2],
			IM: [1,1,2,3,3,3],
			EH: [0,0,1,2,2,2],
			OE: [0,1,2,3,3,3]
		},
		alpha: 0.6,
		currentPhase: {
			phase: 2,
			levels: {
				SM: 1,
				PC: 1,
				EG: 2,
				TA: 1,
				SR: 1,
				SA: 0,
				DR: 0,
				IR: 1,
				ST: 2,
				IM: 1,
				EH: 0,
				OE: 1
			}
		}
	});
	roadmap.render();
});
