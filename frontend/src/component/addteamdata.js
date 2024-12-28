import React, { useState } from 'react';
import axios from 'axios';
import './adddata.css'
//U2669165 GAJJAR
export const AddTeamForm = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/addteamdata', formData);
      alert('Successful '+ response);
    } catch (error) {
      console.error(error);
      alert('Error adding team: ' + error.response?.data?.message || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Team</h2>
      <input type="Text" name="Team" placeholder="Team Name" onChange={handleChange} value={formData.Team} required />
      <input type="Number" name="GamesPlayed" placeholder="Games Played" onChange={handleChange} value={formData.GamesPlayed} required />
      <input type="Number" name="Win" placeholder="Wins" onChange={handleChange} value={formData.Win} required />
      <input type="Number" name="Draw" placeholder="Draws" onChange={handleChange} value={formData.Draw} required />
      <input type="Number" name="Loss" placeholder="Losses" onChange={handleChange} value={formData.Loss} required />
      <input type="Number" name="GoalsFor" placeholder="Goals For" onChange={handleChange} value={formData.GoalsFor} required />
      <input type="Number" name="GoalsAgainst" placeholder="Goals Against" onChange={handleChange} value={formData.GoalsAgainst} required />
      <input type="Number" name="Points" placeholder="Points" onChange={handleChange} value={formData.Points} required />
      <input type="Number" name="Year" placeholder="Year" onChange={handleChange} value={formData.Year} required />
      <button type="submit">Add Team</button>
    </form>
  );
};

