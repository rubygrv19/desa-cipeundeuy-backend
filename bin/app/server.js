require('dotenv').config();
const project = require('../../package.json');

const AppServer = {
    name: `${project.name}-server`,
    version: project.version,
    url: `http://localhost:${process.env.PORT}`
};

module.exports = AppServer;