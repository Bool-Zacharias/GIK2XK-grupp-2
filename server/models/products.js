module.exports = (sequelize, DataTypes) =>{
    return sequelize.define("products", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    });
};
// HÄr ska det vara mer information om products i databasen ( description tex)