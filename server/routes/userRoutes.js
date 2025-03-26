// Här sätter vi requerements till models, och services sökvägen

const router = require('express').Router();
const db = require('../models');
const validate = require('validate.js');
const userService = require("../services/userService");

// Här skapar vi constraints för validate
const constraints = {
  email: {
    length: {
      minimum: 4,
      maximum: 200,
      tooShort: '^E-postadressen måste vara minst %{count} tecken lång.',
      tooLong: '^E-postadressen får inte vara längre än %{count} tecken lång.'
    },
    email: {
      message: '^E-postadressen är i ett felaktigt format.'
    }
  },
  password: {
    length: {
      minimum: 6,
      message: '^Lösenordet måste vara minst %{count} tecken långt.'
    }
  }
};

// Fel meddelandena är handskrivna 
// Hämta en specifik användare via ID
router.get('/:id', (req, res) => {
  db.User.findByPk(req.params.id, { attributes: { exclude: ['password'] } })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'Användaren hittades inte' });
      }
    });
});

// Hämtar varukorg för en användare
router.get('/:id/getCart/', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userService.getCart(id);
    res.status(result.status).json(result.data);
  } catch (error) {
    res.status(500).json({ error: 'Det fannns ingen varukorg för användaren'});
  }
});


// Skapa en ny användare (så vi kan lägga till produkter i varukorgen kopplat till en användare)
router.post('/', (req, res) => {
  const user = req.body;
  const invalidData = validate(user, constraints);
  if (invalidData) {
    res.status(400).json(invalidData);
  } else {
    db.User.create(user).then((newUser) => {
      res.status(201).json({
         id: newUser.id,
        email: newUser.email, 
        first_Name: newUser.first_Name, 
        last_Name: newUser.last_Name, 
        created_At: newUser.created_At, 
        updated_At: newUser.updated_At, 
        password: newUser.password });
    });
  }
});


// Uppdatera användare (Om användaren vill byta någon information)
router.put('/', (req, res) => {
  const user = req.body;
  const invalidData = validate(user, constraints);
  if (invalidData || !user.id) {
    res.status(400).json(invalidData || 'Id är obligatoriskt.');
  } else {
    db.User
    .update(user, { where: { id: user.id } })
      .then(() => res.send('Användaren har uppdaterats.'));
  }
});

// Ta bort användare
router.delete('/', (req, res) => {
  db.User
    .destroy({
      where: { id: req.body.id }
    })
    .then(() => {
      res.json(`Användaren raderades`);
    });
});


module.exports = router;
