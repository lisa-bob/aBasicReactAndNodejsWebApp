module.exports = function (sequelize, DataTypes) {
    const books = sequelize.define("books", {
  
  
  idBook: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'title'
  },

  author: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'author'
  },

  read: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },

  user: {
    type: DataTypes.INTEGER,
    allowNull: true
  }

  }, {
  
  freezeTableName: true,
  tableName: 'books',
  timestamps: true
  });
  
  
    books.sync().then(function() {
        console.log('Books: Item table in seq created successfully.');
    }, function(err) {
        console.error('An error occurred while creating user table : ' + err.stack);
    });
  
    return books;
  };
  