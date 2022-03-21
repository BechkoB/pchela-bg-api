const mongoose = require('mongoose');

const { Schema } = mongoose;

const BeeHiveDataSchema = new Schema(
    {
        id: Schema.Types.ObjectId,
        beeHive: {
            type: Schema.Types.ObjectId,
            ref: 'BeeHives',
            required: true
        },
        data: {
            type: Schema.Types.Map
        },
        time: {
            type: Schema.Types.Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const BeeHiveData = mongoose.model('BeeHiveData', BeeHiveDataSchema);
module.exports = { BeeHiveData };
