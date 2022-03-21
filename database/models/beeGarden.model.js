const mongoose = require('mongoose');

const { Schema } = mongoose;

const BeeGardenSchema = new Schema(
    {
        id: Schema.Types.ObjectId,
        name: {
            type: String,
            required: true
        },
        lat: {
            type: Schema.Types.Number,
            required: true
        },
        lng: {
            type: Schema.Types.Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const BeeGarden = mongoose.model('BeeGardens', BeeGardenSchema);
module.exports = { BeeGarden };
