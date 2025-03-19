'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && 
      file !== basename && 
      file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

// Här nedan kan du lägga associationer direkt
// efter att alla modeller har laddats in

// 2. Hämta ut modellerna från db-objektet
const { User, Cart, CartRow, Product, Rating } = db;

// 3. Definiera alla relationer här
// Exempel (1:N) - En user kan ha många carts
User.hasMany(Cart, { foreignKey: 'user_id' });
Cart.belongsTo(User, { foreignKey: 'user_id' });

// (1:N) - En cart kan ha många cart_rows
Cart.hasMany(CartRow, { foreignKey: 'cart_id' });
CartRow.belongsTo(Cart, { foreignKey: 'cart_id' });

// (1:N) - En produkt kan ha många cart_rows
Product.hasMany(CartRow, { foreignKey: 'product_id' });
CartRow.belongsTo(Product, { foreignKey: 'product_id' });

// (1:N) - En produkt kan ha många ratings
Product.hasMany(Rating, { foreignKey: 'product_id' });
Rating.belongsTo(Product, { foreignKey: 'product_id' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
