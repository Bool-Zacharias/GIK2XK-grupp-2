const router = require('express').Router();
const db = require('../models');

// Hämta alla produkter
router.get('/', async (req, res) => {
    try {
        const cart = await db.Cart.findOne({ where: { user_id: req.params.user_id } });
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: 'Ett fel uppstod vid hämtning av varukorg.' });
    }
});

// Hämta specifik produkt + betyg
router.get('/:id/', async (req, res) => {
    try {
        const cart = await db.Cart.findOne({ where: { user_id: req.params.user_id } });
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: 'Ett fel uppstod vid hämtning av varukorg.' });
    }
});

// lägga till post, byta ut put, ta bort delete

// Post opp ge betyg till en produkt

// Lägg till betyg på en produkt
router.post('/:id/addRating', async (req, res) => {
    const { rating } = req.body;
    const productId = req.params.id;
  
    // Validera betyget
    const invalidData = validate({ rating });
    if (invalidData) {
      return res.status(400).json(invalidData);
    }
  
    try {
      // Kontrollera om produkten finns
      const product = await db.Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ error: 'Produkten hittades inte' });
      }
  
      // Skapa nytt betyg
      const newRating = await db.Rating.create({
        rating,
        Product_id: productId
      });
  
      res.status(201).json(newRating);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Något gick fel vid betygssättningen.' });
    }
  });

  // Uppdatera betyg på en produkt

// Radera produkt från varukorg
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await db.CartRow.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.json({ message: 'Produkt borttagen från varukorg.' });
        } else {
            res.status(404).json({ error: 'Produkten hittades inte i varukorgen.' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Ett fel uppstod vid borttagning av produkt.' });
    }
});

module.exports = router;
