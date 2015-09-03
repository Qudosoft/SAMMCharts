
/**
 @license
 Copyright 2015 Qudosoft GmbH & Co. KG

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
(function(root, factory) {
	"use strict";

	if (typeof define === 'function' && define.amd) {
		// [1] AMD anonymous module
		define(['jquery'], factory);
	} else if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
		// [2] CommonJS/Node.js
		module.exports = factory(require("jquery"));
	} else {
		// [3] No module loader (plain <script> tag) - put directly in global namespace
		root.SAMMCharts = factory(root.jQuery);
	}
})(this, function($, undefined) {
	"use strict";

	if (!String.prototype.format) {
		String.prototype.format = function() {
			var args = arguments;
			return this.replace(/{(\d+)}/g, function(match, number) {
				return typeof args[number] != 'undefined'
					? args[number]
					: match
					;
			});
		};
	}

	var model = {
		categories: [
			{category: "G", name: "Governance", img: "G.png", href: "https://www.owasp.org/index.php/SAMM_-_Governance", color: "lightblue", color_dark: "#014E6C",  practices: [
				{practice: "SM", name: "Strategy & Metrics", img: "SM.png", href: "https://www.owasp.org/index.php/SAMM_-_Governance#Strategy_.26_Metrics" , baseHref: "https://www.owasp.org/index.php/SAMM_-_Strategy_%26_Metrics",
					activities: [
						["A. Estimate overall business risk profile", "B. Build and maintain assurance program roadmap"],
						["A. Classify data and applications based on business risk", "B. Establish and measure per-classification security goals"],
						["A. Conduct periodic industry-wide cost comparisons", "B. Collect metrics for historic security spend"]]
				},
				{practice: "PC", name: "Policy & Compliance", img: "PC.png", href: "https://www.owasp.org/index.php/SAMM_-_Governance#Policy_.26_Compliance", baseHref: "https://www.owasp.org/index.php/SAMM_-_Policy_%26_Compliance",
					activities: [
						["A. Identify and monitor external compliance drivers", "B. Build and maintain compliance guidelines"],
						["A. Build policies and standards for security and compliance", "B. Establish project audit practice"],
						["A. Create compliance gates for projects", "B. Adopt solution for audit data collection"]]
				},
				{practice: "EG", name: "Education & Guidance", img: "EG.png", href: "https://www.owasp.org/index.php/SAMM_-_Governance#Education_.26_Guidance", baseHref: "https://www.owasp.org/index.php/SAMM_-_Education_%26_Guidance",
					activities: [
						["A. Conduct technical security awareness training", "B. Build and maintain technical guidelines"],
						["A. Conduct role-specific application security training", "B. Utilize security coaches to enhance project teams"],
						["A. Create formal application security support portal", "B. Establish role-based examination/certification"]
					]
				}
			] },
			{category: "C", name: "Construction", img: "C.png", href: "https://www.owasp.org/index.php/SAMM_-_Construction", color: "peru", color_dark: "#6B3416", practices: [
				{practice: "TA", name: "Threat Assessment", img: "TA.png", href: "https://www.owasp.org/index.php/SAMM_-_Construction#Threat_Assessment", baseHref: "https://www.owasp.org/index.php/SAMM_-_Threat_Assessment",
					activities: [
						["A. Build and maintain application-specific threat models", "B. Develop attacker profile from software architecture"],
						["A. Build and maintain abuse-case models per project", "B. Adopt a weighting system for measurement of threats"],
						["A. Explicitly evaluate risk from third-party components", "B. Elaborate threat models with compensating controls"]
					]
				},
				{practice: "SR", name: "Security Requirements", img: "SR.png", href: "https://www.owasp.org/index.php/SAMM_-_Construction#Security_Requirements", baseHref: "https://www.owasp.org/index.php/SAMM_-_Security_Requirements",
					activities: [
						["A. Derive security requirements from business functionality", "B. Evaluate security and compliance guidance for requirements"],
						["A. Build an access control matrix for resources and capabilities", "B. Specify security requirements based on known risks"],
						["A. Build security requirements into supplier agreements", "B. Expand audit program for security requirements"]
					]
				},
				{practice: "SA", name: "Secure Architecture", img: "SA.png", href: "https://www.owasp.org/index.php/SAMM_-_Construction#Security_Architecture", baseHref: "https://www.owasp.org/index.php/SAMM_-_Secure_Architecture",
					activities: [
						["A. Maintain list of recommended software frameworks", "B. Explicitly apply security principles to design"],
						["A. Identify and promote security services and infrastructure", "B. Identify security design patterns from architecture"],
						["A. Establish formal reference architectures and platforms", "B. Validate usage of frameworks, patterns, and platforms"]
					]
				}
			] },
			{category: "V", name: "Verification", img: "V.png", href: "https://www.owasp.org/index.php/SAMM_-_Verification", color: "darkseagreen", color_dark: "#116D37", practices: [
				{practice: "DR", name: "Design Review", img: "DR.png", href: "https://www.owasp.org/index.php/SAMM_-_Verification#Design_Review", baseHref: "https://www.owasp.org/index.php/SAMM_-_Design_Review",
					activities: [
						["A. Identify software attack surface", "B. Analyze design against known security requirements"],
						["A. Inspect for complete provision of security mechanisms", "B. Deploy design review service for project teams"],
						["A. Develop data-flow diagrams for sensitive resources", "B. Establish release gates for design review"]
					]
				},
				{practice: "IR", name: "Implementation Review", img: "IR.png", href: "https://www.owasp.org/index.php/SAMM_-_Verification#Implementation_Review", baseHref: "https://www.owasp.org/index.php/SAMM_-_Implementation_Review",
					activities: [
						["A. Create review checklists from known security requirements", "B. Perform point-review of high-risk code"],
						["A. Utilize automated code analysis tools", "B. Integrate code analysis into development process"],
						["A. Customize code analysis for application-specific concerns", "B. Establish release gates for code review"]
					]
				},
				{practice: "ST", name: "Security Testing", img: "ST.png", href: "https://www.owasp.org/index.php/SAMM_-_Verification#Security_Testing", baseHref: "https://www.owasp.org/index.php/SAMM_-_Security_Testing",
					activities: [
						["A. Derive test cases from known security requirements", "B. Conduct penetration testing on software releases"],
						["A. Utilize automated security testing tools", "B. Integrate security testing into development process"],
						["A. Employ application-specific security testing automation", "B. Establish release gates for security testing"]
					]
				}
			] },
			{category: "O", name: "Operations", img: "O.png", href: "https://www.owasp.org/index.php/SAMM_-_Operations", color: "indianred", color_dark: "#6C0F14", practices: [
				{practice: "IM", name: "Issue Management", img: "IM.png", href: "https://www.owasp.org/index.php/SAMM_-_Operations#Issue_Management", baseHref: "https://www.owasp.org/index.php/SAMM_-_Issue_Management",
					activities: [
						["A. Identify point of contact for security issues", "B. Create informal security response team(s)"],
						["A. Establish consistent incident response process", "B. Adopt a security issue disclosure process"],
						["A. Conduct root cause analysis for incidents", "B. Collect per-incident metrics"]
					]
				},
				{practice: "EH", name: "Environment Hardening", img: "EH.png", href: "https://www.owasp.org/index.php/SAMM_-_Operations#Environment_Hardening", baseHref: "https://www.owasp.org/index.php/SAMM_-_Environment_Hardening",
					activities: [
						["A. Maintain operational environment specification", "B. Identify and install critical security upgrades and patches"],
						["A. Establish routine patch management process", "B. Monitor baseline environment configuration status"],
						["A. Identify and deploy relevant operations protection tools", "B. Expand audit program for environment configuration"]
					]
				},
				{practice: "OE", name: "Operational Enablement", img: "OE.png", href: "https://www.owasp.org/index.php/SAMM_-_Operations#Operational_Enablement", baseHref: "https://www.owasp.org/index.php/SAMM_-_Operational_Enablement",
					activities: [
						["A. Capture critical security information for deployment", "B. Document procedures for typical application alerts"],
						["A. Create per-release change management procedures", "B. Maintain formal operational security guides"],
						["A. Expand audit program for operational information", "B. Perform code signing for application components"]
					]
				}
			] }
		]
	};
	var baseImgURL = "http://www.opensamm.org/badges/small/";
	var imgSuffix = "";

	var SAMMCharts = {

		imgURLBase: baseImgURL,
		imgURLSuffix:  imgSuffix,

		namespace: function(namespace) {
			var parts = namespace.split('.');

			var parent = SAMMCharts;

			for(var i = 1, length = parts.length; i < length; i++) {
				var currentPart = parts[i];
				parent[currentPart] = parent[currentPart] || {};
				parent = parent[currentPart];
			}
			return parent;
		},

		getImgURL: function(img) {
			if(typeof img === 'undefined') {
				throw new Error('Missing image parameter.');
			}
			return this.imgURLBase + img + this.imgURLSuffix;
		},
		
		resetImgURL: function () {
			this.imgURLBase = baseImgURL;
			this.imgURLSuffix = imgSuffix;
		}
	};

	SAMMCharts.namespace('SAMMCharts.Scorecard');

	/*  ============================
	 *  =    SAMM 1.0 Scorecard    =
	 *  ============================
	 */
	SAMMCharts.Scorecard = function(args) {

		var self = this;

		var templates =  {
			header: '<table cellspacing="0" cellpadding="0"><thead><tr align="center"><th>Practices / Levels</th><th style="width: {0}px;">0</th><th style="width: {0}px;">0+</th><th style="width: {0}px;">1</th><th style="width: {0}px;">1+</th><th style="width: {0}px;">2</th><th style="width: {0}px;">2+</th><th style="width: {0}px;">3</th></tr></thead></table>'.format(50),
			category: '<tr style="background-color: lightgrey;"><td><a href="{0}"><img alt="{1}" src="{2}" width="200px" /></a></td><td colspan="8"></td></tr>',
			practice: '<tr style="background-color: {0}; height: 30px;"><td align="center"><div><a href="{1}" style="text-decoration: none; color:black;" target="_blank">{2}</a></div> </td>'
		};

		var regularBarColor = "#EEE";

		this.initialize = function(args) {
			if (!args.element) throw new Error("SAMMCharts Scorecard needs an element selector");
			if (!args.scores) throw new Error("SAMMCharts Scorecard needs a score object");

			this.element = args.element;
			this.scores = args.scores;

			this.validateScores(args.scores)
		};

		this.render = function() {
			var element = $(self.element);
			element.append(templates.header);
			var table = $(self.element + " table");
			$.each(model.categories, function (i, category) {

				table.append(templates.category.format(category.href, category.name, SAMMCharts.getImgURL(category.img)));

				var practicesRows = "";
				$.each(category.practices, function (j, practice) {
					practicesRows += templates.practice.format(regularBarColor, practice.href, practice.name);

					var translatedScore = self.scores[category.name.toLowerCase()][j] * 2 + 1;

					practicesRows += new Array(translatedScore + 1).join('<td style="background-color: {0}"></td>'.format(category.color_dark));
					practicesRows += new Array(8 - translatedScore + 1).join('<td></td>');
					practicesRows += '</tr>';
				});
				table.append(practicesRows);
			});
		};

		this.validateScores = function(scores) {

			if (!(scores instanceof Object)) {
				throw new Error("scores is not an object: {0}".format(scores));
			}

			var expectedProperties = ['governance', 'construction', 'verification', 'operations'];

			expectedProperties.forEach(function (v, i) {
				var score = scores[v];
				if (!score) {
					throw new Error("scores is missing {0}: {1}".format(v, JSON.stringify(scores)));
				}
				if(!Array.isArray(score)){
					throw new Error("'{0}' scores is not an array: {1}".format(v, JSON.stringify(score)));
				}
				if (score.length != 3) {
					throw new Error("'{0}' scores must have exactly 3 entries. Actual count: {1}".format(v, score.length));
				}

				score.forEach(function (practiceScore, j) {
					if (typeof practiceScore != 'number' || practiceScore < 0 || practiceScore > 3) {
						throw new Error("{0} scores contains invalid score value(s). Allowed values are numbers between 0 and 3. Actual values: {1}".format(v, JSON.stringify(score)));
					}
					if(practiceScore % 0.5 != 0) {
						throw new Error("{0} scores contains invalid score value(s). Allowed values are integers or .5 doubles. Actual values: {1}".format(v, JSON.stringify(score)));
					}
				});
			});
		};

		this.initialize(args);
	};

	SAMMCharts.namespace('SAMMCharts.Roadmap');

	SAMMCharts.Roadmap = function(args) {
		var self = this;

		this.initialize = function(args) {
			if (!args.element) throw new Error("SAMMCharts Roadmap needs an element selector");
			if (typeof args.phaseCount === 'undefined') throw new Error("SAMMCharts Roadmap needs a phaseCount");
			if (!args.roadmap) throw new Error("SAMMCharts Roadmap needs a roadmap object");

			this.element = args.element;
			this.phasesSummaryElement = args.phasesSummaryElement || undefined;
			this.phaseCount = args.phaseCount;
			this.roadmap = args.roadmap;

			_validatePhaseCount();
			_validateRoadmap();

			this.alpha = (typeof args.alpha === 'undefined') ? 0.7 : args.alpha;
			this.displayEfforts = (typeof args.displayEfforts === 'undefined') ? true : args.displayEfforts;

			args.currentPhase = args.currentPhase || {};
			this.currentPhase = args.currentPhase.phase;
			this.currentLevels = args.currentPhase.levels || {};
			if(typeof this.currentPhase != "undefined") {
				_validateCurrentPhase();
				_validateCurrentLevels();
			}

			this.practiceWidth = 129;
			this.practicePadding = 10;
			this.phaseWidth = 30;
			this.levelHeight = 15;
			this.phaseHeaderHeight = 12;
			this.phaseHeaderPadding = 5;
			this.effortsPaddingTop = 5;

			this.practiceLabelWidth = this.practiceWidth + this.practicePadding;
			this.rulerLeftWidth = Math.floor((this.phaseWidth * 2) / 3);
			this.rulerRightWidth = Math.floor(this.phaseWidth / 2);


			args.fonts = args.fonts || {};
			args.fonts.phases = args.fonts.phases || {};
			args.fonts.practices = args.fonts.practices || {};
			args.fonts.efforts = args.fonts.efforts || {};
			this.fonts = {
				phases: {
					size: args.fonts.phases.size || "10",
					font: args.fonts.phases.font || "Arial",
					style: args.fonts.phases.style || "italic"
				},
				practices: {
					size: args.fonts.practices.size || "10",
					font: args.fonts.practices.font || "Arial",
					style: args.fonts.practices.style || "bold"
				},
				efforts: {
					size: args.fonts.efforts.size || "11",
					font: args.fonts.efforts.font || "Arial",
					style: args.fonts.efforts.style || "bold"
				}
			};

			args.colors = args.colors || {};
			this.colors = {
				header: args.colors.header || "#000",
				arrow: args.colors.arrow || "#AAA",
				ruler: args.colors.ruler || "#ADADAD",
				barLight: args.colors.barLight || "#F3F3F3",
				barRegular: args.colors.barRegular || "#EEE",
				barDark: args.colors.barDark|| "#DDD"
			};
		};

		var _validatePhaseCount = function () {
			if (self.phaseCount < 1 || self.phaseCount % 1 != 0) throw new Error ("Phase count has to be an Integer greater 0");
		};

		var _validateRoadmap = function () {
			if (!(self.roadmap instanceof Object)) {
				throw new Error("Roadmap is not an object: {0}".format(self.roadmap));
			}
			model.categories.forEach(function(category,i){
				category.practices.forEach(function(practice,j){
					var practiceRoadmap = self.roadmap[practice.practice];
					if(!practiceRoadmap) {
						throw new Error("Missing roadmap entry for practice '{0}' ({1}). Roadmap is: {2}".format(practice.practice, practice.name, JSON.stringify(self.roadmap)));
					}
					if(!Array.isArray(practiceRoadmap)){
						throw new Error("Roadmap for '{0}' ({1}) is not an array: {2}".format(practice.practice, practice.name, JSON.stringify(practiceRoadmap)));
					}
					if(practiceRoadmap.length < self.phaseCount) {
						throw new Error("Wrong number of phases for '{0}' ({1}) roadmap. Expected phase count is {2}. Actual roadmap: {3}".format(practice.practice, practice.name, self.phaseCount, JSON.stringify(practiceRoadmap)));
					}
					var lastLevel = 0;
					practiceRoadmap.forEach(function(level, k){
						if(Number(level) !== level || level % 1 !== 0 || level < 0 || level > 3){
							throw new Error("Level value of phase {1} for practice '{2}' must be an Integer between 1 and 3. Found: {0}".format(JSON.stringify(level), k+1, practice.practice));
						}
						if(level < lastLevel) {
							throw new Error("Level of phase {0} for practice '{1}' must be greater or equal than level of previous phase. Found: {2}".format(k+1, practice.practice, JSON.stringify(practiceRoadmap)));
						}
						lastLevel = level;
					});
				});
			});
		};

		var _validateCurrentPhase = function () {
			if(self.currentPhase < 1 || self.currentPhase > self.phaseCount) {
				throw new Error("Current phase must be between 1 and {1}: Found: {0}".format(self.currentPhase, self.phaseCount));
			}
		};

		var _validateCurrentLevels = function () {
			if (!(self.currentLevels instanceof Object)) {
				throw new Error("current levels is not an object: {0}".format(self.currentLevels));
			}
			model.categories.forEach(function(category,i) {
				category.practices.forEach(function (practice, j) {
					var level = self.currentLevels[practice.practice];
					if (typeof level === 'undefined') {
						throw new Error("Missing level entry for practice '{0}' ({1}). Levels are: {2}".format(practice.practice, practice.name, JSON.stringify(self.currentLevels)));
					}
					if(Number(level) !== level || level % 1 !== 0 || level < 0 || level > 3){
						throw new Error("Level value of phase {1} for practice '{2}' must be an Integer between 1 and 3. Found: {0}".format(JSON.stringify(level), k+1, practice.practice));
					}
				});
			});
		};


		this.render = function() {

			this.canvas = _initCanvas();

			if (this.canvas[0].getContext) {
				this.ctx = this.canvas[0].getContext('2d');
				this.ctx.translate(0.5, 0.5);
			}
			else {
				throw new Error("Error setting up 2D context for canvas: " + this.canvas);
			}

			_renderPhaseHeaders();
			_renderPhaseBars();
			_renderPracticeRoadmaps();
			if (self.currentPhase) _renderCurrentPhaseLine();
			if (self.displayEfforts) _renderPhaseEfforts();

		};

		this.renderPhaseSummaries = function(){
			if(!this.phasesSummaryElement) throw new Error("Missing configuration parameter 'phaseElement'");
			for(var i = 0; i < this.phaseCount; i++) {
				var phaseSummary = '<h3>Phase {0} Details</h3><div>{1}</div>'.format(i+1, _getPhaseActivities(i+1));
				$(this.phasesSummaryElement).append(phaseSummary);
			}
		};

		this.renderPhaseSummary = function(phase, element){
			$(element).append(_getPhaseActivities(phase));
		};

		var _getPhaseActivities = function(phase) {
			if(phase > self.phaseCount || phase < 0 ) {
				throw new Error("Phase number has to be > 0 and < " + self.phaseCount);
			}

			var activities = [];
			$.each(model.categories, function (index, category) {
				$.each(category.practices, function (index, practice) {
					var phaseIndex = (phase - 1);
					var practiceLevel = self.roadmap[practice.practice][phaseIndex];
					if(practiceLevel< 1) return true;
					if(phase > 1) {
						var previousPracticeLevel = self.roadmap[practice.practice][phaseIndex-1];
						if (practiceLevel === previousPracticeLevel) return true;
					}
					var levelImageURL = SAMMCharts.getImgURL(practice.practice + practiceLevel + '.png');
					var levelURL = practice.baseHref + '_-_' + practiceLevel;
					activities = activities.concat('<div style="overflow: hidden; margin:2px;"><div style="float: left;height: 40px;"><span style="display: inline-block;height: 100%; vertical-align: middle;"></span><a href="' + levelURL + '" target="_blank" style="vertical-align: middle;"><img src="' + levelImageURL+'" alt="'+practice.name+'" width="75" style="vertical-align: middle;"/></a></div><div style="float: left; padding-left: 10px"><small>'+practice.activities[practiceLevel-1].join('<br/>')+'</small></div></div>');
				});
			});
			return activities.join('');
		};

		var _initCanvas = function() {
			var phasesWidth =  self.phaseCount * 2 * self.phaseWidth;
			var width = self.practiceLabelWidth + self.rulerLeftWidth + phasesWidth + self.rulerRightWidth;
			var height = _calculateCanvasHeight();

			var canvas = $('<canvas class="roadmapCanvas" width="{0}" height="{1}" style="image-rendering: optimizeSpeed; image-rendering: -moz-crisp-edges; image-rendering: -webkit-optimize-contrast; image-rendering: optimize-contrast; -ms-interpolation-mode: nearest-neighbor;"/>'.format(width, height));
			$(self.element).append(canvas);

			return canvas;
		};

		var _calculateCanvasHeight = function(){
			self.phasesHeaderTotalHeight = self.phaseCount * (self.phaseHeaderHeight + self.phaseHeaderPadding);
			self.activitiesHeight = 4 * self.levelHeight * 12;
			self.effortHeight = self.levelHeight * 4/3;

			return self.phasesHeaderTotalHeight + self.activitiesHeight + self.effortHeight;
		};

		var _renderPhaseHeaders = function() {
			for(var i = 0; i <self.phaseCount; i++) {
				_renderPhaseHeader(i);
			}
		};

		var _renderPhaseHeader = function(phase) {
			var ctx = self.ctx;

			_renderPhaseLabel(ctx, phase);

			var baseX = self.practiceLabelWidth;
			var baseY = phase * (self.phaseHeaderHeight + self.phaseHeaderPadding);
			var width = phase * self.phaseWidth * 2 + self.rulerLeftWidth;
			var height = self.phaseHeaderHeight;
			//console.log("{0}/{1} : {2}/{3}".format(baseX, baseY, width, height));

			// left bar
			ctx.beginPath();
			ctx.rect(baseX, baseY, width , height);
			ctx.lineWidth = 0;
			ctx.fillStyle = self.colors.barLight;
			ctx.fill();
			ctx.closePath();

			// dark bar with arrow down
			ctx.beginPath();
			ctx.rect(baseX + width, baseY, self.phaseWidth , height);
			ctx.lineWidth = 0;
			ctx.fillStyle = self.colors.barDark;
			ctx.fill();
			ctx.closePath();

			_renderPhaseArrow(ctx, phase);

			//bottom phase bars
			ctx.beginPath();
			ctx.fillStyle = self.colors.barRegular;
			ctx.lineWidth = 0;
			for (var i = 0; i < phase + 1; i++) {
				ctx.rect(baseX + self.rulerLeftWidth + i * 2 * self.phaseWidth, baseY + height, self.phaseWidth , self.phaseHeaderPadding);
			}
			ctx.fill();
			ctx.closePath();
		};

		var _renderPhaseLabel = function(ctx, phase) {
			ctx.font = '{0} {1}px {2}'.format(self.fonts.phases.style, self.fonts.phases.size, self.fonts.phases.font);
			ctx.fillStyle = self.colors.header;
			ctx.textAlign = 'right';
			ctx.textBaseline = 'top';

			ctx.fillText("Phase {0}".format(phase + 1), self.practiceWidth, phase * (self.phaseHeaderHeight + self.phaseHeaderPadding) + (self.phaseHeaderHeight - self.fonts.phases.size) /2);
		};

		var _renderPhaseArrow = function(ctx, phase) {
			var baseX = self.practiceLabelWidth + self.rulerLeftWidth + phase * self.phaseWidth * 2 + self.phaseWidth /2;
			var baseY = phase * (self.phaseHeaderHeight + self.phaseHeaderPadding) ;

			//console.log(baseX + "/" + baseY)

			ctx.beginPath();
			ctx.moveTo(baseX - 5, baseY + 3);
			ctx.lineTo(baseX + 5, baseY + 3);
			ctx.lineTo(baseX + 5, baseY + 5);
			ctx.lineTo(baseX + 8, baseY + 5);
			ctx.lineTo(baseX, baseY + 10);
			ctx.lineTo(baseX -8, baseY + 5);
			ctx.lineTo(baseX -5, baseY + 5);

			ctx.fillStyle = self.colors.arrow;
			ctx.closePath();

			ctx.fill();
		};

		var _renderPhaseBars = function(){
			var ctx = self.ctx;
			var baseX = self.practiceLabelWidth;

			ctx.beginPath();
			for (var i = 0; i < self.phaseCount; i++) {
				ctx.rect(baseX + self.rulerLeftWidth + i * 2 * self.phaseWidth, self.phasesHeaderTotalHeight, self.phaseWidth , self.activitiesHeight);
			}
			ctx.fillStyle = self.colors.barRegular;
			ctx.closePath();
			ctx.fill();
		};

		var _renderCurrentPhaseLine = function () {
			var ctx = self.ctx;
			if (!ctx.setLineDash) {
				ctx.setLineDash = function () {}
			}
			ctx.beginPath();
			ctx.setLineDash([5,5]);
			var x = self.practiceLabelWidth + self.rulerLeftWidth + self.currentPhase * 2 * self.phaseWidth - self.phaseWidth;
			ctx.moveTo(x, 0);
			ctx.lineTo(x, self.phasesHeaderTotalHeight + self.activitiesHeight);
			ctx.stroke();
			ctx.closePath();
			ctx.setLineDash([]);
		};

		var _renderPracticeRoadmaps = function(){
			var ctx = self.ctx;

			model.categories.forEach(function(category, i){
				category.practices.forEach(function(practice, j){
					//console.log(practice.name);

					ctx.font = '{0} {1}px {2}'.format(self.fonts.practices.style, self.fonts.practices.size, self.fonts.practices.font);
					ctx.fillStyle = self.colors.header;
					ctx.textAlign = 'right';
					ctx.textBaseline = 'top';

					ctx.fillText(practice.name, self.practiceWidth, self.phasesHeaderTotalHeight + i * 4 *3 * self.levelHeight + (j+1) * 4 * self.levelHeight - 2 * self.levelHeight);
					_renderRuler(self.phasesHeaderTotalHeight + (i * 3 + j ) * 4 * self.levelHeight);

					var renderPracticeProgress = typeof self.currentPhase !== 'undefined';
					var roadmapColor = renderPracticeProgress ? category.color : category.color_dark;

					_renderRoadmap(self.roadmap[practice.practice], roadmapColor, self.phasesHeaderTotalHeight + (i * 3 + j ) * 4 * self.levelHeight + 3 * self.levelHeight );

					if(renderPracticeProgress) {
						var scoresByPhases = _getScoresByPhases(self.currentLevels[practice.practice], self.currentPhase, self.roadmap[practice.practice]);
						_renderRoadmap(scoresByPhases, category.color_dark, self.phasesHeaderTotalHeight + (i * 3 + j ) * 4 * self.levelHeight + 3 * self.levelHeight );
					}
				});
			});
		};

		var _getScoresByPhases = function (currentScore, currentPhase, roadmap) {
			var scores = [];
			roadmap.forEach(function(level, i){
				if(currentPhase > i + 1) {
					if (currentScore > level) {
						scores.push(level);
					}
					else {
						scores.push(currentScore);
					}
				}
				else if (currentPhase == i + 1) {
					scores.push(currentScore);
				}
				else {
					scores.push(0);
				}
			});
			return scores;
		};

		var _renderRoadmap = function(roadmap, color, offsetY) {

			var baseX = self.practiceLabelWidth + self.rulerLeftWidth;
			var baseY = offsetY;
			var previousX = baseX;
			var previousY = baseY;
			var ctx = self.ctx;


			ctx.beginPath();
			ctx.globalAlpha = self.alpha;
			ctx.fillStyle = color;
			roadmap.forEach(function(level, i){
				if (i >= self.phaseCount) {
					// do nothing
				}
				else if (level == 0) {
					if(previousX > baseX) {
						ctx.lineTo(previousX - self.phaseWidth, previousY);
						ctx.lineTo(previousX - self.phaseWidth, baseY);
						previousX += 2 * self.phaseWidth;
						ctx.lineTo(previousX, baseY);
						previousY = baseY;
					}
					else {
						baseX += 2 * self.phaseWidth;
						previousX = baseX;
						previousY = baseY;
						ctx.moveTo(previousX, previousY);
					}
				}
				else {
					previousX += self.phaseWidth;
					previousY =  baseY - level * self.levelHeight;
					ctx.lineTo(previousX, previousY);
					previousX += self.phaseWidth;
					ctx.lineTo(previousX, previousY);
				}
			});
			ctx.lineTo(previousX, baseY);
			ctx.lineTo(baseX, baseY);
			ctx.closePath();
			ctx.fill();
			ctx.globalAlpha = 1;
		};

		var _renderRuler = function(offsetY){
			//console.log(offsetY);
			offsetY = offsetY;
			var ctx = self.ctx;
			var baseX = self.practiceLabelWidth;
			ctx.beginPath();
			ctx.lineWidth = 1;
			ctx.strokeStyle = self.colors.ruler;
			ctx.moveTo(baseX + self.rulerLeftWidth/2, offsetY);
			ctx.lineTo(baseX, offsetY);
			ctx.lineTo(baseX, offsetY + self.levelHeight);
			ctx.lineTo(baseX + self.rulerLeftWidth/2, offsetY + self.levelHeight);
			ctx.moveTo(baseX, offsetY + self.levelHeight);
			ctx.lineTo(baseX, offsetY + 2 * self.levelHeight);
			ctx.lineTo(baseX + self.rulerLeftWidth/2, offsetY + 2 * self.levelHeight);
			ctx.moveTo(baseX, offsetY + 2 * self.levelHeight);
			ctx.lineTo(baseX, offsetY + 3 * self.levelHeight);
			ctx.lineTo(baseX + self.rulerLeftWidth + self.phaseCount * 2 *self.phaseWidth + self.rulerRightWidth, offsetY + 3 * self.levelHeight);
			ctx.stroke();
			ctx.closePath();
		};

		var _renderPhaseEfforts = function(){
			var efforts = Array.apply(null, new Array(self.phaseCount)).map(Number.prototype.valueOf,0);
			for (var practice in self.roadmap) {
				if (self.roadmap.hasOwnProperty(practice)) {
					for (var j = 0; j < self.phaseCount; j++) {
						efforts[j] += (j > 0) ? self.roadmap[practice][j] - self.roadmap[practice][j - 1] : self.roadmap[practice][j];
					}
				}
			}
			//console.log(efforts);

			var ctx = self.ctx;
			ctx.font = '{0} {1}px {2}'.format(self.fonts.efforts.style, self.fonts.efforts.size, self.fonts.efforts.font);
			ctx.fillStyle = self.colors.header;
			ctx.textAlign = 'right';
			ctx.textBaseline = 'top';

			ctx.fillText("Efforts", self.practiceWidth, self.phasesHeaderTotalHeight + self.activitiesHeight + self.effortsPaddingTop);
			ctx.textAlign = 'center';
			efforts.forEach(function(effort, i){
				var x = self.practiceLabelWidth + self.rulerLeftWidth + i * 2 * self.phaseWidth + self.phaseWidth/2;
				ctx.fillText(effort, x, self.phasesHeaderTotalHeight + self.activitiesHeight + self.effortsPaddingTop);
			});
		};

		this.initialize(args);
	};

	return SAMMCharts;

});


