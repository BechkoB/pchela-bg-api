const { BeeGarden } = require('../database/models/beeGarden.model');
const { BeeHives } = require('../database/models/beeHive.model');

async function createBeeGarden(req, res) {
    const ownerId = req.body.ownerId.trim();
    const name = req.body.name.trim();
    const lat = req.body.lat.trim();
    const lng = req.body.lng.trim();

    try {
        const garden = await BeeGarden.findOne({
            name
        });

        if (garden) {
            return res.status(400).json({
                type: 'Bad Request',
                msg: 'Пчелина с това име вече съществува'
            });
        }

        const newGarden = new BeeGarden({
            ownerId,
            name,
            lat,
            lng
        });
        newGarden.save().then((response) => {
            res.status(200).json({
                success: true,
                name,
                id: response._id
            });
        });
    } catch (err) {
        res.status(400).json({
            type: 'Bad Request',
            msg: err.message
        });
    }
}

async function getRecentBeeGardens(req, res) {
    try {
        BeeGarden.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .then((list) => {
                res.send(list);
            })
            .catch((e) => {
                res.send(e);
            });
    } catch (err) {
        console.log('Error while getting all BeeGardens!');
        console.log(err.message);
    }
}

async function getAllBeeGardens(req, res) {
    try {
        BeeGarden.find({
            beeGarden: req.body.id
        })
            .sort({ name: 1 })
            .then((list) => {
                res.send(list);
            })
            .catch((e) => {
                res.send(e);
            });
    } catch (err) {
        console.log('Error while getting all BeeGardens!');
        console.log(err.message);
    }
}

async function getBeeGardenById(req, res) {
    try {
        BeeGarden.findById(req.params.id)
            .then((list) => {
                res.send(list);
            })
            .catch((e) => {
                res.send(e);
            });
    } catch (err) {
        console.log('Error while getting BeeGarden!');
        console.log(err.message);
    }
}

async function getHivesByGardenId(req, res) {
    try {
        BeeHives.find({
            beeGarden: req.params.id.trim()
        })
            .sort({ line: 1, name: 'asc' })
            .then((list) => {
                res.send(list);
            })
            .catch((e) => {
                res.send(e);
            });
    } catch (err) {
        console.log('Грешка при получаване на Кошер с Пчелина ID!');
        console.log(err.message);
    }
}

module.exports = {
    createBeeGarden,
    getAllBeeGardens,
    getBeeGardenById,
    getHivesByGardenId,
    getRecentBeeGardens
};
