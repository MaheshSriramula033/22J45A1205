import React, { useState } from 'react';
import axios from 'axios';

const NumberFetcher = () => {
  const [numberId, setNumberId] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchNumbers = async () => {
    setError(null);
    try {
      const response = await axios.get(`http://localhost:3000/numbers/${numberId}`, { timeout: 500 });
      setData(response.data);
    } catch (err) {
      setError('Failed to fetch data or request timed out.');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter number ID (o, f, e, r)"
        value={numberId}
        onChange={(e) => setNumberId(e.target.value)}
      />
      <button onClick={fetchNumbers}>Fetch Numbers</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {data && (
        <div>
          <h2>Results</h2>
          <p><strong>Numbers Before:</strong> {data.numbersBefore.join(', ')}</p>
          <p><strong>Numbers After:</strong> {data.numbersAfter.join(', ')}</p>
          <p><strong>Average:</strong> {data.average}</p>
        </div>
      )}
    </div>
  );
};

export default NumberFetcher;
