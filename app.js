const path = require('path');
const express = require('express');
const session = require('express-session');
const mongoDBStore = require('connect-mongodb-session') (session);
const DB_PATH = "mongodb+srv://root:Haripaudel01@harisharma.soi2loa.mongodb.net/airbnb?retryWrites=true&w=majority"

const errorsControllers = require("./controllers/errors")

const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");
const rootDir = require("./utils/pathUtils");
const { default: mongoose } = require('mongoose');

const app = express();

app.set('view engine', 'ejs')
app.set('views', 'views')

const store = new mongoDBStore({
    uri: DB_PATH,
    collection: 'sessions'
});


app.use(express.urlencoded());

app.use(session({
    secret: "Airbnb project complete full stack",
    resave: false,
    saveUninitialized: true,
    store
}));

app.use((req, res, next) => {
    req.isLoggedIn = req.session.isLoggedIn;
    // res.locals.isLoggedIn = req.isLoggedIn;
    next();
});

app.use(express.static(path.join(rootDir,'public')))
app.use(authRouter);
app.use(storeRouter);

app.use("/host", (req, res, next) => {
    if (req.isLoggedIn){
        next();
    } else {
        res.redirect("/login");
    }
});
app.use("/host", hostRouter);

app.use(errorsControllers.pageNotFound)

const PORT = 3002;

mongoose.connect(DB_PATH).then(() => {
    console.log('Connected to Mongo');
    app.listen(PORT, () => {
        console.log(`Server is running on address http://localhost:${PORT}`);
    });
}).catch(err => {
    console.log('Error While connecting to Mongo: ', err)
})