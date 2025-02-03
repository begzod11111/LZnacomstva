// server.mjs
import { createServer } from 'node:http';
import mongoose from 'mongoose';



const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\n');
});

mongoose.set('debug', true);


mongoose.connect('mongodb+srv://begzod:begzod0426@begzod.5alev.mongodb.net/?retryWrites=true&w=majority&appName=begzod',
    {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true,
  tlsAllowInvalidCertificates: false,
  tlsAllowInvalidHostnames: false
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
    console.error(err);
});


// starts a simple http server locally on port 3000
server.listen(7000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:7000');
});

// run with `node server.mjs`
