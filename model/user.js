let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
  id : Number,
  Nom: String,
  Email: String,
  password: String,
  role: String,
  // ajoutez ici d'autres champs si nécessaire
});

module.exports = mongoose.model('User', UserSchema);