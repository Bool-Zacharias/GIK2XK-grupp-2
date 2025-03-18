const router = require('express').Router();
const db = require('../models');

// Hämta alla betyg för en produkt
router.get('/:product_id', async (req, res) => {
    try {
        const ratings = await db.Rating.findAll({ where: { product_id: req.params.product_id } });
        res.json(ratings);
    } catch (err) {
        res.status(500).json({ error: 'Ett fel uppstod vid hämtning av betyg.' });
    }
});

// Lägga till ett betyg
router.post('/', async (req, res) => {
    const { user_id, product_id, rating } = req.body;
    
    if (!user_id || !product_id || rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Ogiltiga indata.' });
    }

    try {
        const newRating = await db.Rating.create({ user_id, product_id, rating });
        res.json(newRating);
    } catch (err) {
        res.status(500).json({ error: 'Ett fel uppstod vid skapande av betyg.' });
    }
});

// Radera ett betyg
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await db.Rating.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.json({ message: 'Betyget raderades.' });
        } else {
            res.status(404).json({ error: 'Betyget hittades inte.' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Ett fel uppstod vid borttagning av betyg.' });
    }
});

module.exports = router;
