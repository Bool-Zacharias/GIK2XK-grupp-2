const router = require('express').Router();
const db = require('../models');

// Hämta varukorg för en användare
router.get('/:user_id', async (req, res) => {
    try {
        const cart = await db.Cart.findOne({ where: { user_id: req.params.user_id } });
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: 'Ett fel uppstod vid hämtning av varukorg.' });
    }
});

// Lägg till produkt i varukorg
router.post('/', async (req, res) => {
    const { user_id, product_id, amount } = req.body;
    
    if (!user_id || !product_id || amount <= 0) {
        return res.status(400).json({ error: 'Ogiltiga indata.' });
    }

    try {
        const cartRow = await db.CartRow.create({ cart_id: user_id, product_id, amount });
        res.json(cartRow);
    } catch (err) {
        res.status(500).json({ error: 'Ett fel uppstod vid tillägg av produkt i varukorg.' });
    }
});

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
