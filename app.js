const express = require('express');
const connectDB = require('./Backend/Config/db');
const path = require('path'); 

const app = express();
const port = 3000;
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'Frontend'))); 

// Import routes
const adminRoutes = require('./Backend/Routes/adminRoutes'); 
const userRoutes = require('./Backend/Routes/userRoutes'); 

// Use routes
// Define a root route
app.get('/', (req, res) => { return res.redirect('/public/index.html'); });
app.use('/api/admin', adminRoutes); // Admin API endpoints
app.use('/api/user', userRoutes); // User API endpoints

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
