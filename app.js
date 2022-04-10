const express = require('express');
const cors = require('cors');
const verifyToken = require('./helpers/auth');


const userRouter = require('./routes/users.routes');
const gardenRouter = require('./routes/beeGarden.routes');
const hiveRouter = require('./routes/beeHives.routes');

const config = require('./config.json');

const { connect: connect2Db } = require('./database/database');


const initApp = () => {
    const app = express();

    app.use(express.json());
    app.use(cors());

    app.use('/user', userRouter);
    app.use('/beegardens', gardenRouter);
    app.use('/beehives', verifyToken, hiveRouter);

    app.listen(3030, () => console.log('Server listening on http://localhost:3030'));
};

initApp();
connect2Db();