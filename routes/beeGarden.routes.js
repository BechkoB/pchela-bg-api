const express = require('express');
const verifyToken = require('../helpers/auth');


const {
    createBeeGarden,
    getAllBeeGardens,
    getBeeGardenById,
    getHivesByGardenId
} = require('../controllers/beeGarden.controller');

const gardenRouter = express.Router();

gardenRouter.post('/add', verifyToken, createBeeGarden);

gardenRouter.get('/list', getAllBeeGardens);

gardenRouter.get('/:id',verifyToken, getBeeGardenById);

gardenRouter.get('/:id/hives',verifyToken, getHivesByGardenId);

module.exports = gardenRouter;
