// Skapar upp en CartRow för att koppla ihop Cart och Product
module.exports = (sequelize, DataTypes) => {
    const CartRow = sequelize.define('CartRow', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        amount: { type: DataTypes.DOUBLE, allowNull: false }
    }, { timestamps: true, underscored: true });


    return CartRow;
};
