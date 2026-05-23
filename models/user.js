const mongoose = require('mongoose');


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


userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password,10);
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
