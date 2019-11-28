const mongoose = require('mongoose');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const config = require('./config');
const userRouter = require('./routes/user-router');
const uploadRouter = require('./routes/upload-router');
const publicationRouter = require('./routes/publication-router');
const cors = require('cors');
const logger = require('./utils/logger');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('short', {
    stream: {
        write: message => logger.info(message.trim())
    }
}));
app.use('/api/users', userRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/publications', publicationRouter);

app.use(express.static(path.join(__dirname, "demo-web")));

const server = http.createServer(app);

mongoose.connect(config.urlMongoDB, {
    useNewUrlParser: true,
    useCreateIndex: true
})
    .then(db => logger.info('Connection mongodb success'))
    .catch(err => logger.warn(`Error connection mongodb: ${err}`));

server.listen(config.port, () => {
    logger.info(`Server running on port number: ${config.port}`);
});