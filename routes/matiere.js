// matiere.js (ou le fichier où vous gérez les routes pour les matieres)

let express = require('express');
let router = express.Router();
let Matiere = require('../model/matiere');

router.get('/:matiereId', (req, res) => {
    const matiereId = req.params.matiereId;
  
    Matiere.findById(matiereId, (err, matiere) => {
      if (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération des détails de la matière' });
      } else {
        res.json(matiere);
      }
    });
  });

// ajoutez ici d'autres routes si nécessaire

module.exports = router;