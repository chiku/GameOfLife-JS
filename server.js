/* eslint-disable no-console */

const http = require('http');
const fs = require('fs');
const path = require('path');

const basePath = path.join(__dirname, 'dist');
const port = parseInt(process.env.PORT, 10) || 5000;

console.log(`${new Date().toUTCString()}: Listening on port ${port}`);

function serve(req, res, filePath) {
  const { method, url } = req;
  const stream = fs.createReadStream(path.join(basePath, filePath));
  stream.on('error', (err) => {
    console.error(`${new Date().toUTCString()}: Error serving ${method} ${url} from ${filePath}:, ${JSON.stringify(err)}`);
    res.writeHead(404);
    res.end();
  });
  stream.pipe(res);
}

http.createServer((req, res) => {
  const { method, url } = req;
  console.log(`${new Date().toUTCString()}: Received ${method} ${url}`);

  if (url === '/') {
    serve(req, res, 'index.html');
  } else {
    serve(req, res, req.url);
  }

  console.log(`${new Date().toUTCString()}: Served ${method} ${url}`);
}).listen(port);
