var express      = require("express"),
    app          = express(),
    bodyParser   = require("body-parser"),
    mongoose     = require("mongoose")

mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

//Schema
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Granite Hill",
//         image: "https://pixabay.com/get/ef3cb00b2af01c22d2524518b7444795ea76e5d004b0144590f2c57fa7eeb2_340.jpg",
//         description: "Granite Hill, beautiful place Great"
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else{
//             console.log("New Data Inserted Campground:");
//             console.log(campground);
//         }
//     });

// var campgrounds = [
//     {name: "Salmon Greek", image: "https://pixabay.com/get/e03db50f2af41c22d2524518b7444795ea76e5d004b0144590f2c57fa7eeb2_340.jpg"},
//     {name: "Granite Hill", image: "https://pixabay.com/get/ef3cb00b2af01c22d2524518b7444795ea76e5d004b0144590f2c57fa7eeb2_340.jpg"},
//     {name: "Mountain Rest", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
//     {name: "Salmon Greek", image: "https://pixabay.com/get/e03db50f2af41c22d2524518b7444795ea76e5d004b0144590f2c57fa7eeb2_340.jpg"},
//     {name: "Granite Hill", image: "https://pixabay.com/get/ef3cb00b2af01c22d2524518b7444795ea76e5d004b0144590f2c57fa7eeb2_340.jpg"},
//     {name: "Mountain Rest", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
//     {name: "Salmon Greek", image: "https://pixabay.com/get/e03db50f2af41c22d2524518b7444795ea76e5d004b0144590f2c57fa7eeb2_340.jpg"},
//     {name: "Granite Hill", image: "https://pixabay.com/get/ef3cb00b2af01c22d2524518b7444795ea76e5d004b0144590f2c57fa7eeb2_340.jpg"},
//     {name: "Mountain Rest", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"}
    
// ];


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
    var newCampground = {name: name, image: image};
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

app.get("/campgrounds/:id", function(req, res){
   // res.send("show page!");
   res.render("show");
});

app.listen(5000, function(){
    console.log("Yelpcamp server started");
});
