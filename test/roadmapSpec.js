define(['jquery', 'samm-charts', 'imagediff', 'imagediff-matchers'], function ($j, SAMMCharts, imagediff, matchers) {

	describe("SAMMCharts Roadmap", function () {
		var validRoadmap = {
			SM: [1],
			PC: [0],
			EG: [1],
			TA: [0],
			SR: [1],
			SA: [0],
			DR: [0],
			CR: [1],
			ST: [1],
			VM: [1],
			EH: [3],
			OE: [2]
		};
		var validPhaseCount = 1;
		var validElement = "#roadmap";
		var validConfig = {roadmap: validRoadmap, element: validElement, phaseCount: validPhaseCount};
		var tolerance = 2;

		describe("configuration", function () {

			using("configuration",
				[
					{},
					{roadmap: validRoadmap},
					{element: validElement},
					{phaseCount: validPhaseCount},
					{phaseCount: validPhaseCount, roadmap: validRoadmap},
					{phaseCount: validPhaseCount, element: validElement},
					{roadmap: validRoadmap, element: validElement}

				], function (config) {
					it("constructor should throw error for missing mandatory configuration parameters", function () {
						expect(function () {
							new SAMMCharts.Roadmap(config);
						}).toThrow();
					});
				}
			);

			it("constructor shouldn't throw error if all mandatory configuration parameters exist", function () {
				expect(function () {
					new SAMMCharts.Roadmap(validConfig);
				}).not.toThrow();
			});

			using("phaseCount", [-1, 0.4], function (phaseCount) {
				it("constructor should throw error if phase count is invalid", function () {
					expect(function () {
						new SAMMCharts.Roadmap({
							"phaseCount": phaseCount,
							roadmap: validRoadmap,
							element: validElement
						});
					}).toThrow(new Error("Phase count has to be an Integer greater 0"));
				});
			});

			it("constructor should throw error if roadmap phase count is smaller than phaseCount", function () {
				expect(function () {
					new SAMMCharts.Roadmap({phaseCount: 2, roadmap: validRoadmap, element: validElement})
				}).toThrow(new Error("Wrong number of phases for 'SM' (Strategy & Metrics) roadmap. Expected phase count is 2. Actual roadmap: [1]"));
			});

			using("roadmap", [{SM: [1.5]}, {SM: [-1]}, {SM: [4]}], function (invalidRoadmap) {
				it("constructor should throw error if roadmap phase level is invalid", function () {
					expect(function () {
						new SAMMCharts.Roadmap({phaseCount: 1, roadmap: invalidRoadmap, element: validElement})
					}).toThrow(new Error("Level value of phase 1 for practice 'SM' must be an Integer between 1 and 3. Found: " + invalidRoadmap.SM));
				});
			});

			it("constructor should set default value for alpha", function () {
				var roadmap = new SAMMCharts.Roadmap(validConfig);
				expect(roadmap.alpha).toBe(0.7);
			});

			it("config paramater should set  value for alpha", function () {
				var expectedAlpha = 0.5;
				var roadmap = new SAMMCharts.Roadmap({
					roadmap: validRoadmap,
					element: validElement,
					phaseCount: validPhaseCount,
					alpha: expectedAlpha
				});
				expect(roadmap.alpha).toBe(expectedAlpha);
			});

			it("constructor should set default value for displayEfforts", function () {
				var roadmap = new SAMMCharts.Roadmap(validConfig);
				expect(roadmap.displayEfforts).toBeTruthy();
			});

			it("config paramater should set value for displayEfforts", function () {
				var expectedDisplayEfforts = false;
				var roadmap = new SAMMCharts.Roadmap({
					roadmap: validRoadmap,
					element: validElement,
					phaseCount: validPhaseCount,
					displayEfforts: expectedDisplayEfforts
				});
				expect(roadmap.displayEfforts).toBeFalsy();
			});


		});

		// These tests will only work for firefox as text in canvas is rendered differently in each browser
		// Expected outcome images were taken in firefox.
		// We could eventually implement a toImageDiffEquals() with tolerance not to be per pixel but for all pixels.
		describe("canvas", function() {

			beforeEach(function () {
				jasmine.addMatchers(matchers);
				loadFixtures('roadmap.html');
			});

			var loadImage = function(src, done) {
				var img = new Image();
				img.onload = function() {
					done();
				};
				img.src = src;
				return img;
			};

			describe("render", function() {
				var expected;

				beforeEach(function (done) {
					expected = loadImage("base/test/img/onePhaseWithEfforts.png", done);
				});

				it("should display single phase", function () {

					var roadmapElementId = "#roadmap";
					var roadmap = new SAMMCharts.Roadmap({roadmap: validRoadmap, element: roadmapElementId, phaseCount: validPhaseCount});
					roadmap.render();

					var canvas = $j('.roadmapCanvas').get(0);
					var actual = canvas.getContext('2d').getImageData(0,0,canvas.width, canvas.height);

					expect(actual).toImageDiffEqual(expected, tolerance);
				});
			});


			describe("render", function() {
				var expected;

				beforeEach(function (done) {
					expected = loadImage("base/test/img/multiplePhases.png", done);
				});

				it("should display multiple phase", function () {

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
							CR: [1,2,2,2,2,2],
							ST: [1,1,2,2,2,2],
							VM: [1,1,2,3,3,3],
							EH: [0,0,1,2,2,2],
							OE: [0,1,2,3,3,3]
						},
						alpha: 0.75,
						phasesSummaryElement: "#phaseDetails"
					});
					roadmap.render();

					var canvas = $j('.roadmapCanvas').get(0);
					var actual = canvas.getContext('2d').getImageData(0,0,canvas.width, canvas.height);

					expect(actual).toImageDiffEqual(expected, tolerance);
				});

			});

			describe("render", function() {
				var expected;

				beforeEach(function (done) {
					expected = loadImage("base/test/img/onePhaseWithoutEfforts.png", done);
				});

				it("should not display efforts if set to false", function () {

					var roadmapElementId = "#roadmap";
					var roadmap = new SAMMCharts.Roadmap({
						roadmap: validRoadmap,
						element: roadmapElementId,
						phaseCount: validPhaseCount,
						displayEfforts: false
					});
					roadmap.render();

					var canvas = $j('.roadmapCanvas').get(0);
					var actual = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
					expect(actual).toImageDiffEqual(expected, tolerance);
				});
			});
		});
	});
});
