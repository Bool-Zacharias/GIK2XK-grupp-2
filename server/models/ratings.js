module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define('Rating', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        rating: { type: DataTypes.FLOAT, allowNull: false, validate: { min: 1, max: 5 } }
    }, { timestamps: true, underscored: true });

    Rating.associate = (models) => {
        Rating.belongsTo(models.Product, { foreignKey: 'product_id', onDelete: 'CASCADE' }); // FK till produkt
    };

    return Rating;
};

