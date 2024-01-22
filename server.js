let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let assignment = require('./routes/assignments');
let Assignment = require('./model/assignment');
let usersRouter = require('./routes/users');

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('debug', true);

// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s
const uri = 'mongodb+srv://aboulkacimsalah002:159357-Salah@cluster0.oltveac.mongodb.net/assignments?retryWrites=true&w=majority';
let db;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false
};

mongoose.connect(uri, options)
  .then((connectedDb) => {
    db = connectedDb;
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    console.log("vérifiez with http://localhost:8010/api/assignments que cela fonctionne")
    console.log("vérifiez with http://localhost:8010/api/users que cela fonctionne")
    },
    err => {
      console.log('Erreur de connexion: ', err);
    });

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api/users', usersRouter);

let port = process.env.PORT || 8010;

// les routes
const prefix = '/api';
/*
app.route(prefix + '/assignments')
  .get(async (req, res) => {
    try {
      const page = req.query.page || 0;
      const assignmentPerPage = 4;

      // Count total number of assignments
      const totalItems = await Assignment.countDocuments();

      // Fetch paginated assignments
      const assignments = await Assignment.find()
        .sort({ nom: 1 })
        .skip(assignmentPerPage * page)
        .limit(assignmentPerPage);

      // Send the response with paginated data and total count
      res.status(200).json({
        data: assignments,
        totalItems: totalItems
      });
    } catch (error) {
      console.error('Error during assignment retrieval:', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des assignments' });
    }
  });
  */
app.route(prefix + '/assignments')
  .get(assignment.getAssignments);

app.route(prefix + '/assignments/:id')
  .get(assignment.getAssignment)
  .delete(assignment.deleteAssignment);


app.route(prefix + '/assignments')
  .post(assignment.postAssignment)
  .put(assignment.updateAssignment);

  app.route(prefix + '/assignmentsPaginated')
  .get(assignment.getAssignmentsPaginated);
  
// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;


