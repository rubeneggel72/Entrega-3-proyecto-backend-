const mongoose=require('mongoose')
const logger = require('../utils/logger');
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    logger.info(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    logger.error(`Error: ${error.message}`.red.underline.bold)
    console.log(`Error: ${error.message}`.red.underline.bold)
    process.exit(1)
  }
}

module.exports= connectDB
