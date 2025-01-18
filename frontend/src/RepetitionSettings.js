import React from 'react';

function RepetitionSettings({ repetitions, setRepetitions, accuracyThreshold, setAccuracyThreshold }) {
  return (
    <div>
      <label>Repetitions:</label> <input type="number" value={repetitions} onChange={e => setRepetitions(parseInt(e.target.value, 10))} /><br />
      <label>Accuracy Threshold (%):</label> <input type="number" value={accuracyThreshold} onChange={e => setAccuracyThreshold(parseInt(e.target.value, 10))} />
    </div>
  );
}

export default RepetitionSettings;
