const mongoose = require('mongoose');

const connect = () =>
    mongoose
        .connect('mongodb://localhost:27017/PchelaBg', { useNewUrlParser: true, autoIndex: process.env.NODE_ENV !== 'prod' })
        .then(() => {
            console.log('Connected do MongoDB successfully');
            return true;
        })
        .catch((e) => {
            console.log('Error while connecting to MongoDB');
            console.log(e);
            return false;
        });

module.exports = {
    connect
};
