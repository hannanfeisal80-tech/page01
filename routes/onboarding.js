const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth'); 
const router = express.Router();

// PUT /api/onboarding/step2
router.put('/step2', auth, async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { ...req.body, step: 2 },
    { new: true }
  );
  res.json(user);
});

// PUT /api/onboarding/step3
router.put('/step3', auth, async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { ...req.body, step: 3 },
    { new: true }
  );
  res.json(user);
});

// PUT /api/onboarding/step4
router.put('/step4', auth, async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { ...req.body, step: 4 },
    { new: true }
  );
  res.json(user);
});

module.exports = router;
