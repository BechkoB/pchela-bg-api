const express = require('express');
const {
    createHive,
    deleteHive,
    getHiveById,
    addBeeHiveData,
    getBeeHiveData
} = require('../controllers/beeHives.controller');

const hiveRouter = express.Router();

hiveRouter.post('/add', createHive);

hiveRouter.delete('/:id', deleteHive);

hiveRouter.get('/:id', getHiveById);

hiveRouter.post('/data/edit/:id', addBeeHiveData);

hiveRouter.post('/data/get/:id', getBeeHiveData);

module.exports = hiveRouter;
