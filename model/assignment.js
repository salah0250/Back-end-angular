let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AssignmentSchema = Schema({
    id: Number,
    auteurs: String, // Référence vers la collection 'users'
    matiere: {
        type: Schema.Types.ObjectId,
        ref: 'Matiere'
    },    nom: String,
    dateDeRendu: Date,
    Notes: Number,
    Remarque: String,
    rendu: Boolean
});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Assignment', AssignmentSchema);
