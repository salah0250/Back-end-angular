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

// ajoutez ici d'autres routes si nécessaire

module.exports = router;