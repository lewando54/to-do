const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:8080'
}));

// Import routes
const apiAuth = require('./routes/auth');
const api = require('./routes/api');

dotenv.config();

// Connect to the MongoDB database
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, () => {
    console.log('Connected to DB :)');
});

// Use morgan to log requests to the console
app.use(morgan('dev'));

// Use json request body encoding
app.use(express.json());

// Verify token middleware
const verifyToken = require('./middleware/verifyToken');

// Route middlewares
app.use('/api/auth/', apiAuth);
app.use('/api/v1/', verifyToken , api);

// Start the server on port given by environment or 3000
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});