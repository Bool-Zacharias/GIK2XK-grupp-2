const router = require('express').Router();
const db = require('../models');
const product = require('../models/product');
const validate = require('validate.js');

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
  db.Product.findById(req.params.id).then((result)=>{
    res.send(result);
  });
});

//Lägga till
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

//Lägg till betyg på produkt
router.post('/:id/addRating', (req, res) => {
  db.Product.findById(req.params.id)
  .then((result) => {
      product.ratings.push(rating);
      return result.save();
    })
  .then((result)=>{
    res.send(result);
  });
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

//productRoute för varukorgen addProduct
router.post('/addProduct', async (req, res) => {
  
    // Förväntar sig att body innehåller: userId, productId, amount
    const { userId, productId, amount } = req.body;
    
    // Hämta den senaste aktiva varukorgen för användaren.
    // Här antas att en aktiv varukorg har purchaseCompleted satt till false.
    const [cart, cartCreated] = await db.Cart.findOrCreate({
      where: { user_id: userId, purchaseCompleted: false },
      defaults: { user_id: userId, purchaseCompleted: false }
    });
    
    // Kolla om produkten redan finns i varukorgen
    const existingCartRow = await db.CartRow.findOne({
      where: { cart_id: cart.id, product_id: productId }
    });
    
    let cartRow;
    if (existingCartRow) {
      // Om produkten redan finns, uppdatera antalet
      cartRow = await existingCartRow.update({
        amount: existingCartRow.amount + parseInt(amount, 10)
      });
    } else {
      // Annars, skapa en ny rad i varukorgen
      cartRow = await db.CartRow.create({
        cart_id: cart.id,
        product_id: productId,
        amount: amount
      });
    }
    
    return res.status(200).json({
      message: 'Produkt tillagd i varukorgen.',
      cartId: cart.id,
      cartRow: cartRow
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
      return db.Cart.findOrCreate({
        where: { user_id: userId, purchase_completed: false },
        defaults: { user_id: userId, purchase_completed: false }
      })
      .then(([cart, created]) => {
        // Skapa en ny CartRow som kopplar ihop produkten med varukorgen
        return db.CartRow.create({
          cart_id: cart.id,
          product_id: product.id,
          amount: amount
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
