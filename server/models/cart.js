module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        payed: { type: DataTypes.BOOLEAN, defaultValue: false }
    }, { timestamps: true, underscored: true });

    Cart.associate = (models) => {
        Cart.belongsTo(models.user, { foreignKey: 'user_id' });
    };

    return Cart;
};
