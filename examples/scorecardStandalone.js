$(document).ready(function() {
	var scorecard = new SAMMCharts.Scorecard({
		element: '#scorecard',
		scores: {
			governance: [0.5, 0, 2],
			construction: [0, 0.5, 0],
			verification: [0.5, 1.5, 0],
			operations: [0, 0.5, 3]
		}
	});
	scorecard.render();
});