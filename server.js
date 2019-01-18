const express = require('express');
const path = require('path');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/api/timestamp/:date_string?', (req, res) => {
  function formatDate(date) {
    return {
      unix: date.getTime(),
      utc: date.toUTCString()
    };
  }

  const dateString = req.params.date_string;

  if (!dateString) {
    return res.json(formatDate(new Date()));
  }

  const date = /^\d*$/.test(dateString)
    ? new Date(Number(dateString) * 1000)
    : new Date(dateString);

  if (isNaN(date.getTime())) {
    return res.json({ error: 'Invalid Date' });
  }

  res.json(formatDate(date));
});

app.use((req, res) => {
  res.status(404);
  res.send({ error: 'Not found' });
});

app.use((err, res, req, next) => {
  res.status(500);
  res.send({ error: err.message });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
