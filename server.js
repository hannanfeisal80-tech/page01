require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const onboardingRoutes = require('./routes/onboarding');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/onboarding', onboardingRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));



app.get('/', (req, res) => res.send('hack01 API running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
