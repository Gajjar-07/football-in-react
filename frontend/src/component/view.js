import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './view.css'; // Optional CSS for styling
//import { data } from 'react-router-dom';

export const ViewTeams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/alldata'); // Adjust the endpoint based on your backend
        setTeams(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching team data. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="view-teams-container">
      <h2>Team Data</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <table className="teams-table">
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
            {teams.map((team, index) => (
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
      )}
    </div>
  );
};


