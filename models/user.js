const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbCreate');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    avatar : {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: '/assets/img/avatar/avatar_1.png'
    }
}, {
    tableName: 'users',  // Cette option définit le nom de la table, assurez-vous qu'il correspond au nom réel de la table dans votre base de données
    timestamps: true, 
});

module.exports = User;
