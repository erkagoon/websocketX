const express = require('express');
const path = require('path');

module.exports = (app) => {
    console.log(path.join(__dirname, '../game/dist/assets'));
    app.use('/gameAssets', express.static(path.join(__dirname, '../game/dist/assets')));
};