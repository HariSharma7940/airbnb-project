const Home = require("../models/home");
const Favourite = require("../models/favourite");
const favourite = require("../models/favourite");

exports.getIndex = (req, res, next)=>{
    Home.fetchAll().then(([registeredHomes]) =>{
        res.render('store/index', {
            registeredHomes: registeredHomes, 
            pageTitle: 'Airbnb Home', 
            currentPage: 'index'
        });
    })
}

exports.getHomes = (req, res, next)=>{
    Home.fetchAll().then(([registeredHomes]) =>{
        res.render('store/home-list', {
            registeredHomes: registeredHomes, 
            pageTitle: 'Homes List', 
            currentPage: 'home'
        });
    })
}

exports.getBookings = (req, res, next)=>{
    res.render('store/bookings', {
        pageTitle: 'My Bookings', 
        currentPage: 'bookings'
    });
}

exports.getFavourites = (req, res, next)=>{
    Favourite.getFavourites(favourite =>{
        Home.fetchAll().then(([registeredHomes]) =>{
            const favouriteHomes = registeredHomes.filter(home =>
                favourite.includes(home.id));
            res.render('store/favourite-list', {
                favouriteHomes: favouriteHomes, 
                pageTitle: 'My Favourites', 
                currentPage: 'favourites'
            });
        })
    })
}

exports.postAddToFavourite = (req, res, next) =>{
    Favourite.addToFavourite(req.body.id, error =>{
        if (error) {
            console.log("Error while marking favourite: ", error)
        }
        res.redirect("/favourites")
    });
}

exports.postRemoveFromFavourite = (req, res, next) =>{
   const homeId = req.params.homeId;
    Favourite.deleteById(homeId, error =>{
        if (error) {
            console.log("Error while removing from favourite: ", error)
        }
        res.redirect("/favourites")
    });
  
}


exports.getHomeDetails = (req, res, next)=>{
    const homeId = req.params.homeId;
    Home.findById(homeId).then (([homes]) =>{
        const home = homes[0];
        if(!home){
            console.log("Home not found")
            res.redirect("/homes")
        }else{
            console.log(home)
            res.render('store/home-details', {
                home: home,
                pageTitle: 'Home Details', 
                currentPage: 'Home'
            });
        }
    })
    
}