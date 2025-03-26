const db = require('../models');

// Lägga till produkt i varukorg
async function findOrCreate(user_id) {
    const [cart, created] = await db.Cart.findOrCreate({
        where: { user_id: user_id }
    });

    return { status: 200, data: cart, created };
}


// samma funktion som att lägga till kommentarer i blog
module.exports = { findOrCreate };