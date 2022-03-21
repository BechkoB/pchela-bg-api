const mongoose = require('mongoose');

const { Schema } = mongoose;

const BeeHiveSchema = new Schema(
    {
        id: Schema.Types.ObjectId,
        beeGarden: {
            type: Schema.Types.ObjectId,
            ref: 'BeeGardens',
            required: true
        },
        name: {
            type: String,
            required: true
        },
        line: {
            type: Number,
            required: true,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

const BeeHives = mongoose.model('BeeHives', BeeHiveSchema);
module.exports = { BeeHives };
