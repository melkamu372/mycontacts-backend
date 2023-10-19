const express=require('express');
const erroHandler=require('./middleware/errorHandler');
const dotenv=require('dotenv').config();
const connectDB=require('./config/dbConnection');
const app=express();
const port = process.env.PORT||5000;
connectDB();
app.use(express.json());
app.use("/api/contacts",require("./routes/contactRoutes"));
app.use("/api/users",require("./routes/userRoutes"));

app.all('*',(req,res,next)=>{
    res.status(404).json({
        status:"fail",
        message:`Can't find ${req.originalUrl} on the Server!`
    })

})
app.use(erroHandler);
app.listen(port,()=>{
 console.log(`server running on ${port} port`);
})
