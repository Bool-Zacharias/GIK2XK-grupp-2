const db = require('../models');


// Funktion som städar upp varukorgens data

function _cleanCart(cart) {
    // mappa om varje rad / skapar bättre struktur för sökningar
    const cleanProducts = cart.CartRows.map(row => ({
      productId: row.Product.id,
      description: row.Product.description,
      price: row.Product.price,
      amount: row.amount,
      imageUrl: row.Product.imageUrl,
    }));
  
    return {
      cart_id: cart.id,
      user_id: cart.user_id,
      products: cleanProducts,
      amount: cart.amount,
    };
  }
  // Get funktion för specifikt varukorg kopplat till användar id som inte är betalt
  async function getCart(user_id) {
    const cart = await db.Cart.findOne({
      where: { user_id: user_id, payed: false },
      include: [{ model: db.CartRow,
      include: [db.Product]
      }]
    });
  
    if (!cart) {
      return { status: 404, data: 'Ingen aktiv varukorg hittades.' };
    }

    // städning av varukorg anroppas för akutell varukorg
    const cleanCart = _cleanCart(cart);
  
    return { status: 200, data: cleanCart };
  }
  
  module.exports = { getCart };
  