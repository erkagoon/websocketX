const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbCreate');

const Article = sequelize.define('Article', {
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
    },
    images : {
        type: DataTypes.STRING(255),
        allowNull: true,
    }
}, {
    tableName: 'articles',  // Cette option définit le nom de la table, assurez-vous qu'il correspond au nom réel de la table dans votre base de données
    timestamps: true, 
});

module.exports = Article;