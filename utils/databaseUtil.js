const mongo = require('mongodb');

const MongoClient = mongo.MongoClient;

const MONGO_URL = "mongodb+srv://root:Haripaudel01@harisharma.soi2loa.mongodb.net/test?retryWrites=true&w=majority";

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(MONGO_URL)
    .then(client => {
        console.log("Connected to MongoDB");
        callback();
        _db = client.db('airbnb');
    })
    .catch(err => {
        console.log("Error while connecting to MongoDB:", err);
    });
}

const getDB = () =>{
    if (!_db){
        throw new Error("MongoDB not Connected.");
    }
    return _db;
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;