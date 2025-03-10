import React, { useState, useEffect } from 'react';
import { getBibleVersions, getBooks, getChapters, getVerses, getSelectedVerse } from './bibleApi'; // Import needed functions

function VerseSelection({ setSelectedVerse }) {
  const [bibleVersions, setBibleVersions] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState(''); // Default to empty
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState('');
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(''); // Store chapter ID
  const [verses, setVerses] = useState([]);
  const [selectedVerse, setSelectedVerseLocal] = useState(''); //local state for verse
  const [error, setError] = useState(null);
  const [verseContent, setVerseContent] = useState('');
  const [verseReference, setVerseReference] = useState('');

  // Fetch Bible versions when the component mounts
  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const versions = await getBibleVersions();
        setBibleVersions(versions);
      } catch (err) {
        console.error("Error fetching Bible versions:", err);
        setError(err); // Display error if versions fail to load
      }
    };

    fetchVersions();
  }, []);

  // Fetch books when the version changes
  useEffect(() => {
    const fetchBooks = async () => {
      if (selectedVersion) {
        try {
          const fetchedBooks = await getBooks(selectedVersion);
          setBooks(fetchedBooks);
          setSelectedBook(''); // Reset book when version changes
          setChapters([]); // Reset chapters when version changes
          setSelectedChapter(''); // Reset chapter when version changes
          setVerses([]); // Reset verses when version changes
          setSelectedVerseLocal(''); // Reset verse when version changes
          setVerseContent('');
          setVerseReference('');
        } catch (err) {
          console.error("Error fetching books:", err);
          setError(err);
        }
      }
    };

    fetchBooks();
  }, [selectedVersion]);

  // Fetch chapters when the book changes
  useEffect(() => {
    const fetchChapters = async () => {
      if (selectedVersion && selectedBook) {
        try {
          const fetchedChapters = await getChapters(selectedVersion, selectedBook);
          setChapters(fetchedChapters);
          setSelectedChapter(''); // Reset chapter when book changes
          setVerses([]); // Reset verses when book changes
          setSelectedVerseLocal(''); // Reset verse when book changes
          setVerseContent('');
          setVerseReference('');
        } catch (err) {
          console.error("Error fetching chapters:", err);
          setError(err);
        }
      }
    };

    fetchChapters();
  }, [selectedBook, selectedVersion]);

  // Fetch verses when the chapter changes
  useEffect(() => {
    const fetchVerses = async () => {
      if (selectedVersion && selectedChapter) {
        try {
          const fetchedVerses = await getVerses(selectedVersion, selectedChapter);
          setVerses(fetchedVerses);
          setSelectedVerseLocal(''); // Reset verse when chapter changes
          setVerseContent('');
          setVerseReference('');
        } catch (err) {
          console.error("Error fetching verses:", err);
          setError(err);
        }
      }
    };

    fetchVerses();
  }, [selectedChapter, selectedVersion]);

  const handleVersionChange = (event) => {
    setSelectedVersion(event.target.value);
  };

  const handleBookChange = (event) => {
    setSelectedBook(event.target.value);
  };

  const handleChapterChange = (event) => {
    setSelectedChapter(event.target.value);
  };

  const handleVerseChange = (event) => {
    setSelectedVerseLocal(event.target.value);
  };

  const handleVerseSelection = async () => {
    setError(null); // Clear any previous errors
    try {
      if (!selectedVersion || !selectedBook || !selectedChapter || !selectedVerse) {
        setError("Please fill in all fields.");
        return;
      }

      const verseRef = `${selectedVerse}`; // Corrected verseRef

      const data = await getSelectedVerse(selectedVersion, verseRef);
      console.log(data);

      if (data && data.content) {
        setVerseContent(data.content);
        setVerseReference(data.reference);
        setSelectedVerse(data.content); //update the state sent to MemorizationProgress
      } else {
        setError("Could not retrieve verse.");
        setVerseContent(''); //clear values
        setVerseReference('');
      }
    } catch (err) {
      console.error("Error fetching verse:", err);
      setError(err); // Display the error message from bibleApi.js
      setVerseContent(''); //clear values
      setVerseReference('');
    }
  };

  return (
    <div>
      {/* Bible Version Dropdown */}
      <label htmlFor="bibleVersion">Select Bible Version:</label>
      <select id="bibleVersion" value={selectedVersion} onChange={handleVersionChange}>
        <option value="">Select a Version</option> {/* Default option */}
        {bibleVersions.map((version) => (
          <option key={version.id} value={version.id}>
            {version.name} ({version.abbreviation})
          </option>
        ))}
      </select>
      <br />

      {/* Book Dropdown */}
      <label htmlFor="book">Select Book:</label>
      <select id="book" value={selectedBook} onChange={handleBookChange} disabled={!selectedVersion}>
        <option value="">Select a Book</option> {/* Default option */}
        {books.map((book) => (
          <option key={book.id} value={book.id}>
            {book.name}
          </option>
        ))}
      </select>
      <br />

      {/* Chapter Dropdown */}
      <label htmlFor="chapter">Select Chapter:</label>
      <select id="chapter" value={selectedChapter} onChange={handleChapterChange} disabled={!selectedBook}>
        <option value="">Select a Chapter</option> {/* Default option */}
        {chapters.map((chapter) => (
          <option key={chapter.id} value={chapter.id}> {/* Use chapter.id here */}
            {chapter.number} {/* Display chapter.number here */}
          </option>
        ))}
      </select>
      <br />

      {/* Verse Dropdown */}
      <label htmlFor="verse">Select Verse:</label>
      <select id="verse" value={selectedVerse} onChange={handleVerseChange} disabled={!selectedChapter}>
        <option value="">Select a Verse</option> {/* Default option */}
        {verses.map((verse) => (
          <option key={verse.id} value={verse.id}>
            {verse.id.split('.').pop()}
          </option>
        ))}
      </select>
      <br />

      <button onClick={handleVerseSelection}>Select Verse</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display Verse Content and Reference */}
      {verseContent && (
        <div>
          <h3>{verseReference}</h3>
          <div dangerouslySetInnerHTML={{ __html: verseContent }} />
        </div>
      )}
    </div>
  );
}

export default VerseSelection;
