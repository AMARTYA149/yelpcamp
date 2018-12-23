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
//         image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
//         description: "This is a huge granite hill, no bathrooms.  No water. Beautiful granite!"
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else{
//             console.log("Newly Created Campground");
//             console.log(campground);
//         }
//     });

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
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else {
            res.render("show", {campgrounds: foundCampground});
        }
    });
  //  res.render("show");
 })

app.listen(5000, function(){
    console.log("Yelpcamp server started");
});
