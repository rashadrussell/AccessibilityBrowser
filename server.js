  var express = require('express')
  , app  = require('express')()
  , server = require('http').createServer(app)
  , io   = require('socket.io').listen(server)
  , path = require('path');

  server.listen(3000);

  app.use(express.static(path.join(__dirname, 'public')));


  io.sockets.on('connection', function(socket) {

    // Signaling Channel
    socket.on('navigate', function(url) {
    	
    	var parsedURL = url.substring(0, url.indexOf('.com'));

    	var	wget = require('wget'),
			src = 'http://www.' + url,
			output = './public/websites/' + parsedURL + '.html',
			download = wget.download(src, output);

		download.on('error', function(err) {
		    console.log(err);
		});
		download.on('end', function(output) {
		    console.log(output);
		});
		download.on('progress', function(progress) {
		    // code to show progress bar
		});

		setTimeout(function() {

			var localURL = url.substring(0, url.indexOf('.com')) + '.html';
				localURL = "http://127.0.0.1:3000/websites/" + localURL;

			socket.emit('changeURL', localURL);

		}, 5000);


    });

  });
