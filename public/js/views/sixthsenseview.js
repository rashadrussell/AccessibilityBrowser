/*global YUI*/

YUI.add('sixthsense-view', function (Y) {
	'use strict';

	// -- Todo View -------------------
	var SixthSenseView = Y.Base.create('sixthsenseView', Y.View, [], {

		containerTemplate: Y.one('.webpage').get('contentDocument').one('html').one('body'),

		// Bind DOM events for handling changes to a specific Todo,
		// for completion and editing.
		events: {
			
		},

		// Initialize this view by setting event handlers when the Model
		// is updated or destroyed.
		initializer: function () {

			//////////////////////////////////
			////// Anchor Voice ///////////////////
			///////////////////////////////
			var anchors   = [],
				container = Y.one('iframe').get('contentDocument').get('body'),
				counter = 0,
				speechButton = Y.one('#speechButton');

			container.all('a').each(function(anchor) {
				anchors.push(anchor);
			});

			window.onkeydown = function(e) {


				if(e.keyCode === 39) {

					counter = parseInt(speechButton.get('innerText'));
					console.log(counter);

					speak(anchors[counter].get('innerText'));
					
					counter = counter % anchors.length - 1;
					counter++; 

					counter++;
					speechButton.set('innerText', counter);
					
				};
			}



			/////////////////////////////
			/////////Contrast Color //////
			/////////////////////////////

			Y.one('#contrastColor').on('click', function() {
				container.all('div').each(function(div) {
					div.setStyle('backgroundColor', '#000');
					div.get('children').each(function(child) {
						child.setStyle('color', '#fff');
					});

				});

				container.all('a').each(function(anchor) {
					anchor.setStyle('color', '#fff');
				});

				container.all('p').each(function(anchor) {
					anchor.setStyle('color', '#fff');
				});

			});
			





		},

		// Render this view in our <li> container, and fill it with the
		// data in our Model.
		render: function () {
			

			return this;
		},

	});

	// Set this View under our custom Y.TodoMVC namespace.
	Y.namespace('SixthSenseMVC').SixthSenseView = SixthSenseView;

}, {

	ATTRS: {
		container: {
			valueFn: function() {
				return Y.one('.webpage').get('contentDocument').one('html').one('body');
			}
		}
	}

}, '@VERSION@', {

	requires: [
		'view',
		'node'
	]

});
