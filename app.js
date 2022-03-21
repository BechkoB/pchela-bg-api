const express = require('express');
const cors = require('cors');

const config = require('./config.json');

const initApp = () => {
    const app = express();
    const corsOptions = {
        origin: (origin, callback) => {
            if (config.allowedCorsOrigins.indexOf(origin) !== -1) {
                callback(null, true);
                return;
            }
            callback(`${origin} not allowed`, false);
        }
    };

    app.use(express.json());
    app.use(cors(corsOptions));

    app.use('/user', userRouter);
    app.use('/beegardens', verifyToken, gardenRouter);
    app.use('/beehives', verifyToken, hiveRouter);

    app.listen(3030, () => console.log('Server listening on http://localhost:3030'));
};