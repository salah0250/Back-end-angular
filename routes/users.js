let express = require('express');
let User = require('../model/user');

let router = express.Router();

router.post('/', async (req, res) => {
  const { Email, password } = req.body;
  const user = await User.findOne({ Email, password }).exec();
  console.log("POST assignment reçu :");
    console.log(user)
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(401).json({ message: 'Login ou mot de passe incorrect' });
  }
});
router.get('/', async (req, res) => {
    const users = await User.find().exec();
    res.status(200).json(users);
  });
  router.post('/create-account', async (req, res) => {
    try {
      // Check if the email already exists
      const existingUser = await User.findOne({ Email: req.body.Email }).exec();
  
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      // Create a new user if the email is unique
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Erreur lors de la création du compte', error);
      res.status(500).json({ message: 'Erreur lors de la création du compte' });
    }
  });
  
// ajoutez ici d'autres routes si nécessaire

module.exports = router;