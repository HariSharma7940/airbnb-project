const db = require("../utils/databaseUtil"); 


module.exports = class Home {
    constructor(houseName, price, location, rating, photoURL, discription, id) {
        this.houseName = houseName;
        this.price = price;
        this.location = location;
        this.rating = rating;
        this.photoURL = photoURL;
        this.discription = discription;
        this.id = id;
    }

    save() {
        if (this.id){  //Update
            return db.execute(' UPDATE homes SET houseName =?, price =?, location =?, rating =?, photoURL =?, discription  =? WHERE id =?', [this.houseName, this.price, this.location, this.rating, this.photoURL, this.discription, this.id] )

        }else{  //Insert
            return db.execute('INSERT INTO homes (houseName, price, location, rating, photoURL, discription) VALUES (?, ?, ?, ?, ?, ?)', [this.houseName, this.price, this.location, this.rating, this.photoURL, this.discription] )
        }
        
    }

    static fetchAll(callback) {
       return db.execute('SELECT * FROM homes')
        
    }

    static findById(homeId) {
        return db.execute('SELECT * FROM homes WHERE id = ?', [homeId]);

    }

    static deleteById(homeId) {
        return db.execute('DELETE FROM homes WHERE id = ?', [homeId]);
       
    }
};