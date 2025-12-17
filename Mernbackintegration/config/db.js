const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectdb = async () => {
    try {
        console.log("Attempting to connect to MongoDB Atlas...");
        
        // Connect WITHOUT the deprecated options
        await mongoose.connect(process.env.MONGO_URL,{
              serverSelectionTimeoutMS: 10000, // Increased to 10 seconds
        });
        
        console.log("✅ Database Connected Successfully");   
    } catch (error) {
        console.error("❌ MongoDB Connection Error sd:", error.message);
        process.exit(1);   
    }
};

module.exports = connectdb;
