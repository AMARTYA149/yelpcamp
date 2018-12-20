var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

var campgrounds = [
    {name: "Salmon Greek", image: "https://pixabay.com/get/e03db50f2af41c22d2524518b7444795ea76e5d004b0144590f2c57fa7eeb2_340.jpg"},
    {name: "Granite Hill", image: "https://pixabay.com/get/ef3cb00b2af01c22d2524518b7444795ea76e5d004b0144590f2c57fa7eeb2_340.jpg"},
    {name: "Mountain Rest", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "Salmon Greek", image: "https://pixabay.com/get/e03db50f2af41c22d2524518b7444795ea76e5d004b0144590f2c57fa7eeb2_340.jpg"},
    {name: "Granite Hill", image: "https://pixabay.com/get/ef3cb00b2af01c22d2524518b7444795ea76e5d004b0144590f2c57fa7eeb2_340.jpg"},
    {name: "Mountain Rest", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "Salmon Greek", image: "https://pixabay.com/get/e03db50f2af41c22d2524518b7444795ea76e5d004b0144590f2c57fa7eeb2_340.jpg"},
    {name: "Granite Hill", image: "https://pixabay.com/get/ef3cb00b2af01c22d2524518b7444795ea76e5d004b0144590f2c57fa7eeb2_340.jpg"},
    {name: "Mountain Rest", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"}
    
];

app.set("view engine","ejs");

app.get("/", function(req,res){
   res.render("landing");
});

app.get("/campgrounds", function(req,res){
    
    res.render("campgrounds",{campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    //res.send("post route");
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    
    res.redirect("/campgrounds");

});

app.get("/campgrounds/new", function(req,res){
    res.render("new");
});

app.listen(5000, function(){
    console.log("Yelpcamp server started");
});
