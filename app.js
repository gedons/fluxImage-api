const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./route/authRoutes');
const userRoutes = require('./route/userRoutes');
const imageRoutes = require('./route/imageRoutes');
const config = require('./config/config');
const authMiddleware = require('./middleware/authMiddleware');
//const userRoutes = require('./route/userRoute');
// const hankoAuthMiddleware = require('./middleware/hankoAuthMiddleware');

const app = express();
const corsOptions = {
  origin: 'https://flux-image.onrender.com', 
  credentials: true,
};
app.use(cors(corsOptions));
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Middleware
app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(hankoAuthMiddleware()); 

// Routes
app.use('/api/user', userRoutes);
app.use('/api/image', imageRoutes);
app.use('/api/auth', authRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
