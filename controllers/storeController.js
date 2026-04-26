const Home = require("../models/home");
const Favourite = require("../models/favourite");

exports.getIndex = (req, res, next) => {
    console.log("Session Value: ", req.session);
    Home.find().then(registeredHomes => {
        res.render('store/index', {
            registeredHomes: registeredHomes,
            pageTitle: 'Airbnb Home',
            currentPage: 'index',
            isLoggedIn: req.isLoggedIn,
        });
    })
}

exports.getHomes = (req, res, next) => {
    Home.find().then(registeredHomes => {
        res.render('store/home-list', {
            registeredHomes: registeredHomes,
            pageTitle: 'Homes List',
            currentPage: 'home',
            isLoggedIn: req.isLoggedIn,
        });
    })
}

exports.getBookings = (req, res, next) => {
    res.render('store/bookings', {
        pageTitle: 'My Bookings',
        currentPage: 'bookings',
        isLoggedIn: req.isLoggedIn,
    });
}

exports.getFavourites = (req, res, next) => {
    Favourite.find()
    .populate('houseId')
    .then((favourite) => {
        const favouriteHomes = favourite.map((fav) => fav.houseId);
        res.render('store/favourite-list', {
            favouriteHomes: favouriteHomes,
            pageTitle: 'My Favourites',
            currentPage: 'favourites',
            isLoggedIn: req.isLoggedIn,
        });
    })
}

exports.postAddToFavourite = (req, res, next) => {
    const homeId = req.body.id;
    Favourite.findOne({houseId: homeId}).then((fav) =>{
        if(fav){
            console.log("Already marked as Favourite.");
        }else{
            fav = new Favourite({houseId: homeId});
            fav.save().then((result) =>{
                console.log("Favourite added: ", result);
            })
        }
        res.redirect("/favourites");
    }).catch(err => {
        console.log("Error while marking favourite: ", err);
    });
};

exports.postRemoveFromFavourite = (req, res, next) => {
    const homeId = req.params.homeId;
    Favourite.findOneAndDelete({houseId: homeId}).then(result => {
        console.log('fav Removed: ', result);
    }).catch(err => {
        console.log("Error while Removing favourite: ", err);
    }).finally(() => {
        res.redirect("/favourites")
    })
}

exports.getHomeDetails = (req, res, next) => {
    const homeId = req.params.homeId;
    Home.findById(homeId).then(home => {
        if (!home || home.length === 0) {   
            console.log("Home not found");
            return res.redirect("/homes");
        }              
        console.log(home);
        res.render('store/home-details', {
            home: home,                     
            pageTitle: 'Home Details',
            currentPage: 'Home',
            isLoggedIn: req.isLoggedIn,
        });
    })
}