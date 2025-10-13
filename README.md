# dissertation-dynamic-psvtr
UofG Individual Project (H) Dissertation: "Automatically generating 3D rotation test; can an algorithmically generated test maintain consistent difficulty?"

---------------------------------------
TLDR:
The aim of this project is to innovate upon the existing UofG Purdue Spatial Visualisation Test: Visualisation of Rotations (PSVT:R) test by algorithmically generating shapes. A successful project will attempt to dynamically generate shapes and associated transformations in the test, and will conduct an evaluation to compare how similar difficulty scales between the original and the new. 

---------------------------------------
BACKGROUND:

The Purdue Spatial Visualisation Test: Visualisation of Rotations (PSVT:R) test is a test of one's aptitude towards spatial visualisation. 
The test consists of 30 questions of increasing difficulty, taking place over 20 minutes. It involves presenting the subject with various 3D shapes modelled on a 2D plane, with little to no aides to assist with depth-perception, such as shading or a Z-axis metric. The shape is then manipulated in some way. A second shape is then presented, and the user has to select from multiple choice, which option presented is the result of the presented shape if it underwent the same transformation as the example shape. 

Spatial visualisation is strongly correlated with success in STEM fields, making the PSVT:R an important diagnostic tool. However, the limited and static bank of items compromises validity once test items are widely circulated.

The issue with the original PSVT:R test (and indeed that which the University of Glasgow possesses and utilises), is that the test always presents the same 3D shapes with the same transformations. This means once test items are shared, the validity of tests taken is compromised. 

---------------------------------------
AIMS & OBJECTIVES:

The crux of the solution to this problem is to introduce elements of random generation to the test. 

The Minimum Viable Product for this project is the following:
	A. A PSVT:R test with an element of randomisation regarding the shapes/transformations.
	B. Present the shapes/transformations as an MCQ test for the user.
	C. Host the test via a test-taking platform (web-app). 
	D. Test increases in difficulty progressively.

The following MoSCoW board represents potential deliverables ranked by importance. 
	MUST HAVE
		- Set of bespoke shapes for use in test.
		- Algorithm to apply transformations for each shape.
		- Metric for difficulty measurement.
		- Web-app platform from which to take the test.
	SHOULD HAVE
		- Random, on-demand generation of shapes for use in test.
		- Global difficulty metrics weigh both inherent shape difficulty and difficulty of transformation.
		- Responsive web-app from which to take the test.
	COULD HAVE
		- A comparative study on previous version of the PSVT:R test VS current version.
		- Log-in features to track how users perform in the test.
		- Dashboard of stats to view how users are performing in the test.
	WOULD BE NICE TO HAVE
		- Experimental settings which tinker with shading/colouring/extra facets of information 

---------------------------------------
TECHNICAL APPROACH:

From a technical standpoint, it has been decided the platform to deliver the test well be a bespoke web-app. 
The brunt of the generation/transformation logic will be written utilising three.js, a JavaScript library and API allowing for optimised 3D animation/object creation built using WebGL as an engine. Many three.js geometry libraries exist and are well-documented, ensuring relative ease in learning the new technology. 

Front-end:
	- Option 1: Vanilla HTML/CSS/JS with three.js on top.
		- This option would be the fastest to enter development with, as it requires the shallowest learning curve; three.js being the largest new technology on the stack. 
		- However, this option does not permit extensibility if I want to expand the scope of the project. 
	- Option 2: Utilise React-Three-Fibre, a wrapper for react with plays very nicely with three.js, but requires decent familiarity with most.
		- Large learning curve.
		- Likely less time to conduct a thorough study

Back-end: 
	- Option 1: MVP; no backend. All visualisation and rendering can likely be handled client-side. 
		- Static hosting; results are not logged.
	- Option 2: Node.js/Express backend which allows for logging results, data visualisation, etc. 
		- Larger scope. Can be added retroactively; most of the MVP details are handled in the front-end. 

DevOps:
	- Hosting: GitHub pages initially, can switch to dedicated server when back-end features becomes richer. Plays nice with GitHub. 

---------------------------------------
ROUGH TIMELINE:

Semester 1: Focus on front-end; MVP deliverables; 3js object generation. 
	- Week 1-2: Project planning
	- Week 3-4: Familiarisation with 3js, project setup, create platform homepage.
	- Week 5-7: Object generation algorithm.
	- Week 7-9: Transformation algorithm.
	- Week 9-11: Clean-up, generate shape test suite, test hosting, etc. 


Going down the study route, what questions do we want to answer regarding the original PSVT:R.
Potentially generating multiple versions of the test (A/B tested). 
The variable for testing:
	- Randomising the order for the questions isn't important (keep it easy to hard). 
	- Might be interesting to randomise just the A's and B's and C's

questionShape not important
answerShape
actualRotations not important
fakeRotations

Comparison of the original PSVT:R and a version where the answerShape is an algorithmically generated one of the "same" difficulty; so the study is of the effectiveness of an algorithm that aims to match difficulty based on original shape properties. 


