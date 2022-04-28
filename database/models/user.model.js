const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        id: Schema.Types.ObjectId,
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        firstName: {
            type: String,
            required: false,
            default: '',
            trim: true,
            unique: true
        },
        secondName: {
            type: String,
            required: false,
            default: '',
            trim: true,
            unique: true
        },
        phone: {
            type: String,
            required: false,
            default: '',
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', UserSchema);
module.exports = { User };
