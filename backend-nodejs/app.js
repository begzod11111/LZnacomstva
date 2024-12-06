const routes = require('./routes');
const express = require('express'),
        app = express();
app.use('/api', routes);
const host = '127.0.0.1';
const port = 7000;


app.listen(port, host, () => console.log(`Server listens http://${host}:${port}`));

