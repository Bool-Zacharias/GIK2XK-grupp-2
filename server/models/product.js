module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        description: { type: DataTypes.STRING },
        price: { type: DataTypes.DOUBLE, allowNull: false },
        created_at: {type: DataTypes.DATE},
        updated_at: {type: DataTypes.DATE},
        imageUrl: { type: DataTypes.STRING}
    });



    return Product;
};