const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // WHY: prevents two users from registering with the same username
  },
  phonenumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // WHY: one account per email address
  },
  password: {
    type: String,
    required: true,
    // notice: no "unique" here — passwords obviously repeat across users
  },
}, { timestamps: true });

userSchema.pre('save', async function () {
  
  if (!this.isModified('password')) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 10); // tells Mongoose "I'm done, continue with the save"
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
module.exports = mongoose.model('User', userSchema);