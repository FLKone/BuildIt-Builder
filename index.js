var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('*', function(request, response) {
    response.sendFile('/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
