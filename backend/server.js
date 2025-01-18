const express = require('express');
const app = express();
const port = 3001;

app.get('/verse/:book/:chapter/:verse', (req, res) => {
  //  Replace with actual API call to Scripture API
  //  This is a placeholder!
  const { book, chapter, verse } = req.params;
  const verseText = `This is a placeholder verse from ${book} ${chapter}:${verse}`;
  res.json({ verse: verseText });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
