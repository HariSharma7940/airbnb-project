const path = require('path');

const express = require('express');
const app = express();

const errorsControllers = require("./controllers/errors")



app.set('view engine', 'ejs')
app.set('views', 'views')

const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")

const rootDir= require("./utils/pathUtils");
const {mongoConnect} = require('./utils/databaseUtil');

app.use(express.urlencoded());
app.use(storeRouter);
app.use("/host",hostRouter);

app.use(express.static(path.join(rootDir,'public')))

app.use(errorsControllers.pageNotFound)

const PORT = 3002;
mongoConnect ( ()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on address http://localhost:${PORT}`);
    })
})