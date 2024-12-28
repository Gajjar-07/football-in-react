//U2669165 GAJJAR
const mongoose = require('mongoose');
const footballSchema = new mongoose.Schema(
    {
    Team: { 
        type: String, 
        required: true
    },
    GamesPlayed: {
         type: Number,  
         required: true, 
        },
    Win: { 
        type: Number, 
        required: true, 
    },
    Draw: { 
        type: Number, 
        required: true,  
    },
    Loss: { 
        type: Number, 
        required: true, 
    },
    GoalsFor: { 
        type: Number, 
        required: true, 
    },
    GoalsAgainst: { 
        type: Number, 
        required: true,   
    },
    Points: { 
        type: Number,
         required: true,
        },
    Year: { 
        type: Number,  
        required: true,
    },
   }
);
const data = mongoose.model('footballes', footballSchema);
module.exports= data;
