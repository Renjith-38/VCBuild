const express = require('express');
const app = new express;
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const port = process.env.PORT || 3001;

mongoose.connect('mongodb+srv://userrenjith:userrenjith@projectfiles.dmtoz.mongodb.net/VirtualClassroom?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})
.then((res)=>{
    console.log('MongoDB connected');
})

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const authRouter = require('./src/routes/authenticationRoutes');
const classRouter = require('./src/routes/classRoutes');
const adminRouter = require('./src/routes/adminRoutes');


app.use('/auth',authRouter);
app.use('/class',classRouter);
app.use('/admin',adminRouter);

app.use(express.static(path.join(__dirname,'public')));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'));
})

app.listen(port,()=>{
    console.log(`Server listening on port:${port}`);
})