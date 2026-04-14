const path = require('path');

const express = require('express');
const app = express();

const errorsControllers = require("./controllers/errors")



app.set('view engine', 'ejs')
app.set('views', 'views')

const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")

const rootDir= require("./utils/pathUtils");
const { default: mongoose } = require('mongoose');

app.use(express.urlencoded());
app.use(express.static(path.join(rootDir,'public')))
app.use(storeRouter);
app.use("/host",hostRouter);

app.use(errorsControllers.pageNotFound)

const PORT = 3002;
const DB_PATH = "mongodb+srv://root:Haripaudel01@harisharma.soi2loa.mongodb.net/airbnb?retryWrites=true&w=majority"

mongoose.connect(DB_PATH).then(() =>{
    console.log('Connected to Mongo');
    app.listen(PORT, ()=>{
        console.log(`Server is running on address http://localhost:${PORT}`);
    });
}).catch(err =>{
    console.log('Error While connecting to Mongo: ', err)
})
