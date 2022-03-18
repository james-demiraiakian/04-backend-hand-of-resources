const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.get('/', (req, res) => {
  res.send('Root route has been routed');
});

app.use('/api/v1/cats', require('./controllers/cats'));
app.use('/api/v1/books', require('./controllers/books'));
app.use('/api/v1/schools', require('./controllers/schools'));
// app.use('/api/v1/juices', require('./controllers/juices'));
// app.use('/api/v1/foods', require('./controllers/foods'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
