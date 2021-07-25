const worker=(app,server)=>{
  const logger = require('./utils/logger');  
 const path=require ('path')
 const express =require('express')
 const dotenv =require ('dotenv')
  const colors=require('colors')
  const morgan =require ('morgan')
  const { notFound, errorHandler }=require( './middleware/errorMiddleware.js')
  const connectDB=require('./config/db')
const productRoutes=require('./routes/productRoutes.js')
 const userRoutes=require('./routes/userRoutes.js')
  const orderRoutes=require('./routes/orderRoutes.js')
  const uploadRoutes=require('./routes/uploadRoutes.js')
  
  dotenv.config()
  
  connectDB()
  
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }
  
  app.use(express.json())
  
  app.use('/api/products', productRoutes)
  app.use('/api/users', userRoutes)
  app.use('/api/orders', orderRoutes)
  app.use('/api/upload', uploadRoutes)
  

  
  const __dirname = path.resolve()
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
  

    app.get('/', (req, res) => {
      res.send('API is running....')
    })
  
  
  app.use(notFound)
  app.use(errorHandler)
  
}
module.exports=worker