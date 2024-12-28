 //U2669165 GAJJAR
 // Load environment variables
 const mongoose = require('mongoose');
 //const dotenv = require('dotenv');
 //dotenv.config()
 const connectDB = async () => {
   try {
     const dbURI = process.env.MONGO_URL; // Use MONGO_URI from .env file
     await mongoose.connect(dbURI, {
       useNewUrlParser: true, 
       useUnifiedTopology: true, 
     });
  
     console.log('MongoDB connected successfully');
   } catch (err) {
     console.error('Error connecting to MongoDB:', err.message);
     process.exit(1);
   }
 };
 
 module.exports = connectDB;
 