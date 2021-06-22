const express =require('express')
const path =require('path')
const mongoose =require('mongoose')
const noteRoutes =require('./routes/note_route')
const userRoutes =require('./routes/user_route')
const app =express()

app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/',noteRoutes)
app.use('/user',userRoutes)

app.use((error,req,res,next)=>{
    console.log('error')
    const status = error.statusCode || 500
  const message = error.message
  const data = error.data
  res.status(status).json({message: message,data: data})
})

mongoose.connect('mongodb+srv://vaibhav_wolfvk:9826606348@cluster0.pzyw2.mongodb.net/crud?retryWrites=true&w=majority',{ useUnifiedTopology: true })
app.listen(3000,()=> {
  console.log("Server is running on "+ 3000);
})
