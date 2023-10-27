const express = require('express');
const path = require('path');

module.exports = (app) => {
    app.use('/gameAssets', express.static(path.join(__dirname, '../game/dist')));
};