import React, { useState, useEffect } from 'react';
import { getBibleVersions, getBooks, getChapters, getVerses, getSelectedVerse } from './bibleApi';

function VerseSelection({ setSelectedVerse }) {
    const [bibleVersions, setBibleVersions] = useState([]);
    const [selectedVersion, setSelectedVersion] = useState('');
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState('');
    const [chapters, setChapters] = useState([]);
    const [selectedChapter, setSelectedChapter] = useState('');
    const [verses, setVerses] = useState([]);
    const [selectedVerseLocal, setSelectedVerseLocal] = useState('');
    const [error, setError] = useState(null);
    const [verseContent, setVerseContent] = useState('');
    const [verseReference, setVerseReference] = useState('');
    const [languages, setLanguages] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [languageMap, setLanguageMap] = useState({});

    const fetchLanguages = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/static/bolls/app/views/languages.json'); // Use the proxy server
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            const data = await response.json();
            console.log('Languages Data:', data);
            setLanguages(data.map(item => item.language));
        } catch (err) {
            console.error("Error fetching languages:", err);
            setError(err.toString());
        }
    };

    useEffect(() => {
        fetchLanguages();
    }, []);

    useEffect(() => {
        const fetchVersions = async () => {
            if (!selectedLanguage) {
                setBibleVersions([]); // Clear versions if no language is selected
                return;
            }

            try {
                const versions = await getBibleVersions(selectedLanguage);
                setBibleVersions(versions);
                setSelectedVersion(''); // Reset the selected version
                setSelectedBook(''); // Reset the book dropdown
                setChapters([]);
                setSelectedChapter('');
                setVerses([]);
                setSelectedVerseLocal('');
                setVerseContent('');
                setVerseReference('');
            } catch (err) {
                console.error("Error fetching Bible versions:", err);
                setError(err.toString());
            }
        };

        fetchVersions();
    }, [selectedLanguage]);

    useEffect(() => {
        const fetchBooks = async () => {
            if (selectedVersion) {
                try {
                    const fetchedBooks = await getBooks(selectedVersion);
                    setBooks(fetchedBooks);
                    setSelectedBook('');
                    setChapters([]);
                    setSelectedChapter('');
                    setVerses([]);
                    setSelectedVerseLocal('');
                    setVerseContent('');
                    setVerseReference('');
                } catch (err) {
                    console.error("Error fetching books:", err);
                    setError(err.toString());
                }
            }
        };

        fetchBooks();
    }, [selectedVersion]);

    useEffect(() => {
        const fetchChapters = async () => {
            if (selectedVersion && selectedBook) {
                try {
                    const fetchedChapters = await getChapters(selectedVersion, selectedBook);
                    setChapters(fetchedChapters);
                    setSelectedChapter('');
                    setVerses([]);
                    setSelectedVerseLocal('');
                    setVerseContent('');
                    setVerseReference('');
                } catch (err) {
                    console.error("Error fetching chapters:", err);
                    setError(err.toString());
                }
            }
        };

        fetchChapters();
    }, [selectedBook, selectedVersion]);

    useEffect(() => {
        const fetchVerses = async () => {
            if (selectedVersion && selectedChapter) {
                try {
                    const fetchedVerses = await getVerses(selectedVersion, selectedChapter);
                    setVerses(fetchedVerses);
                    setSelectedVerseLocal('');
                    setVerseContent('');
                    setVerseReference('');
                } catch (err) {
                    console.error("Error fetching verses:", err);
                    setError(err.toString());
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

    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
    };

    const handleVerseSelection = async () => {
        setError(null);
        try {
            if (!selectedVersion || !selectedBook || !selectedChapter || !selectedVerseLocal) {
                setError("Please fill in all fields.");
                return;
            }

            const verseRef = `${selectedBook}.${selectedChapter}.${selectedVerseLocal}`;

            const data = await getSelectedVerse(selectedVersion, verseRef);
            console.log(data);
            if (data && data.content) {
                setVerseContent(data.content);
                setVerseReference(data.reference);
                setSelectedVerse(data.content);
            } else {
                setError("Could not retrieve verse.");
                setVerseContent('');
                setVerseReference('');
            }
        } catch (err) {
            console.error("Error fetching verse:", err);
            setError(err.toString());
            setVerseContent('');
            setVerseReference('');
        }
    };

    return (
        <div>
            <label htmlFor="language">Select Language:</label>
            <select id="language" value={selectedLanguage} onChange={handleLanguageChange}>
                <option value="">Select a Language</option>
                {languages.map((lang) => (
                    <option key={lang} value={lang}>
                        {lang}
                    </option>
                ))}
            </select>
            <br />
            <label htmlFor="bibleVersion">Select Bible Version:</label>
            <select id="bibleVersion" value={selectedVersion} onChange={handleVersionChange} disabled={!selectedLanguage}>
                <option value="">Select a Version</option>
                {bibleVersions.map((version) => (
                    <option key={version.id} value={version.id}>
                        {version.name}
                    </option>
                ))}
            </select>
            <br />

            <label htmlFor="book">Select Book:</label>
            <select id="book" value={selectedBook} onChange={handleBookChange} disabled={!selectedVersion}>
                <option value="">Select a Book</option>
                {books.map((book) => (
                    <option key={book.id} value={book.id}>
                        {book.name}
                    </option>
                ))}
            </select>
            <br />

            <label htmlFor="chapter">Select Chapter:</label>
            <select id="chapter" value={selectedChapter} onChange={handleChapterChange} disabled={!selectedBook}>
                <option value="">Select a Chapter</option>
                {chapters.map((chapter) => (
                    <option key={chapter.id} value={chapter.id}>
                        {chapter.number}
                    </option>
                ))}
            </select>
            <br />

            <label htmlFor="verse">Select Verse:</label>
            <select id="verse" value={selectedVerseLocal} onChange={handleVerseChange} disabled={!selectedChapter}>
                <option value="">Select a Verse</option>
                {verses.map((verse) => (
                    <option key={verse.id} value={verse.number}>
                        {verse.number}
                    </option>
                ))}
            </select>
            <br />

            <button onClick={handleVerseSelection}>Select Verse</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}

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
