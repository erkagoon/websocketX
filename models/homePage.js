const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbCreate');

const Homepage = sequelize.define('Homepage', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    texte: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'homepage',  // Cette option définit le nom de la table
    timestamps: true, 
});

module.exports = Homepage;