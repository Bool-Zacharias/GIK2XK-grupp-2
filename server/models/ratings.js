module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define('Rating', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        rating: { type: DataTypes.FLOAT, allowNull: false, validate: { min: 1, max: 5 } }
    }, { timestamps: true, underscored: true });

    

    return Rating;
};

