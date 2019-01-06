var express      = require("express"),
    app          = express(),
    bodyParser   = require("body-parser"),
    mongoose     = require("mongoose"),
    Campground   = require("./models/campground"),
    seedDB       = require("./seeds");

seedDB();

mongoose.connect("mongodb://localhost/yelp_camp_v3", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

app.get("/", function(req,res){
   res.render("landing");
});

app.get("/campgrounds", function(req,res){    
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("index",{campgrounds: allCampgrounds});
        }
    });
   
});

app.post("/campgrounds", function(req, res){
    //res.send("post route");
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    //create new campground and save 
    Campground.create(newCampground, function(err, newlyCreated){
            if(err){
                console.log(err);
            } else{
                // console.log("New Data Inserted Campground:");
                // console.log(campground);
                res.redirect("/campgrounds");
            }
        }); 
});

app.get("/campgrounds/new", function(req,res){
    res.render("new");
});

//SHOW Route
app.get("/campgrounds/:id", function(req, res){
    // res.send("show page!");
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else {
            console.log(foundCampground);
            res.render("show", {campground: foundCampground});
        }
    });
  //  res.render("show");
 })

app.listen(5000, function(){
    console.log("Yelpcamp server started");
});
