import React, { useState } from 'react';

function VerseSelection({ setSelectedVerse }) {
  const [book, setBook] = useState('');
  const [chapter, setChapter] = useState('');
  const [verse, setVerse] = useState('');

  const handleVerseSelection = async () => {
    //  Replace with actual API call to Scripture API
    //  This is a placeholder!
    const verseText = `This is a placeholder verse from ${book} ${chapter}:${verse}`;
    setSelectedVerse(verseText);
  };

  return (
    <div>
      <label>Book:</label> <input type="text" value={book} onChange={e => setBook(e.target.value)} /><br />
      <label>Chapter:</label> <input type="number" value={chapter} onChange={e => setChapter(parseInt(e.target.value, 10))} /><br />
      <label>Verse:</label> <input type="number" value={verse} onChange={e => setVerse(parseInt(e.target.value, 10))} /><br />
      <button onClick={handleVerseSelection}>Select Verse</button>
    </div>
  );
}

export default VerseSelection;
