const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  cityCountry: { type: String, trim: true },

  // Onboarding progress 1-4
  step: { type: Number, default: 1, min: 1, max: 4 },
  
  // Step 2-4 fields
  bio: { type: String },
  skills: [String ],
  profilePic: { type: String },

  createdAt: {type: Date, default: Date.now}
});

const bcrypt = require('bcryptjs');

// Add this to your existing userSchema
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Add this method for login later
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
