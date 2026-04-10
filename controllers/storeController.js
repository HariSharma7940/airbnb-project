const Home = require("../models/home");
const Favourite = require("../models/favourite");

exports.getIndex = (req, res, next) => {
    Home.fetchAll().then(registeredHomes => {
        res.render('store/index', {
            registeredHomes: registeredHomes,
            pageTitle: 'Airbnb Home',
            currentPage: 'index'
        });
    })
}

exports.getHomes = (req, res, next) => {
    Home.fetchAll().then(registeredHomes => {
        res.render('store/home-list', {
            registeredHomes: registeredHomes,
            pageTitle: 'Homes List',
            currentPage: 'home'
        });
    })
}

exports.getBookings = (req, res, next) => {
    res.render('store/bookings', {
        pageTitle: 'My Bookings',
        currentPage: 'bookings'
    });
}

exports.getFavourites = (req, res, next) => {
    Favourite.getFavourites().then(favourite => {
        favourite = favourite.map(fav => fav.houseId);
        Home.fetchAll().then(registeredHomes => {
            console.log(favourite, registeredHomes);
            const favouriteHomes = registeredHomes.filter(home =>
                favourite.includes(home._id.toString()));
            res.render('store/favourite-list', {
                favouriteHomes: favouriteHomes,
                pageTitle: 'My Favourites',
                currentPage: 'favourites'
            });
        })
    })
}

exports.postAddToFavourite = (req, res, next) => {
    const homeId = req.body.id;
    const fav = new Favourite(homeId);
    fav.save().then(result => {
        console.log('fav added: ', result);
    }).catch(err => {
        console.log("Error while marking favourite: ", err);
    }).finally(() => {
        res.redirect("/favourites")
    })
}

exports.postRemoveFromFavourite = (req, res, next) => {
    const homeId = req.params.homeId;
    Favourite.deleteById(homeId).then(result => {
        console.log('fav Removed: ', result);
    }).catch(err => {
        console.log("Error while Removing favourite: ", err);
    }).finally(() => {
        res.redirect("/favourites")
    })
}


exports.getHomeDetails = (req, res, next) => {
    const homeId = req.params.homeId;
    Home.findById(homeId).then(homes => {
        if (!homes || homes.length === 0) {   
            console.log("Home not found");
            return res.redirect("/homes");
        }
        const home = homes[0];               
        console.log(home);
        res.render('store/home-details', {
            home: home,                     
            pageTitle: 'Home Details',
            currentPage: 'Home'
        });
    })
}