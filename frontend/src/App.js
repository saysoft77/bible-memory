import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import VerseSelection from './VerseSelection';
import Settings from './Settings'; // Changed import name
import MemorizeVerse from './MemorizeVerse';

function App() {
  const [selectedVerse, setSelectedVerse] = useState('');
  const [repetitions, setRepetitions] = useState(5);
  const [accuracyThreshold, setAccuracyThreshold] = useState(80);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/verse-selection">Verse Selection</Link>
            </li>
            <li>
              <Link to="/memorize-verse">Memorize Verse</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link> {/* Changed link text and position*/}
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/verse-selection" element={<VerseSelection setSelectedVerse={setSelectedVerse} />} />
          <Route path="/memorize-verse" element={<MemorizeVerse verse={selectedVerse} repetitions={repetitions} accuracyThreshold={accuracyThreshold}/>} />
          <Route path="/settings" element={<Settings repetitions={repetitions} setRepetitions={setRepetitions} accuracyThreshold={accuracyThreshold} setAccuracyThreshold={setAccuracyThreshold} />} /> {/* Changed component name and path */}
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h1>Welcome to the Bible Memory App!</h1>
      <p>Use the navigation menu to get started.</p>
    </div>
  );
}

export default App;
