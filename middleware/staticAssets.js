const express = require('express');
const path = require('path');

module.exports = (app) => {
    app.use('/assets', express.static(path.join(__dirname, '../assets')));
};