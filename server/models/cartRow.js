module.exports = (sequelize, DataTypes) => {
    const cartRow = sequelize.define('cartRow', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        amount: { type: DataTypes.DOUBLE, allowNull: false }
    }, { timestamps: true, underscored: true });

    cartRow.associate = (models) => {
        cartRow.belongsTo(models.Cart, { foreignKey: 'cart_id', onDelete: 'CASCADE' });  // FK till varukorg
        cartRow.belongsTo(models.Product, { foreignKey: 'product_id' }); // FK till produkt
    };

    return cartRow;
};
