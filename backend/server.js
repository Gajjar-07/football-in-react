//U2669165 GAJJAR
const express = require('express');
const cors = require('cors');
const connectDB = require('../backend/database/db');
const dotenv = require('dotenv');
const data = require('../backend/model/product');
//const router = require('../BACKEND/Routes/routes')
const bodyParser = require('body-parser');
 
const app = express(); 
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config()

connectDB();
app.get('/alldata', async (req,res) => { 
  const { Team, GamesPlayed, Win, Draw, Loss, GoalsFor, GoalsAgainst, Points, Year } = req.body;
  try{
     const Database =await data.find({});
     res.status(200).json(Database);
  } catch (err){
    res.status(500).json({Message:error.Message});
  } 
}
);
 

app.get('/teams/:name', async (req, res) => {
  try {
    const { name } = req.params; // Extract the name from the URL parameter
    const Team = await data.findOne({ Team: new RegExp(`^${name}$`, 'i') }); // Case-insensitive match

    if (!Team) {
      return res.status(404).json({ message: 'Team not found.' });
    }

    res.status(200).json({Team});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.post('/updateTeam', async (req, res) => {
  const { Team, GamesPlayed, Win, Draw, Loss, GoalsFor, GoalsAgainst, Points, Year } = req.body;

  // Validate the required fields
  if (!Team) {
    return res.status(400).json({ message: 'Team name is required.' });
  }

  try {
    // Use RegExp to perform a case-insensitive search
    const teamRegex = new RegExp(Team, 'i');

    // Find the record by team name using RegExp and update the fields
    const updatedTeam = await data.findOneAndUpdate(
      { Team: teamRegex }, // Match team name using RegExp
      {GamesPlayed,Win,Draw,Loss,GoalsFor,GoalsAgainst,Points, Year,
      },
      { new: true, runValidators: true } // Return the updated document and validate inputs
    );

    if (!updatedTeam) {
      return res.status(404).json({ message: `Team matching '${Team}' not found.` });
    }

    res.status(200).json({ message: 'Team updated successfully!', updatedTeam });
  } catch (error) {
    res.status(500).json({ message: 'Error updating team', error: error.message });
  }
});
app.delete('/teams/delete/:name', async (req, res) => {
    try {
      const { name } = req.params; // Extract the name from the URL parameter
      const deletedTeam = await data.findOneAndDelete({ Team: new RegExp(`^${name}$`, 'i') }); // Case-insensitive match
  
      if (!deletedTeam) {
        return res.status(404).json({ message: 'Team not found. Deletion failed.' });
      }
  
      res.status(200).json({ message: `Team '${deletedTeam.Team}' deleted successfully.` });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  //U2669165 GAJJAR
app.get('/Win', async (req, res) => {
  const { Team, GamesPlayed,  Draw, Loss, GoalsFor, GoalsAgainst, Points, Year } = req.body;
  const { Win } = req.query;
  
    // Validate the required query parameter
    if (!Win || isNaN(Win)) {
      return res.status(400).json({ message: 'Please provide a valid "wins" value as a query parameter.' });
    }
  
    try {
      // Query the database
      const teams = await data.find({ Win: { $gt: Number(Win) } }) // Filter teams with "win" > wins
        .limit(10) // Limit the results to the first 10 records
        .select(Team ,GamesPlayed,Draw,Win, Loss ,GoalsFor, GoalsAgainst, Points ,Year); // Select all columns
  
      if (teams.length === 0) {
        return res.status(404).json({ message: `No teams found with wins greater than ${Win}.` });
      }
  
      res.status(200).json(teams);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving records', error: error.message });
    }
  });
   //U2669165 GAJJAR
  app.get('/teams-by-goals', async (req, res) => {
    const { Year, GoalsFor } = req.query;
  
    if (!Year || !GoalsFor || isNaN(GoalsFor)) {
      return res.status(400).json({ message: 'Please provide a valid year and average goals for.' });
    }
  
    try {
      const teams = await data.find({
        Year: Number(Year),
        GoalsFor: { $gte: Number(GoalsFor) },
      }).select('Team GamesPlayed Win Draw Loss GoalsFor GoalsAgainst Points Year');
  
      if (teams.length === 0) {
        return res.status(404).json({ message: `No teams found for year ${Year} with average Goals For  ${GoalsFor}.` });
      }
  
      res.status(200).json(teams);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving teams.', error: error.message });
    }
  });
  app.get('/totalsforYear', async (req, res) => {
    const { Year } = req.query;
  
    // Validate the query parameter
    if (!Year || isNaN(Year)) {
      return res.status(400).json({ message: 'Please provide a valid year as a query parameter.' });
    }
  
    try {
      // Aggregate total Games Played, Draw, and Wins for the given year
      const totals = await data.aggregate([
        { $match: { Year: Number(Year) } }, // Match the given year
        {
          $group: {
            _id:"", // Single group for totals
            totalGamesPlayed: { $sum: '$GamesPlayed' },
            totalDraw: { $sum: '$Draw' },
            totalWins: { $sum: '$Win' },
          },
        },
      ]);
  
      // Check if any data exists for the year
      if (totals.length === 0) {
        return res.status(404).json({ message: `No data found for the year ${Year}.` });
      }
  
      res.status(200).json(totals[0]); // Send the aggregated totals
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving totals.', error: error.message });
    }
  });
  

app.post('/addteamdata', async (req, res) => {
     const datas = req.body;
     if(!datas.Team || !datas.GamesPlayed || !datas.Win || !datas.Draw  || !datas.Loss  || !datas.GoalsFor  || !datas.GoalsAgainst || !datas.Points || !datas.Year )  {
        return res.status(400).json({ success:false, message:"Please provide all fields"});
     }
     const newdata = new data(datas);
    try {
        await newdata.save();
        res.status(201).json({success:true, product:newdata});

   } catch (errror){
        res.status(500).json({success:false,message:'server error'})
   }

});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
  
  });