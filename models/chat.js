module.exports = function(sequelize, DataTypes) {
    var Chat = sequelize.define("Chat", {
      user: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      }
    })
    return Chat;
};