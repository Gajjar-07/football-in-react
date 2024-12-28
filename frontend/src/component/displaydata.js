import React, { useState } from 'react';
import axios from 'axios';

export const DisplayTeams = () => {
  const [winThreshold, setWinThreshold] = useState(''); // Input state
  const [teams, setTeams] = useState([]); // Stores fetched team data
  const [error, setError] = useState(''); // Stores error messages

  // Fetch teams based on win threshold
  const fetchTeams = async () => {
    setError(''); // Clear any previous errors
    try {
      const response = await axios.get(`http://localhost:3000/Win`, {
        params: { Win: winThreshold },
      });
      setTeams(response.data); // Update teams state
    } catch (err) {
      setTeams([]); // Clear previous results
      setError(err.response?.data?.message || 'Error fetching teams'); // Set error message
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Display Teams</h1>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="winThreshold" style={{ marginRight: '10px' }}>
          Enter Minimum Wins:
        </label>
        <input
          type="number"
          id="winThreshold"
          value={winThreshold}
          onChange={(e) => setWinThreshold(e.target.value)}
          placeholder="Enter win threshold"
          style={{
            padding: '10px',
            width: '200px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
        <button
          onClick={fetchTeams}
          style={{
            padding: '10px 15px',
            marginLeft: '10px',
            borderRadius: '5px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Fetch Teams
        </button>
      </div>

      {/* Error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display fetched teams */}
      {teams.length > 0 && (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
          }}
        >
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Team</th>
              <th style={tableHeaderStyle}>GamesPlayed</th>
              <th style={tableHeaderStyle}>Win</th>
              <th style={tableHeaderStyle}>Draw</th>
              <th style={tableHeaderStyle}>Loss</th>
              <th style={tableHeaderStyle}>GoalsFor</th>
              <th style={tableHeaderStyle}>GoalsAgainst</th>
              <th style={tableHeaderStyle}>Points</th>
              <th style={tableHeaderStyle}>Year</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr key={index}>
                <td style={tableCellStyle}>{team.Team}</td>
                <td style={tableCellStyle}>{team.GamesPlayed}</td>
                <td style={tableCellStyle}>{team.Win}</td>
                <td style={tableCellStyle}>{team.Draw}</td>
                <td style={tableCellStyle}>{team.Loss}</td>
                <td style={tableCellStyle}>{team.GoalsFor}</td>
                <td style={tableCellStyle}>{team.GoalsAgainst}</td>
                <td style={tableCellStyle}>{team.Points}</td>
                <td style={tableCellStyle}>{team.Year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Styles for table
const tableHeaderStyle = {
  padding: '10px',
  textAlign: 'left',
  borderBottom: '2px solid #ddd',
  backgroundColor: '#007bff',
};
const tableCellStyle = {
  padding: '10px',
  borderBottom: '1px solid #ddd',
};


