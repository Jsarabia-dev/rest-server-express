/* eslint-disable class-methods-use-this */
/* eslint-disable global-require */
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/database.config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.SERVER_PORT;

    // Paths
    this.userPath = '/api/user';
    this.authPath = '/api/auth';

    // Conectar a BD
    this.connectDB();

    // Midlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Body Parse
    this.app.use(express.json());

    // Public directory
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.userPath, require('../routes/user.routes'));
    this.app.use(this.authPath, require('../routes/auth.routes'));
  }

  listen() {
    this.app.listen(this.port);
  }
}

module.exports = {
  Server,
};
