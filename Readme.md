# SAMMCharts

SAMMCharts is a Javascript visualization library for the [Software Assurance Maturity Model](http://www.opensamm.org/) (SAMM) version 1.0. It comes with capabilities to generate scorecards for the maturity level of an organization or individual projects as well as a road map visualization and phase summaries that you might be familiar with from the case studies of SAMM 1.0.

# Dependencies
SAMMCharts requires jQuery 1.9.x or newer to work. Simply add the following to your website to get started with SAMMCharts.

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js" type="text/javascript"></script>
<script src="samm-charts.min.js" type="text/javascript"></script>
```

SAMMCharts is developed as an AMD module so you can easily integrate with RequireJS. See [SAMM Roadmap with RequireJS](https://qudosoft.github.io/SAMMCharts/examples/roadmap.html) for an example setup.

# Getting Started

The library has two components: `SAMMCharts.Scorecard` and `SAMMCharts.Roadmap`. The SAMMCharts object itself has two optional global configuration properties, that will apply for both components.

#### imgURLBase
**(Optional)** - base URL of the server hosting the SAMM images. Use this parameter if you want to host the images in your intranet. Default is `http://www.opensamm.org/badges/small/`
```javascript
SAMMCharts.imgURLBase = "https://mycompany.com/intranet/samm/";
```
#### imgURLSuffix
**(Optional)** - Suffix that will be prepended to the image URL. Default is an empty string `''`.
```javascript
SAMMCharts.imgURLSuffix = "?version=1234567";
```

## SAMMCharts.Scorecard
A SAMM Scorecard visualizes the state of your organization or individual projects in regards to the maturity model. The listed business functions and practices directly link to the matching pages of the [OpenSAMM online documentation](https://www.owasp.org/index.php/Category:Software_Assurance_Maturity_Model#tab=Browse_Online) at OWASP.

Example:
```javascript
var scorecard = new SAMMCharts.Scorecard({
    element: '#scorecard',
    scores: {
        governance: [0.5, 0, 2],
        construction: [0, 0.5, 0],
        verification: [0.5, 1.5, 0],
        operations: [0, 0.5, 3]
    }
});
```
To render the chart simply call `render()`.

```javascript
scorecard.render();
```
See [Scorecard as standalone Javascript](https://qudosoft.github.io/SAMMCharts/examples/scorecardStandalone.html) for a working example.

### Configuration
The scorecard constructor expects a configuration object as its parameter with the following properties, optional properties are marked with `(Optional)`.
#### element
The jQuery element selector in the DOM where to append the scorecard, e.g. `#scorecard`
#### scores
The scores object which has a property for each business function (case-sensitive), each having an array of their practices' levels. Allowed level values are integers between `0` and `3` as well as `.5` floating numbers for semi-levels. The business function properties are:

* `governance`
* `construction`
* `verification`
* `operations`

### Methods
* `render()` - renders the scorecard to the DOM.

## SAMMCharts.Roadmap
A Roadmap visualizes your organization's plan to achieve a certain maturity level for SAMM practices in multiple phases over time. The Roadmap is rendered as a canvas element and can be downloaded as an image easily by right-clicking on it in your browser and selecting "*Save image as...*".

Example:
```javascript
var roadmap = new SAMMCharts.Roadmap({
    element: '#roadmap',
    phaseCount: 4,
    roadmap: {
        SM: [1,2,2,3],
        PC: [0,1,1,2],
        EG: [1,2,2,2],
        TA: [0,1,1,2],
        SR: [1,1,2,3],
        SA: [0,0,1,1],
        DR: [0,0,1,2],
        IR: [1,2,2,2],
        ST: [1,1,2,2],
        IM: [1,1,2,3],
        EH: [0,0,1,2],
        OE: [0,1,2,3]
    }
});
roadmap.render();
```
See [Roadmap with RequireJS](https://qudosoft.github.io/SAMMCharts/examples/roadmap.html) for a working example.

### Configuration
The Roadmap constructor expects a configuration object as its parameter with the following properties, optional properties are marked with `(Optional)`.

#### element
The jQuery element selector in the DOM where to append the roadmap to, e.g. `#roadmap`

#### phaseCount
The number of phases for the roadmap. Allowed values are integers greater than `0`.

#### roadmap
An object containing properties for each practice. Each practice contains an array of levels ordered by phases, where each level is an integer between `1` and `3`. The first entry in the array represents the level of phase 1, the second entry the level of phase 2 etc.
Property names for the practices are:

* `SM` - Strategy &amp; Metrics
* `PC` - Policy &amp; Compliance
* `EG` - Education &amp; Guidance
* `TA` - Threat Assessment
* `SR` - Security Requirements
* `SA` - Secure Architecture
* `DR` - Design Review
* `IR` - Implementation Review
* `ST` - Security Testing
* `IM` - Issue Management
* `EH` - Environment Hardening
* `OE` - Operational Enablement

```javascript
var roadmap = new SAMMCharts.Roadmap({
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
    }
});
```

#### displayEfforts
**(Optional)** - Boolean flag which specifies if the efforts summary should be appended to the bottom of the roadmap. Default is `true`

#### phasesSummaryElement
**(Optional)** - A jQuery element selector which specifies where to append a detailed report to for all phases listing all activities to be achieved in the phase. To render the summary, you have to call `renderPhaseSummaries()` explicitly.
```javascript
var roadmap = new SAMMCharts.Roadmap({
    phasesSummaryElement: "#summary"
});
roadmap.renderPhaseSummaries();
```
To individually render the summary for a specific phase, see the `renderPhaseSummary(phase, element)` method below.

#### alpha
**(Optional)** - The alpha level of the colored bars. The allowed value is a floating number between `0` and `1`. Default is `0.7`

#### fonts
**(Optional)** - An object for the styling of fonts of labels for `phases`, `practices`, and `efforts`. Each label type has three properties:

* `size` - the size of the font in pixel
* `font` - the font family
* `style` - the font style: `bold`, `italic`

You can override the default settings by only setting the values that you want to change, e.g. to only change the font family, simply add:
```javascript
var roadmap = new SAMMCharts.Roadmap({
    fonts: {
        phases: {
            font: "Helvetica"
        },
        practices: {
            font: "Helvetica"
        },
        efforts: {
            font: "Helvetica"
        }
    }
});
```
The default values are:
```javascript
var roadmap = new SAMMCharts.Roadmap({
    fonts: {
        phases: {
            size: "10",
            font: "Arial",
            style: "italic"
        },
        practices: {
            size: "10",
            font: "Arial",
            style: "bold"
        },
        efforts: {
            size: "11",
            font: "Arial",
            style: "bold"
        }
    }
});
```
#### colors
**(Optional)** - An object for setting colors of rulers and background bars. The following colors can be set:

* `header` - phases header text color - default: `#000`
* `arrow` -  phase arrow color - default: `#AAA`
* `barLight` - the light color of the phase column - default: `#F3F3F3`
* `barRegular` - the regular color of the phase column - default: `#EEE`
* `barDark` - the dark color of the phase column - default: `#DDD`
* `ruler` - the level ruler color - default: `#ADADAD`

You can override the default colors by only setting the values that you want to change, e.g. to only change the color of the phase header labels, simply add:
```javascript
colors = {
    header: "red"
};
```

#### currentPhase
**(Optional)** - An object for displaying the current phases levels as an overlay to the road map. The `phase` number and the `levels` are expected as properties. See [Roadmap with Current Phase Overlay](http://qudosoft-labs.github.io/SAMMCharts/examples/roadmapWithCurrentPhase.html) for an example.

* `phase` - the number of the current phase. Must be an Integer greater `0` and lesser `phaseCount`
* `levels` - An object containing a property for each practice. See `roadmap` for expected practice values. Each practice contains the value of the current level which is an Integer between `1` and `3`.

```javascript
var roadmap = new SAMMCharts.Roadmap({
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
```

### Methods

* `render()` - renders the roadmap.
* `renderPhaseSummaries()` - renders the phase summaries for all phases. To get an overview which activities an organization has to achieve during a phase for each phase the changed maturity levels and their activities are displayed. The levels are also linked to the online OpenSAMM documentation at OWASP.
* `renderPhaseSummary(phase, element)` - appends the summary of the given phase to the given jQuery element selector.

# Browser compatibility
SAMMCharts is tested with Firefox (39+), Chrome(44+) and Internet Explorer 11 on Windows/Linux but should work on older browser versions that support the Canvas HTML element, too.

# Tests
Some of the tests require the [js-imagediff](https://github.com/HumbleSoftware/js-imagediff) library. Please check the documentation for installation instructions.
To start the tests simply run the command `npm test` which will start the Karma server and execute the Jasmine specs in the local Firefox installation.

# Acknowledgements
Thanks to the contributors of SAMM and its materials which are licensed under the Creative Commons Attribution-Share Alike 3.0 License (http://creativecommons.org/licenses/by-sa/3.0/).

# Authors
This library was developed by [Alexander v. Buchholtz](https://github.com/albuch) at [Qudosoft](http://www.qudosoft.de)

# License
Copyright 2015-2017 Qudosoft GmbH &amp; Co. KG

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.