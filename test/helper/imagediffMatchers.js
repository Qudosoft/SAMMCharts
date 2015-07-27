(function(root, factory) {
	"use strict";

	if (typeof define === 'function' && define.amd) {
		// [1] AMD anonymous module
		define(['imagediff'], factory);
	} else if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
		// [2] CommonJS/Node.js
		module.exports = factory(require('imagediff'));
	} else {
		// [3] No module loader (plain <script> tag) - put directly in global namespace
		root.imagediffMatchers = factory(imagediff);
	}
})(this, function(imagediff) {
	"use strict";

	// updated matchers for jasmine 2.0+
	var matchers = {
		toBeImageData : function (util, customEqualityTesters) {
			return {
				compare: function(actual) {
					var result = {};
					result.pass = imagediff.isImageData(actual);
					if(result.pass) {
						result.messsage == "Expected not to be image data.";
					}
					else {
						result.message = "Expected to be image data.";;
					}
					return result;
				}
			}
		},

		toImageDiffEqual : function (util, customEqualityTesters) {
			return {
				compare: function (actual, expected, tolerance) {
					var result = {};
					imagediff.jasmine.actual = actual
					result.pass = imagediff.jasmine.toImageDiffEqual(expected, tolerance);
					if (typeof (document) !== 'undefined' && !result.pass) {
						document.body.appendChild(imagediff.jasmine.message()[0]);
					}
					if(!result.pass) {
						result.message = "Expected Image to be equal";
					}
					else {
						result.message = "Expected Image not to be equal";
					}
					return result;
				}
			}
		}
	};
	return matchers;
});