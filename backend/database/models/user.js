module.exports = function (sequelize, DataTypes) {
    const user = sequelize.define("user", {
  
  
  idUser: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Mustername'
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Musterpassword'
  }

  }, {
  
  freezeTableName: true,
  tableName: 'user',
  timestamps: true
  });
  
  
    user.sync().then(function() {
        console.log('User: Item table in seq created successfully.');
    }, function(err) {
        console.error('An error occurred while creating user table : ' + err.stack);
    });
  
    return user;
  };
  