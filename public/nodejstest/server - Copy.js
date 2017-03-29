var http = require('http');

http.createServer(function (request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin' : '*'
    });
    response.end('Hello World\n');
}).listen(1337);

var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
var fs = require('fs');

var text_to_speech = new TextToSpeechV1 ({
  username: '{b002be7d-4e0d-4b70-bdb9-f33949882f60}',
  password: '{ogOydPCss8jJ}'
});

var params = {
  text: 'Hello world',
  voice: 'en-US_AllisonVoice',
  accept: 'audio/wav'
};


text_to_speech.synthesize(params).on('error', function(error) {
  console.log('Error:', error);
}).pipe(fs.createWriteStream('hello_world.txt'));