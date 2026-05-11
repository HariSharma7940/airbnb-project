const Home = require("../models/home");
const fs = require("fs");

exports.getAddHome = (req, res, next) => {
    res.render('host/edit-home', {
        pageTitle: 'airbnb Home',
        currentPage: 'addHome',
        editing: false,
        user: req.session.user
    })
}

exports.getEditHome = (req, res, next) => {
    const homeId = req.params.homeId;
    const editing = req.query.editing === 'true';

    Home.findById(homeId).then(home => {
        if (!home || home.length === 0) {
            console.log("Home not found for editing.");
            return res.redirect("/host/host-home-list");
        }
        console.log(homeId, editing, home);
        res.render('host/edit-home', {
            home: home,
            pageTitle: 'Edit your Home',
            currentPage: 'host-homes',
            editing: editing,
            user: req.session.user
        })
    })
}

exports.getHostHomes = (req, res, next) => {
    Home.find().then(registeredHomes => {
        res.render('host/host-home-list', {
            registeredHomes: registeredHomes,
            pageTitle: 'Host Homes List',
            currentPage: 'host-homes',
            user: req.session.user
        });
    })
}

exports.postAddHome = (req, res, next) => {
    console.log(req.body);
    const { houseName, price, location, rating, description  } = req.body;
    console.log(houseName, price, location, rating, description );
    console.log*(req.file);

    if (!req.file){
        return res.status(422).send("No image provided.")
    }
    const photo = '/' + req.file.path.replace(/\\/g, '/');


    const home = new Home({
        houseName, 
        price, 
        location, 
        rating, 
        photo, 
        description 
    });
    home.save().then(() => {
        console.log("Home Saved Successfully.");
    });
    res.redirect('/host/host-home-list')
}

exports.postEditHome = (req, res, next) => {
    const { id, houseName, price, location, rating, description  } = req.body;
    Home.findById(id).then((home) =>{
        home.houseName = houseName;
        home.price = price;
        home.location = location;
        home.rating = rating;      
        home.description = description;

        if (req.file){
            fs.unlink('.' + home.photo, (err) => {
                if (err) {
                    console.log("Error while deleting file", err);
                }                
            })
            home.photo = '/' + req.file.path.replace(/\\/g, '/');

        }

        home.save().then(result => {
            console.log("Home Updated", result);
        }).catch(err => {
            console.log("Error While Updating ", err);
        });
        res.redirect('/host/host-home-list');
    }).catch(err => {
        console.log("Error while finding home ", err);
    });
}

exports.postDeleteHome = (req, res, next) => {
    const homeId = req.params.homeId;
    console.log("Came to delete", homeId)
    Home.findByIdAndDelete(homeId).then(() => {
        res.redirect('/host/host-home-list')
    }).catch(error => {
        console.log("Error While Deleting ", error)
    })
}