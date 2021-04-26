const express = require('express');
const app = express();
const path = require('path');
const port = 4000;
let pathName = path.join(__dirname, '../dist');

app.use(express.static(pathName));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

