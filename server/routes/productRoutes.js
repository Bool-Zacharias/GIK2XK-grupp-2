//Hanterar alla olika routes för produkter
const router = require('express').Router(); //importerar express och skapar en router
const db = require('../models'); //skapar upp ett db objekt som innehåller alla modeller
const product = require('../models/product'); 
const validate = require('validate.js'); //importerar validate.js för att validera data
const productService = require("../services/productService"); //importerar productService för att kunna använda funktioner från den

//Skapar upp constraints för att validera data
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

// Hämta alla produkter med betyg
//Ropar på router.get och skickar in en callback funktion med req och res som parametrar
//hämtar alla produkter med betyg och skickar tillbaka det
router.get('/', (req, res) => {
  db.Product.findAll({ include: db.Rating }).then((result) => {
    const productsWithRatings = result.map(product => ({
      ...product.toJSON(),
      ratings: product.Ratings.map(r => r.rating)
    }));
    res.send(productsWithRatings);
  });
});

// Hämta specifik produkt med id
//Ropar på router.get med endpointen /:id/ och skickar in en callback funktion med req och res som parametrar
//Hämtar en specifik produkt med id och skickar tillbaka det
router.get('/:id/', (req,res) => {
  db.Product.findByPk(req.params.id, { include: db.Rating })
    .then((product) => {
      const result = {
        ...product.toJSON(),
        ratings: product.Ratings.map(r => r.rating)
      };
      res.send(result);
    });
});

//Lägga till betyg på en produkt
router.post('/:id/addRating', async (req, res) => {
  //Hämtar id och rating från req.params och req.body
  const { id } = req.params;
  const { rating } = req.body;

  try {
    const product = await db.Product.findByPk(id);
    if (!product) return res.status(404).json({ error: 'Produkten hittades inte.' });

    await product.createRating({ rating });

    //Inkluderar rating för att få med den när vi lägger ett betyg på produkten till ett specifikt id
    const updatedProduct = await db.Product.findByPk(id, {
      include: [db.Rating],
    });
    //Istället för att skriva all information använder vi Sequalize spread operator. Källa: https://sequelize.org/docs/v7/querying/operators/
    res.status(201).json({
      ...updatedProduct.toJSON(),
      //Hämtar alla betyg och skapar en array med alla betyg, lägger till en ny egenskap manuellt och extraherer enbart siffrorna
      ratings: updatedProduct.Ratings.map(r => r.rating),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Något gick fel när betyget skulle sparas' });
  }
});


//skapa produkt
router.post('/', (req, res) => {
  //Hämtar produkt från req.body
  const product = req.body;
  //Validerar data
  const invalidData = validate(product, constraints);
  if (invalidData) {
    res.status(400).json(invalidData);
  } else {
    //Skapar en produkt och skickar tillbaka det
  db.Product.create(product).then((result) => {
    res.send(result);
  });
}
});

//Ändra produkt
router.put('/', (req, res) => {
  //Uppdaterar produkt och skickar tillbaka det 
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
router.post('/:id/addToCart', async (req, res) => {
  //Hämtar user_id och amount från req.body
  const { user_id, amount } = req.body;

  try {
    //Hämtar primary key med id från req.params
    const product = await db.Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Produkten hittades inte.' });

    //Anropar findOrCreate funktionen från productService och skickar in user_id
    const cartResult = await productService.findOrCreate(user_id);
    //Sparar ner cart från cartResult.data
    const cart = cartResult.data;

    //Skapar en cartRow och skickar in cart.id, product.id och amount
    const cartRow = await db.CartRow.create({
      cart_id: cart.id,
      product_id: product.id,
      amount: Number(amount),
    });
    //Skickar tillbaka cartRow
    res.status(201).json(cartRow);
  } catch (error) {
    console.error("SERVERFEL:", error);
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;

/* Hämta alla produkter */
/* GET */
/* http://localhost:3000/product/ */

/* ===================================================
   Skapa en användare
   ---------------------------------------------------
   HTTP-metod: POST
   URL: http://localhost:5000/user/
   Fält som behövs: 
     - email
     - first_Name
     - last_Name
     - password
=================================================== */

/* ===================================================
   Skapa en produkt
   ---------------------------------------------------
   HTTP-metod: POST
   URL: http://localhost:5000/product/
   Fält som behövs:
     - description
     - price
     - imageUrl
=================================================== */

/* ===================================================
   Lägg till en produkt i varukorgen
   ---------------------------------------------------
   HTTP-metod: POST
   URL: http://localhost:5000/product/{produktId}/addToCart
   Fält som behövs:
     - user_id
     - amount
=================================================== */

/* ===================================================
   Hämta varukorgen för en användare
   ---------------------------------------------------
   HTTP-metod: GET
   URL: http://localhost:5000/user/{user_id}/getCart/
=================================================== */

/* ===================================================
   Lägg betyg på en produkt
   ---------------------------------------------------
   HTTP-metod: POST
   URL: http://localhost:5000/product/{produktId}/addRating
    Fält som behövs:
      - rating
   
=================================================== */

/* ===================================================
   Hämta en specifik användare
   ---------------------------------------------------
   HTTP-metod: GET
   URL: http://localhost:5000/user/{user_id}
=================================================== */

/* ===================================================
   Uppdatera och/eller radera en användare
   ---------------------------------------------------
   Uppdatera:
     - HTTP-metod: PUT
     - URL: http://localhost:5000/user/
   Radera:
     - HTTP-metod: DELETE
     - URL: http://localhost:5000/user/
     - Fält som behövs: 
         * id (skickas i body, ex. via x-www-form-urlencoded)
=================================================== */
