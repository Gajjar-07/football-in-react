import React, { useState } from 'react';
import axios from 'axios';
import './avgGoal.css'; // For styling

export const QueryTeams = () => {
  const [formData, setFormData] = useState({
    "Year": '',
    "GoalsFor": '',
  });
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://localhost:3000/teams-by-goals', {
        params: {
          Year: formData.Year,
          GoalsFor: formData.GoalsFor,
        },
      });
      setResults(response.data);
      setMessage('');
    } catch (error) {
      setResults([]);
      setMessage(error.response?.data?.message || 'Error fetching data.');
    }
  };

  return (
    <div className="query-teams-container">
      <h2>Query Teams by Average Goals For</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Year">Year</label>
          <input
            type="Number"
            id="Year"
            name="Year"
            placeholder="Enter year"
            value={formData.Year}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="GoalsFor">Average Goals For</label>
          <input
            type="Number"
            id="GoalsFor"
            name="GoalsFor"
            placeholder="Enter average goals for"
            value={formData.GoalsFor}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="query-button">Query</button>
      </form>

      {message && <p className="message error">{message}</p>}

      {results.length > 0 && (
        <div className="results">
          <h3>Teams Matching Criteria</h3>
          <table>
            <thead>
              <tr>
                <th>Team</th>
                <th>Games Played</th>
                <th>Win</th>
                <th>Draw</th>
                <th>Loss</th>
                <th>Goals For</th>
                <th>Goals Against</th>
                <th>Points</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {results.map((team, index) => (
                <tr key={index}>
                  <td>{team.Team}</td>
                  <td>{team.GamesPlayed}</td>
                  <td>{team.Win}</td>
                  <td>{team.Draw}</td>
                  <td>{team.Loss}</td>
                  <td>{team.GoalsFor}</td>
                  <td>{team.GoalsAgainst}</td>
                  <td>{team.Points}</td>
                  <td>{team.Year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};


