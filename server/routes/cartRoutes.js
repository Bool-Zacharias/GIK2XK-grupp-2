const router = require('express').Router();
const db = require('../models');

// Hämta en användares varukorg och dess produkter
router.get('/:user_id', async (req, res) => {
    try {
        const cart = await db.Cart.findOne({
            where: { user_id: req.params.user_id },
            include: [
                {
                    model: db.CartRow,
                    include: [{ model: db.Product }]
                }
            ]
        });

        if (!cart) {
            return res.status(404).json({ error: 'Ingen varukorg hittades för denna användare.' });
        }

        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: 'Ett fel uppstod vid hämtning av varukorg.', details: err.message });
    }
});

// Lägg till en produkt i varukorgen
router.post('/', async (req, res) => {
    const { user_id, product_id, amount } = req.body;

    if (!user_id || !product_id || amount <= 0) {
        return res.status(400).json({ error: 'Ogiltiga indata.' });
    }

    try {
        // Hämta eller skapa varukorg
        let cart = await db.Cart.findOne({ where: { user_id } });
        if (!cart) {
            cart = await db.Cart.create({ user_id, payed: false });
        }

        // Kontrollera om produkten redan finns i varukorgen
        let cartRow = await db.CartRow.findOne({ where: { cart_id: cart.id, product_id } });

        if (cartRow) {
            cartRow.amount += amount;
            await cartRow.save();
        } else {
            cartRow = await db.CartRow.create({ cart_id: cart.id, product_id, amount });
        }

        res.json(cartRow);
    } catch (err) {
        res.status(500).json({ error: 'Ett fel uppstod vid tillägg av produkt i varukorg.', details: err.message });
    }
});

// Uppdatera mängden av en produkt i varukorgen
router.put('/', async (req, res) => {
    const { cart_row_id, amount } = req.body;

    if (!cart_row_id || amount <= 0) {
        return res.status(400).json({ error: 'Ogiltiga indata.' });
    }

    try {
        const cartRow = await db.CartRow.findByPk(cart_row_id);

        if (!cartRow) {
            return res.status(404).json({ error: 'Produkten hittades inte i varukorgen.' });
        }

        cartRow.amount = amount;
        await cartRow.save();

        res.json({ message: 'Produktens mängd uppdaterad.', cartRow });
    } catch (err) {
        res.status(500).json({ error: 'Ett fel uppstod vid uppdatering av varukorg.', details: err.message });
    }
});

// Ta bort en produkt från varukorgen
router.delete('/:cart_row_id', async (req, res) => {
    try {
        const deleted = await db.CartRow.destroy({ where: { id: req.params.cart_row_id } });

        if (deleted) {
            res.json({ message: 'Produkt borttagen från varukorg.' });
        } else {
            res.status(404).json({ error: 'Produkten hittades inte i varukorgen.' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Ett fel uppstod vid borttagning av produkt.', details: err.message });
    }
});

// Rensa hela varukorgen för en användare
router.delete('/clear/:user_id', async (req, res) => {
    try {
        const cart = await db.Cart.findOne({ where: { user_id: req.params.user_id } });

        if (!cart) {
            return res.status(404).json({ error: 'Ingen varukorg hittades för denna användare.' });
        }

        await db.CartRow.destroy({ where: { cart_id: cart.id } });

        res.json({ message: 'Varukorgen har tömts.' });
    } catch (err) {
        res.status(500).json({ error: 'Ett fel uppstod vid rensning av varukorg.', details: err.message });
    }
});

module.exports = router;
