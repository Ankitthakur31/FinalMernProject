/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('students', {
    studentId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    studentName: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    course: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    years: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    university: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    fees: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'students'
  });
};
