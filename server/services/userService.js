// I din userService (t.ex. cartService.js eller userService.js)

// Funktion som "städar upp" varukorgens data på ett liknande sätt som _formatPost
function _cleanCart(cart) {
    // Om cart.CartRows finns, mappa om varje rad
    const cleanProducts = cart.CartRows.map(row => ({
      productId: row.Product.id,
      description: row.Product.description,
      price: row.Product.price,
      amount: row.amount,
      imageUrl: row.Product.imageUrl,
      // Eventuellt andra fält ni vill inkludera
      // createdAt: row.createdAt,  // Om det är relevant
      // updatedAt: row.updatedAt
    }));
  
    return {
      cartId: cart.id,
      user_id: cart.user_id,
      products: cleanProducts,
      // Ni kan lägga till övrig varukorgsinformation om det behövs
    };
  }
  
  async function getCart(user_id) {
    const cart = await db.Cart.findOne({
      where: { user_id: user_id, payed: false }, // Endast aktiv varukorg
      include: [{
        model: db.CartRow,
        include: [db.Product]
      }]
    });
  
    if (!cart) {
      return { status: 404, data: 'Ingen aktiv varukorg hittades.' };
    }
  
    // Använd den "städat upp" funktionen för att skapa en ren version av cart-data
    const cleanCart = _cleanCart(cart);
  
    return { status: 200, data: cleanCart };
  }
  
  module.exports = { getCart };
  