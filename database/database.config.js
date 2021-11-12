/* eslint-disable no-console */
const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to DB');
  } catch (error) {
    console.log(error);
    throw new Error('Error connect to DB');
  }
};

module.exports = {
  dbConnection,
};
