const {getDB} = require('../utils/databaseUtil');
const {ObjectId} = require('mongodb');

module.exports = class Home {
    constructor(houseName, price, location, rating, photoURL, discription, _id) {
        this.houseName = houseName;
        this.price = price;
        this.location = location;
        this.rating = rating;
        this.photoURL = photoURL;
        this.discription = discription;
        if (_id){
            this._id = _id;
        }
    }

    save() {
        const db = getDB();
        if (this._id){          //Update
            const updateFields = {
                houseName: this.houseName,
                price:this.price,
                location: this.location,
                rating: this.rating, 
                photoURL: this.photoURL, 
                discription: this.discription
            }
            return db.collection('homes').updateOne({_id: new ObjectId (String(this._id))}, {$set: updateFields});
        }else {                 //Insert
        return db.collection('homes').insertOne(this);
        }
    }

    static fetchAll() {
        const db = getDB();
        return db.collection('homes').find().toArray();
    }

    static findById(homeId) {
        const db = getDB();
        return db.collection('homes')
            .find({ _id: new ObjectId(homeId) })
            .toArray();
    }

    static deleteById(homeId) {
        const db = getDB();
        return db.collection('homes')
        .deleteOne({ _id: new ObjectId(homeId) });
    }
};