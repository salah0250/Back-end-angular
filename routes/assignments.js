let Assignment = require('../model/assignment');
let Matiere = require('../model/matiere');

// Récupérer tous les assignments (GET)
// Récupérer tous les assignments (GET)
function getAssignments(req, res) {
  const startIndex = parseInt(req.query.startIndex) || 0;
  const endIndex = parseInt(req.query.endIndex) || 5;
  const searchTerm = req.query.searchTerm || '';
  const selectedFilter = req.query.selectedFilter ;

  const query = {
    nom: new RegExp(searchTerm, 'i'),
  };

  // Ajouter le filtre rendu uniquement s'il est différent de null
  if (selectedFilter !== null) {
    query.rendu = selectedFilter;
  } else {
  }

  Assignment.find(query)
    .sort({ nom: 1 })
    .skip(startIndex)
    .limit(endIndex - startIndex)
    .populate('matiere') // Utilisez la méthode populate pour inclure les détails de la matière
    .exec((err, assignments) => {
      if (err) {
        res.send(err);
      }

      res.json(assignments);
    });
}
function getAssignmentsPaginated(req, res) {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const endIndex = parseInt(req.query.endIndex) || 5; // Adjust the default value as per your requirement
  
    Assignment.find()
      .sort({ nom: 1 })
      .skip(startIndex)
      .limit(endIndex)
      .exec((err, assignments) => {
        if (err) {
          res.send(err);
        }
  
        res.json(assignments);
      });
  }

// Récupérer un assignment par son id (GET)
function getAssignment(req, res){
  let assignmentId = req.params.id;

  Assignment.findOne({id: assignmentId})
  .populate('matiere') // suppose que 'matiere' est le champ dans le modèle Assignment qui fait référence à la collection Matiere
  .exec((err, assignment) => {
      if(err){res.send(err)}
      res.json(assignment);
  })
}

// Ajout d'un assignment (POST)
function postAssignment(req, res){
    let assignment = new Assignment();
    assignment.id = req.body.id;
    assignment.auteurs = req.body.auteurs;
    assignment.nom = req.body.nom;
    assignment.dateDeRendu = req.body.dateDeRendu;
    assignment.rendu = req.body.rendu;
    console.log(req.body.matiere);
    console.log("POST assignment reçu :");
    Matiere.findOne({ non_matiere: req.body.matiere }, (err, matiere) => {
      console.log(matiere);
      if (err) {
          return res.status(500).json({ error: 'Error retrieving subject details' });
      }

      if (!matiere) {
          return res.status(404).json({ error: 'Subject not found' });
      }
      assignment.matiere = matiere._id; // Utilisez l'ID de la Matière

      // Enregistrez l'Assignment après avoir peuplé les détails de la Matière
      assignment.save((err) => {
          if (err) {
              return res.status(500).json({ error: 'Error saving assignment', details: err });
          }
          res.json({ message: `${assignment.nom} saved!` });
      });
  });
}

// Update d'un assignment (PUT)
// Update d'un assignment (PUT)
// Update d'un assignment (PUT)
function updateAssignment(req, res) {
  console.log("UPDATE recu assignment : ");
  console.log(req.body);

  Matiere.findOne({ non_matiere: req.body.matiere.non_matiere }, (err, matiere) => {
      if (err) {
          return res.status(500).json({ error: 'Error retrieving subject details' });
      }

      if (!matiere) {
          return res.status(404).json({ error: 'Subject not found' });
      }

      req.body.matiere = matiere._id; // Utilisez l'ID de la Matière

      Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
          if (err) {
              console.log(err);
              res.send(err)
          } else {
            res.json({message: 'updated'})
          }
      });
  });
}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {

    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${assignment.nom} deleted`});
    })
}



module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment, getAssignmentsPaginated };
