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
    this.paths = {
      user: '/api/user',
      auth: '/api/auth',
      category: '/api/category',
      product: '/api/product',
      search: '/api/search',
    };

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
    this.app.use(this.paths.user, require('../routes/user.routes'));
    this.app.use(this.paths.auth, require('../routes/auth.routes'));
    this.app.use(this.paths.category, require('../routes/category.routes'));
    this.app.use(this.paths.product, require('../routes/product.routes'));
    this.app.use(this.paths.search, require('../routes/search.routes'));
  }

  listen() {
    this.app.listen(this.port);
  }
}

module.exports = {
  Server,
};
