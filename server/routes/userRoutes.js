const router = require('express').Router();
const db = require('../models');
const validate = require('validate.js');
const userService = require("../services/userService");


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

// Hämtar en cart med specifikt användar id och visar alla produkter i cart
router.get('/:id/getCart/', (req, res) => {
  db.User.findById(req.params.id).then((user) => {
    db.carts.findOne({
      where: { user_id: user.id },
      order: [["createdAt"]],
    }).then((cart) => {
      db.cart_rows.findAll({
        where: { cart_id: cart.id },
        include: [{ model: db.products }],
      }).then((cartItems) => {
        res.send({ cart, products: cartItems });
      });
    });
  });
});

// Skapa en ny användare 
router.post('/', (req, res) => {
  const user = req.body;
  const invalidData = validate(user, constraints);
  if (invalidData) {
    res.status(400).json(invalidData);
  } else {
    db.User.create(user).then((newUser) => {
      res.status(201).json({ id: newUser.id, email: newUser.email, first_Name: newUser.first_Name, last_Name: newUser.last_Name, created_At: newUser.created_At, updated_At: newUser.updated_At, password: newUser.password });
    });
  }
});


// Uppdatera användare
router.put('/', (req, res) => {
  const user = req.body;
  const invalidData = validate(user, constraints);
  if (invalidData || !user.id) {
    res.status(400).json(invalidData || 'Id är obligatoriskt.');
  } else {
    db.User.update(user, { where: { id: user.id } })
      .then(() => res.send('Användaren har uppdaterats.'));
  }
});

// Ta bort användare
router.delete('/', (req, res) => {
  db.User.destroy({ where: { id: req.body.id } })
    .then(() => res.json('Användaren har raderats.'));
});

module.exports = router;
