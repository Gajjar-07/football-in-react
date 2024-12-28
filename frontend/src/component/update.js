import React, { useState } from 'react';
import axios from 'axios';
import './update.css'; // Import CSS for styling

export const UpdateTeam = () => {
  const [formData, setFormData] = useState({
    "Team": '',
    "GamesPlayed": '',
    "Win": '',
    "Draw": '',
    "Loss": '',
    "GoalsFor": '',
    "GoalsAgainst": '',
    "Points": '',
    "Year": '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.Team) {
      setMessage({ text: 'Please enter a valid team name.', type: 'error' });
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3000/updateTeam`, formData);
      setMessage({ text: response.data.message, type: 'success' });
      setFormData({
        "Team": '',
        "GamesPlayed": '',
        "Win": '',
        "Draw": '',
        "Loss": '',
        "GoalsFor": '',
        "GoalsAgainst": '',
        "Points": '',
        "Year": '',
      }); // Reset form fields
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || 'Error updating team.',
        type: 'error',
      });
    }
  };

  return (
    <div className="update-team-container">
      <h2>Update Team Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Team">Team Name</label>
          <input
            type="text"
            id="Team"
            name="Team"
            placeholder="Enter team name"
            value={formData.Team}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="GamesPlayed">Games Played</label>
          <input
            type="number"
            id="GamesPlayed"
            name="GamesPlayed"
            placeholder="Enter games played"
            value={formData.GamesPlayed}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="Win">Wins</label>
          <input
            type="number"
            id="Win"
            name="Win"
            placeholder="Enter wins"
            value={formData.Win}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="Draw">Draws</label>
          <input
            type="number"
            id="Draw"
            name="Draw"
            placeholder="Enter draws"
            value={formData.Draw}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="Loss">Losses</label>
          <input
            type="number"
            id="Loss"
            name="Loss"
            placeholder="Enter losses"
            value={formData.Loss}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="GoalsFor">Goals For</label>
          <input
            type="number"
            id="GoalsFor"
            name="GoalsFor"
            placeholder="Enter goals scored"
            value={formData.GoalsFor}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="GoalsAgainst">Goals Against</label>
          <input
            type="number"
            id="GoalsAgainst"
            name="GoalsAgainst"
            placeholder="Enter goals conceded"
            value={formData.GoalsAgainst}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="Points">Points</label>
          <input
            type="number"
            id="Points"
            name="Points"
            placeholder="Enter points"
            value={formData.Points}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="Year">Year</label>
          <input
            type="number"
            id="Year"
            name="Year"
            placeholder="Enter year"
            value={formData.Year}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="update-button">Update Team</button>
      </form>
      {message && (
        <p className={`message ${message.type === 'success' ? 'success' : 'error'}`}>
          {message.text}
        </p>
      )}
    </div>
  );
};


