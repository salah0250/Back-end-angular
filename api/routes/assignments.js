let Assignment = require('../model/assignment');

// Récupérer tous les assignments (GET)
function getAssignments(req, res) {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const endIndex = parseInt(req.query.endIndex) || 5; // Adjust the default value as per your requirement
  
    Assignment.find()
      .sort({ nom: 1 })
      .skip(startIndex)
      .limit(endIndex - startIndex) // Adjust the limit based on the range
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

    Assignment.findOne({id: assignmentId}, (err, assignment) =>{
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

    console.log("POST assignment reçu :");
    console.log(assignment)

    assignment.save( (err) => {
        if(err){
            res.send('cant post assignment ', err);
        }
        res.json({ message: `${assignment.nom} saved!`})
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: 'updated'})
        }

      // console.log('updated ', assignment)
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
