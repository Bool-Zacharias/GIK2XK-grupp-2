module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: DataTypes.STRING, allowNull: false }, // Lägg till detta fält
      description: { type: DataTypes.STRING },
      price: { type: DataTypes.DOUBLE, allowNull: false },
      imageUrl: { type: DataTypes.STRING }
    });
    return Product;
  };
  