//my_key.js
const API_KEY = `d49585e9969e0e8fe040546cb73d3759`; // Fill this in with your own API key from https://portal.api.bible/

/**
 * Gets Bible versions from API.Bible
 * @returns {Promise} containing list of Bible versions
 */
function getBibleVersions() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener(`readystatechange`, function () {
      if (this.readyState === this.DONE) {
        if (this.status >= 200 && this.status < 300) {
          try {
            const response = JSON.parse(this.responseText);
            const versions = response.data.map((data) => {
              return {
                name: data.name,
                id: data.id,
                abbreviation: data.abbreviation,
                description: data.description,
                language: data.language.name
              };
            });
            resolve(versions);
          } catch (error) {
            reject('Error parsing the response');
          }
        } else {
          reject(`Request failed with status: ${this.status}`); // Reject on non-success status
        }
      }
    });

    xhr.open(`GET`, `/bibles`);
    xhr.setRequestHeader(`api-key`, API_KEY);

    xhr.onerror = () => reject(xhr.statusText);

    xhr.send();
  });
}

/**
 * Gets books of the Bible from API.Bible
 * @param {string} bibleVersionID to get books from
 * @returns {Promise} containing list of books of the Bible
 */
function getBooks(bibleVersionID) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener(`readystatechange`, function () {
      if (this.readyState === this.DONE) {
        if (this.status >= 200 && this.status < 300) {
          try {
            const response = JSON.parse(this.responseText);
            const books = response.data.map(({ name, id }) => { return { name, id }; });

            resolve(books);
          } catch (error) {
            reject('Error parsing the response');
          }
        } else {
          reject(`Request failed with status: ${this.status}`); // Reject on non-success status
        }
      }
    });

    xhr.open(`GET`, `/bibles/${bibleVersionID}/books`);
    xhr.setRequestHeader(`api-key`, API_KEY);

    xhr.onerror = () => reject(xhr.statusText);

    xhr.send();
  });
}

/**
 * Gets chapters from API.Bible
 * @param {string} bibleVersionID to get chapters from
 * @param {string} bibleBookID to get chapters from
 * @returns {Promise} containing list of chapters from selected book
 */
function getChapters(bibleVersionID, bibleBookID) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener(`readystatechange`, function () {
      if (this.readyState === this.DONE) {
        if (this.status >= 200 && this.status < 300) {
          try {
            const response = JSON.parse(this.responseText);
            const chapters = response.data.map(({ number, id }) => { return { number, id }; });

            resolve(chapters);
          } catch (error) {
            reject('Error parsing the response');
          }
        } else {
          reject(`Request failed with status: ${this.status}`); // Reject on non-success status
        }
      }
    });

    xhr.open(`GET`, `/bibles/${bibleVersionID}/books/${bibleBookID}/chapters`);
    xhr.setRequestHeader(`api-key`, API_KEY);

    xhr.onerror = () => reject(xhr.statusText);

    xhr.send();
  });
}

/**
 * Gets verses from API.Bible
 * @param {string} bibleVersionID to get verses from
 * @param {string} bibleChapterID to get verses from
 * @returns {Promise} containing list of verses from selected book
 */
function getVerses(bibleVersionID, bibleChapterID) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener(`readystatechange`, function () {
      if (this.readyState === this.DONE) {
        if (this.status >= 200 && this.status < 300) {
          try {
            const response = JSON.parse(this.responseText);
            const verses = response.data.map(({ id }) => { return { id }; });

            resolve(verses);
          } catch (error) {
            reject('Error parsing the response');
          }
        } else {
          reject(`Request failed with status: ${this.status}`); // Reject on non-success status
        }
      }
    });

    xhr.open(`GET`, `/bibles/${bibleVersionID}/chapters/${bibleChapterID}/verses`);
    xhr.setRequestHeader(`api-key`, API_KEY);

    xhr.onerror = () => reject(xhr.statusText);

    xhr.send();
  });
}

/**
 * Gets selected verse from API.Bible
 * @param {string} bibleVersionID to get verse from
 * @param {string} bibleVerseID of selected verse
 * @returns {Promise} containing selected verse
 */
function getSelectedVerse(bibleVersionID, bibleVerseID) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener(`readystatechange`, function () {
      if (this.readyState === this.DONE) {
        if (this.status >= 200 && this.status < 300) {
          try {
            const response = JSON.parse(this.responseText);
            const { content, reference } = response.data;
            const verse = { content, reference };

            resolve(verse);
          } catch (error) {
            reject('Error parsing the response');
          }
        } else {
          reject(`Request failed with status: ${this.status}`); // Reject on non-success status
        }
      }
    });

    xhr.open(`GET`, `/bibles/${bibleVersionID}/verses/${bibleVerseID}?include-chapter-numbers=false&include-verse-numbers=false`);
    xhr.setRequestHeader(`api-key`, API_KEY);

    xhr.onerror = () => reject(xhr.statusText);

    xhr.send();
  });
}

export { getBibleVersions, getBooks, getChapters, getVerses, getSelectedVerse };
