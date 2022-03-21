const moment = require('moment');
const { BeeHives } = require('../database/models/beeHive.model');
const { BeeHiveData } = require('../database/models/beeHiveData.model');

async function createHive(req, res) {
    const hiveName = req.body.name.trim();
    const hiveLine = Number(req.body.line.trim());

    try {
        const allBeeHives = await BeeHives.find({
            beeGarden: req.body.id
        }).then((list) => list.slice(0));

        const hive = allBeeHives.find((beeHive) => beeHive.name === hiveName && beeHive.line === hiveLine);

        if (hive) {
            return res.status(400).json({
                type: 'Bad Request',
                msg: 'Кошер с това име вече съществува!'
            });
        }

        const newHive = new BeeHives({
            name: hiveName,
            device: device._id,
            line: hiveLine,
            beeGarden: req.body.id.trim()
        });
        newHive.save().then(() => {
            res.status(200).json({
                success: true,
                id: newHive._id
            });
        });
    } catch (err) {
        res.status(400).json({
            type: 'Bad Request',
            msg: err.message
        });
    }
}

async function deleteHive(req, res) {
    try {
        await BeeHives.findByIdAndRemove({ _id: req.params.id }).then(() => {
            res.status(200).json({
                OK: 'Successfully deleted'
            });
        });
    } catch (err) {
        res.status(400).json({
            type: 'Bad Request',
            msg: err.message
        });
    }
}

async function getHiveById(req, res) {
    try {
        BeeHives.findById(req.params.id).then((hive) => {
            res.send(hive);
        });
    } catch (err) {
        res.status(400).json({
            type: 'Bad Request',
            mgs: err.message
        });
    }
}

async function addBeeHiveData(req, res) {
    const beeHiveId = req.params.id;
    const hiveDataId = req.body.id;
    try {
        if (hiveDataId) {
            const existingData = await BeeHiveData.findById(hiveDataId);
            existingData.data = req.body.data;
            existingData.save().then(() => {
                res.status(200).json({
                    success: true,
                    existingData
                });
            });
        } else {
            const newData = new BeeHiveData({
                beeHive: beeHiveId,
                data: req.body.data,
                time: req.body.time
            });
            newData.save().then(() => {
                res.status(200).json({
                    success: true,
                    newData
                });
            });
        }
    } catch (err) {
        res.status(400).json({
            type: 'Bad Request',
            msg: err.message
        });
    }
}

async function getBeeHiveData(req, res) {
    const beeHiveId = req.params.id;
    const { date } = req.body;
    const { isAll } = req.body;
    let beeHiveData;
    let dateFilter = null;
    if (date) {
        const endDate = moment(date).add(1, 'day').format();
        dateFilter = {
            $gte: date,
            $lt: endDate
        };
    }
    try {
        if (isAll) {
            beeHiveData = await BeeHiveData.find({ beeHive: beeHiveId })
                .sort({ createdAt: -1 });
            res.send(beeHiveData);
        } else {
            beeHiveData = await BeeHiveData.findOne({
                beeHive: beeHiveId,
                time: dateFilter
            }).sort({ createdAt: -1 });
            // beeHiveData = beeHiveData || {};
            // beeHiveData.data = beeHiveData.data || new Map();

            // if (beeHiveData) {
            //     beeHiveData.data.set('outsideTemp', +data.outsideTemp);
            //     beeHiveData.data.set('outsideHumid', +data.outsideHumid);
            // }
            // beeHiveData.data = Object.fromEntries(beeHiveData.data);
            res.send(beeHiveData);
        }
    } catch (err) {
        res.status(400).json({
            type: 'Bad Request',
            msg: err.message
        });
    }
}

module.exports = {
    createHive,
    deleteHive,
    getHiveById,
    addBeeHiveData,
    getBeeHiveData
};
