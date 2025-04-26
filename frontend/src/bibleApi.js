// bibleApi.js (New Version for bolls.life)

/**
 * Gets a list of available translations.
 * @param {string} language - The language to filter the translations by.
 * @returns {Promise} containing a list of translations
 */
function getBibleVersions(language) {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:5000/api/static/bolls/app/views/languages.json') // Updated to match line 22 of VerseSelection.js
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const translations = [];
                let languageData = data;
                if (language) {
                    languageData = data.filter(item =>
                        item.language.toLowerCase().includes(language.toLowerCase())
                    );
                }

                languageData.forEach(langData => {
                    langData.translations.forEach(translation => {
                        translations.push({
                            name: translation.full_name,
                            id: translation.short_name,
                            abbreviation: translation.short_name,
                            description: translation.info || '',
                            commentaries: translation.commentaries,
                            updated: translation.updated,
                            dir: translation.dir || '',
                            language: langData.language // Add the language
                        });
                    });
                });
                resolve(translations);
            })
            .catch(error => {
                reject(error);
            });
    });
}

/**
 * Gets books of the Bible for a specific translation.
 * @param {string} translationID - The short name of the translation (e.g., 'YLT').
 * @returns {Promise} containing a list of books
 */
function getBooks(translationID) {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:5000/api/get-books/${translationID}/`) // Updated to match line 22 of VerseSelection.js
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const books = data.map(book => ({
                    name: book.name,
                    id: book.bookid,
                    chapters: book.chapters,
                    chronorder: book.chronorder
                }));
                resolve(books);
            })
            .catch(error => {
                reject(error);
            });
    });
}

/**
 * Gets chapters of a specific book for a specific translation.
 * @param {string} translationID - The short name of the translation.
 * @param {string} bookID - The ID of the book.
 * @returns {Promise} containing a list of chapters
 */
function getChapters(translationID, bookID) {
    return new Promise((resolve, reject) => {
        getBooks(translationID)
            .then(books => {
                const book = books.find(b => b.id === parseInt(bookID));
                if (book) {
                    const chapters = Array.from({ length: book.chapters }, (_, i) => ({
                        number: i + 1,
                        id: `${bookID}.${i + 1}`
                    }));
                    resolve(chapters);
                } else {
                    reject(`Book with ID ${bookID} not found.`);
                }
            })
            .catch(error => {
                reject(error);
            });
    });
}

/**
 * Gets verses of a specific chapter for a specific translation.
 * @param {string} translationID - The short name of the translation.
 * @param {string} chapterID - The ID of the chapter (e.g., '1.1' for book 1, chapter 1).
 * @returns {Promise} containing a list of verses
 */
function getVerses(translationID, chapterID) {
    return new Promise((resolve, reject) => {
        const [bookID, chapterNumber] = chapterID.split('.');
        const url = `http://localhost:5000/api/get-text/${translationID}/${bookID}/${chapterNumber}/`; // Updated to match line 22 of VerseSelection.js
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const verses = data.map(verse => ({
                    id: `${chapterID}.${verse.verse}`,
                    number: verse.verse,
                }));
                resolve(verses);
            })
            .catch(error => {
                reject(error);
            });
    });
}

/**
 * Gets a specific verse.
 * @param {string} translationID - The short name of the translation.
 * @param {string} verseID - The ID of the verse (e.g., '1.1.1' for book 1, chapter 1, verse 1).
 * @returns {Promise} containing the verse content
 */
async function getSelectedVerse(translationID, verseID) {
    return new Promise(async (resolve, reject) => {
        const [bookID, chapterNumber, verseNumber] = verseID.split('.');
        const bookNumber = await getBookNumber(translationID, bookID);
        const bookName = await getBookName(translationID, bookID);
        const url = `http://localhost:5000/api/get-verse/${translationID}/${bookNumber}/${chapterNumber}/${verseNumber}/`; // Updated to match line 22 of VerseSelection.js

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                resolve({
                    content: data.text, // Assuming 'text' contains the verse content
                    reference: `${bookName} ${chapterNumber}:${data.verse}` // Remove the version, add the book name
                });
            })
            .catch(error => {
                reject(error);
            });
    });
}

/**
* Gets the book number from a specific translation.
* @param {string} translationID - The short name of the translation.
* @param {string} bookID - The ID of the book.
* @returns {Promise} containing the book number.
*/
function getBookNumber(translationID, bookID) {
    return new Promise((resolve, reject) => {
        getBooks(translationID)
        .then(books => {
            const book = books.find(b => b.id === parseInt(bookID));
            if (book) {
                 resolve(book.chronorder);
            }
            else{
                 reject(`Book with ID ${bookID} not found.`);
            }
        })
        .catch(error => {
            reject(error);
        });
    });
}
/**
 * Gets the book name from a specific translation.
 * @param {string} translationID - The short name of the translation.
 * @param {string} bookID - The ID of the book.
 * @returns {Promise} containing the book number.
 */
function getBookName(translationID, bookID) {
    return new Promise((resolve, reject) => {
        getBooks(translationID)
        .then(books => {
            const book = books.find(b => b.id === parseInt(bookID));
            if (book) {
                 resolve(book.name);
            }
            else{
                 reject(`Book with ID ${bookID} not found.`);
            }
        })
        .catch(error => {
            reject(error);
        });
    });
}
export { getBibleVersions, getBooks, getChapters, getVerses, getSelectedVerse };
