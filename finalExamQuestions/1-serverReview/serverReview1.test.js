/* ------------------------------------------------------------------------------------------------

Write a function named sayHello, that sends the message 'Hello from the back-end' when a user hits the `/hello` route.

------------------------------------------------------------------------------------------------ */

// Express sever here
const createServer = () => {
  const express=require('express');
  const app=express();
  app.get('/hello', sayHello);

  var server = app.listen(3301, function () {
    var port = server.address().port;
    console.log('Example app listening at port', port);
  });
  return server;
};


function sayHello(request, response){
  //Solution code here...
  
    response.send('Hello from the back-end');
  
}

describe('Testing challenge', () => {

  const request = require('supertest');

  let server;

  beforeEach(function () {
    server = createServer();
  });

  afterEach(function () {
    server.close();
  });

  test('responds to /hello', function testSlash(done) {
    request(server)
      .get('/hello')
      .expect(200, done);
  });
  test('404 everything else', function testPath(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});