/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('aman', {
    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  }, {
    tableName: 'aman'
  });
};
