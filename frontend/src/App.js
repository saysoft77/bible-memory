import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import VerseSelection from './VerseSelection';
import RepetitionSettings from './RepetitionSettings';
import MemorizationProgress from './MemorizationProgress';

function App() {
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
              <Link to="/repetition-settings">Repetition Settings</Link>
            </li>
            <li>
              <Link to="/memorization-progress">Memorization Progress</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/verse-selection" element={<VerseSelection />} />
          <Route path="/repetition-settings" element={<RepetitionSettings />} />
          <Route path="/memorization-progress" element={<MemorizationProgress />} />
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