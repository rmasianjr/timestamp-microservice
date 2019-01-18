const express = require('express');
const path = require('path');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/api/timestamp/:date_string', (req, res) => {
  res.send(req.params.date_string);
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
