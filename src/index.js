require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");

const tikRoute = require("./routes/tikRoute");
const youRoute = require("./routes/youRoute");

// Initialize express app
const app = express();

// Server port
const PORT = process.env.PORT || 5000;

// MongoDB connection URL and database name (from environment variables)
const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
(async () => {
    try {
        await mongoose.connect(MONGO_URL, {
            dbName: DB_NAME
        });
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Exit the process if DB connection fails
    }
})();

// Routes
app.get("/", (req, res) => res.status(200).send("welcome to web scraping"));
app.use("/api/tiktok", tikRoute);
app.use("/api/youtube", youRoute);

// Start HTTP server
const server = http.createServer(app);
// Set server timeout to 15 seconds
server.timeout = 60000; // Time in milliseconds
server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

// Cron job with overlap prevention
let isJobRunning = false;

// cron.schedule("*/15 * * * *", async () => {
//     if (isJobRunning) {
//         console.log("Previous job is still running. Skipping this cycle.");
//         return;
//     }

//     isJobRunning = true;
//     console.log("Cron job started at:", new Date());

//     try {
//         await getAllMovies(); // Call your function
//     } catch (error) {
//         console.error("Error in cron job:", error);
//     } finally {
//         isJobRunning = false;
//         console.log("Cron job finished at:", new Date());
//     }
// });
