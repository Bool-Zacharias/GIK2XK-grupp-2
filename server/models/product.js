// Skapa en modell för produkter
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING },
      price: { type: DataTypes.DOUBLE, allowNull: false },
      imageUrl: { type: DataTypes.STRING }
    });
    return Product;
  };
  