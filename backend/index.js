const epxress = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();

const cookieParser = require('cookie-parser')
const app = epxress();

const connectToMongo = require('./configs/db')
const userRoute = require('./routes/userRoute')
const noteRoute = require('./routes/noteRoute.js')
const contactRoute = require('./routes/contactRoute.js')
const port  = process.env.PORT || 3000 ;

connectToMongo();

app.use(cors());
app.use(epxress.json())
app.use(cookieParser());


//api

app.use('/api/v1/user',userRoute);
app.use('/api/v1/notes',noteRoute);
app.use('/api/v1/contact-us',contactRoute);

app.get('/',(req,res)=>{
    res.send('hello from server');
})


 app.listen(port,()=>{
        console.log(`server is listening to port ${port}`)
    })
