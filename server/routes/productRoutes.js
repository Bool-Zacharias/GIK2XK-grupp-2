const router = require('express').Router();
const db = require('../models');
const product = require('../models/product');
const validate = require('validate.js');
const productService = require("../services/productService");


const constraints = {
  description: {
    length: {
    minimum: 5,
    maximum: 200,
    tooShort: '^Beskrivningen måste vara minst %{count} tecken lång.',
    tooLong: '^Beskrivningen får inte vara längre än %{count} tecken lång.'
    }
},

};

//Hämta alla produkter
router.get('/', (req, res) => {
db.Product.findAll().then((result) => {
    res.send(result);
  });
});

// Hämta specifik produkt med id
router.get('/:id/', (req,res) => {
  db.Product.findByPk(req.params.id, 
    { include: db.Rating })
  
  .then((result)=>{
    res.send(result);
  });
});

router.post('/:id/addRating', (req, res) => {
  db.Product.findByPk(req.params.id)
    .then((product) => {

      // Använd produktens associerade metod för att skapa en rating
      return product.createRating({ rating: req.body.rating });
    })
    .then((newRating) => {
      res.status(201).json(newRating);
    });
});


//skapa produkt
router.post('/', (req, res) => {
  const product = req.body;
  const invalidData = validate(product, constraints);
  if (invalidData) {
    res.status(400).json(invalidData);
  } else {
  db.Product.create(product).then((result) => {
    res.send(result);
  });
}
});

//Ändra produkt
router.put('/', (req, res) => {
db.Product.update(req.body, {
    where: 
    { id: req.body.id }
  })
  .then((result) => {
    res.send(result);
  });
});

//Ta bort produkt
router.delete('/', (req, res) => {
 db.Product
 .destroy({
    where: { id: req.body.id }
  })
  .then((result) => {
    res.json(`Produkten raderades ${result}`);
  });
});

//lägga till i varukorgen
router.post('/:id/addToCart', (req, res) => {
  const { userId, amount } = req.body;

  // Hämta produkten baserat på id från URL:en
  db.Product.findByPk(req.params.id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ error: 'Produkten hittades inte.' });
      }
      // Hitta eller skapa en aktiv varukorg för användaren (purchase_completed = false)
      return productService /* db.Cart.findOrCreate({
        where: { user_id: userId, payed: false },
        defaults: { user_id: userId, payed: false }
      }) */
      .then(([cart]) => {
        // Skapa en ny CartRow som kopplar ihop produkten med varukorgen
        return db.CartRow.create({
          cart_id: cart.id,
          product_id: product.id,
          amount: amount,
          timestamps: true
        });
      });
    })
    .then((cartRow) => {
      res.json(cartRow);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});


module.exports = router;
