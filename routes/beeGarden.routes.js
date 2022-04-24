const express = require('express');
const verifyToken = require('../helpers/auth');


const {
    createBeeGarden,
    getAllBeeGardens,
    getBeeGardenById,
    getHivesByGardenId,
    getRecentBeeGardens
} = require('../controllers/beeGarden.controller');

const gardenRouter = express.Router();


gardenRouter.post('/add', verifyToken, createBeeGarden);

gardenRouter.get('/list', getAllBeeGardens);

gardenRouter.get('/recent', getRecentBeeGardens);

gardenRouter.get('/:id', getBeeGardenById);

gardenRouter.get('/:id/hives', getHivesByGardenId);

module.exports = gardenRouter;
