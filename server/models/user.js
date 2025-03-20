module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      id: {type: DataTypes.INTEGER,primaryKey: true, autoIncrement: true},
      email: {type: DataTypes.STRING(200),allowNull: false,validate: 
      {
        len: [4, 200],
        isEmail: true
      }},
      first_Name: {type: DataTypes.STRING},
      last_Name: {type: DataTypes.STRING},
      created_At: {type: DataTypes.DATE},
      updated_At: {type: DataTypes.DATE},
      password: {type: DataTypes.STRING}
    },
  );
  return User;
};