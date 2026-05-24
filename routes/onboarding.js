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

// PUT /api/onboarding/cohort
router.put('/cohort', auth, async (req, res) => {
  try {
    const { cohort } = req.body;

    if (!cohort || cohort < 1 || cohort > 15) {
      return res.status(400).json({ message: "Cohort must be between 1 and 15" });
    }

    const user = await User.findByIdAndUpdate(
      req.user._Id || req.user.id,
      { cohort},
      { new: true, select: '-password' }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Cohort updated", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
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
