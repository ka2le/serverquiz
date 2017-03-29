var http = require('http'),
    fs = require('fs');


fs.readFile('./index.php', function (err, html) {
    if (err) {
        throw err; 
    }       
    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(8000);
});



var stream = fs.createWriteStream("index3.html");
stream.once('open', function(fd) {
  stream.write('<!DOCTYPE html><html><body><p id="data">ITS DONE</p></body></html>');
  stream.end();
});