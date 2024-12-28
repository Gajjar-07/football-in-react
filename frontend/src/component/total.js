import React, { useState } from 'react';
import axios from 'axios';
import './total.css'; // Add styling here

export const TotalsForYear = () => {
  const [Year, setYear] = useState('');
  const [totals, setTotals] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setTotals(null);

    try {
      const response = await axios.get('http://localhost:3000/totalsforYear', {
        params: { Year },
      });
      setTotals(response.data);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error fetching data.');
    }
  };

  return (
    <div className="totals-container">
      <h2>Total Games Played, Draws, and Wins for a Given Year</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Year">Year:</label>
          <input
            type="Number"
            id="Year"
            name="Year"
            placeholder="Enter year"
            value={Year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>
        <button type="submit">Get Totals</button>
      </form>

      {message && <p className="message error">{message}</p>}

      {totals && (
        <div className="results">
          <h3>Totals for {Year}</h3>
          <p><strong>Total Games Played:</strong> {totals.totalGamesPlayed}</p>
          <p><strong>Total Draws:</strong> {totals.totalDraw}</p>
          <p><strong>Total Wins:</strong> {totals.totalWins}</p>
        </div>
      )}
    </div>
  );
};


