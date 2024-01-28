let mongoose = require('mongoose');


let matiereSchema =new  mongoose.Schema({
    non_matiere: String,
    professeur: String,
    image: String
}, { collection: 'matiere' });

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Matiere', matiereSchema);
