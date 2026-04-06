const Home = require("../models/home");

exports.getAddHome = (req, res, next)=>{
    res.render('host/edit-home', {
        pageTitle: 'airbnb Home', 
        currentPage: 'addHome',
        editing: false,
    })
}


exports.getEditHome = (req, res, next)=>{
    const homeId = req.params.homeId;
    const editing = req.query.editing ==='true'

    Home.findById(homeId) .then (([homes]) =>{
        const home = homes[0];
    if(!home){
        console.log("Home not found for editing.")
        return res.redirect("/host/host-home-list");
    }
    console.log(homeId, editing, home)
    res.render('host/edit-home', {
        home:home,
        pageTitle: 'Edit your Home', 
        currentPage: 'host-homes',
        editing: editing,
    })
})
}




exports.getHostHomes = (req, res, next)=>{
    Home.fetchAll().then(([registeredHomes]) =>{
        res.render('host/host-home-list', {
            registeredHomes: registeredHomes, 
            pageTitle: 'Host Homes List', 
            currentPage: 'host-homes'
        });
    })
}

exports.postAddHome = (req, res, next)=>{
    const {HouseName, Price, Location, rating, photo, discription} = req.body;
    const home = new Home(HouseName, Price, Location, rating, photo, discription);
    home.save();

    res.redirect('/host/host-home-list')
}


exports.postEditHome = (req, res, next)=>{
    const {id, HouseName, Price, Location, rating, photo, discription} = req.body;
    const home = new Home(HouseName, Price, Location, rating, photo, discription, id);
    home.id = id;
    home.save();

    res.redirect('/host/host-home-list')
}


exports.postDeleteHome = (req, res, next)=>{
    const homeId = req.params.homeId;
    console.log("Came to delete", homeId) 
    Home.deleteById(homeId).then (()  =>{
        res.redirect('/host/host-home-list')
    }).catch(error =>{
        console.log("Error While Deleting ", error)
    })
    
}



