/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    userName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING(15),
      allowNull: false
    }
  }, {
    tableName: 'users'
  });
};
