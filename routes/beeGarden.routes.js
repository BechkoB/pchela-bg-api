const express = require('express');

const {
    createBeeGarden,
    getAllBeeGardens,
    getBeeGardenById,
    getHivesByGardenId
} = require('../controllers/beeGarden.controller');

const gardenRouter = express.Router();

gardenRouter.post('/add', createBeeGarden);

gardenRouter.get('/list', getAllBeeGardens);

gardenRouter.get('/:id', getBeeGardenById);

gardenRouter.get('/:id/hives', getHivesByGardenId);

module.exports = gardenRouter;
