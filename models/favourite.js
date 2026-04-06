const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtils');

const favouriteDataPath = path.join(rootDir, 'data', 'favourite.json');

module.exports = class favourite {
   
    static addToFavourite(homeId, callback){
        favourite.getFavourites((favourites) => {
            if(favourites.includes(homeId)){
                callback("Home is Already marked Favourite.")
                
            }else{
                favourites.push(homeId);
                fs.writeFile(favouriteDataPath, JSON.stringify
                (favourites), callback);

            }
        });
        
    }


    static getFavourites(callback) {
        fs.readFile(favouriteDataPath, (error, data) => {
            if (error) {
                callback([]);
            } else {
                callback(JSON.parse(data));
            }
        });
    }

    static deleteById(delHomeId, callback) {
        favourite.getFavourites(homeIds => {
            homeIds = homeIds.filter(homeId => delHomeId !== homeId);
            fs.writeFile(favouriteDataPath,JSON.stringify(homeIds),
            callback);        
        })
    }


};