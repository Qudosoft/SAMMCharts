define(['samm-charts', 'jquery'], function(SAMMCharts, $) {
	describe("SAMMCharts image", function () {
		beforeEach(function(){
			SAMMCharts.resetImgURL();
		});

		it("should be based on opensamm.org and append the parameter", function () {
			expect(SAMMCharts.getImgURL("test.jpg")).toBe("http://www.opensamm.org/badges/small/test.jpg");
		});
		it("should change ImgURL if imgURLBase is changed", function () {
			SAMMCharts.imgURLBase = "http://google.de/samm/";
			expect(SAMMCharts.getImgURL("test.jpg")).toBe("http://google.de/samm/test.jpg");
		});
		it("should change ImgURL if imgURLSuffix is changed", function () {
			SAMMCharts.imgURLSuffix = "?api=v2";
			expect(SAMMCharts.getImgURL("test.jpg")).toBe("http://www.opensamm.org/badges/small/test.jpg?api=v2");
		});
		it("should throw Error if no argument supplied", function () {
			expect(function() {SAMMCharts.getImgURL()}).toThrow(new Error('Missing image parameter.'));
		});
		it("should reset imgURLBase to default value if reset is called", function () {
			SAMMCharts.imgURLBase = "http://google.de/samm/";
			SAMMCharts.resetImgURL();
			expect(SAMMCharts.getImgURL("test.jpg")).toBe("http://www.opensamm.org/badges/small/test.jpg");
		});
		it("should reset imgURLSuffix to default value if reset is called", function () {
			SAMMCharts.imgURLSuffix = "?api=v2";
			SAMMCharts.resetImgURL();
			expect(SAMMCharts.getImgURL("test.jpg")).toBe("http://www.opensamm.org/badges/small/test.jpg");
		});
	});

	describe("SAMMCharts namespace", function () {
		it("should only contain SAMMChart by default", function () {
			expect(SAMMCharts.Test).not.toBeDefined();
		});
		it("should contain single child name", function () {
			SAMMCharts.namespace('SAMMCharts.Test');
			expect(SAMMCharts.Test).toBeDefined();
		});
		it("should contain nested child names", function () {
			SAMMCharts.namespace('SAMMCharts.Test.Test');
			expect(SAMMCharts.Test.Test).toBeDefined();
		});
	});
});

