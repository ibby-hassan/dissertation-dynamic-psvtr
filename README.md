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

A back-end will not be required for this project, currently. 
PSVT:R shapes will be built using a 2x2x2 cube of 'voxels'; building blocks which will be rendered in real-time via the client's system.

Rendering is performed using R3F, a library which wraps Three.js within React.js seamlessly.
Three.js itself forms an endpoint to interact with WebGL to render 3D models. 
Vanilla-extract is used to style components. 
React components are written in TypeScript.
