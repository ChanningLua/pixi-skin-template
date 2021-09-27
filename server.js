const express = require('express');
const path=require('path');

const PORT = 8002;
const app = express();
app.use(express.static(path.resolve(__dirname, './dist')));

app.get('*', (req, res) => {
  console.log(req.url);
  let filePath=path.resolve(__dirname,'./dist',req.url)
  res.sendFile(filePath);
});

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}.`);
});