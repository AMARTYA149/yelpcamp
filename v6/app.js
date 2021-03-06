var express      = require("express"),
    app          = express(),
    bodyParser   = require("body-parser"),
    mongoose     = require("mongoose"),
    passport     = require("passport"),
    LocalStrategy = require("passport-local"),
    User         = require("./models/user"),
    Campground   = require("./models/campground"),
    seedDB       = require("./seeds"),
    Comment      = require("./models/comment");


mongoose.connect("mongodb://localhost/yelp_camp_v6", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");
seedDB();

//Passport Configuration
app.use(require("express-session")({
    secret: "Amartya is the best",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res, next){
    res.locals.currentUser = req.user;
    next();
});

app.get("/", function(req,res){
   res.render("landing");
});

app.get("/campgrounds", function(req,res){ 
    
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index",{campgrounds: allCampgrounds});
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
    res.render("campgrounds/new");
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
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
  //  res.render("show");
 })

 //========================
 //COMMENT ROUTE
 //========================
 app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new",{campground: campground})
        }
    })
 })

 app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
     //lookup campground using ID
     Campground.findById(req.params.id, function(err, campground){
         if(err){
             console.log(err);
             res.redirect("/campgrounds");
         }
         else
         {
          Comment.create(req.body.comment, function(err, comment){
              if(err){
                  console.log(err);
              }
              else{
                  campground.comments.push(comment);
                  campground.save();
                  res.redirect('/campgrounds/' + campground._id);
              }
          });
         }
     });
     //create new comment
     //connect new comment to campground
     //redirect campground to show page
 });

 //===========
 //AUTH ROUTES
 //===========

 // show register form
 app.get("/register", function(req, res){
     res.render("register");
 });

 //handle sign up logic
 app.post("/register", function(req, res){
     var newUser = new User({username: req.body.username});
     User.register(newUser, req.body.password, function(err, user){
         if(err){
             console.log(err);
             return res.render("register");
         }
         passport.authenticate("local")(req,res, function(){
             res.redirect("/campgrounds");
         });
     });
 });

 //show login form
 app.get("/login", function(req, res){
     res.render("login");
 });
 
 //handling login logic
 app.post("/login", passport.authenticate("local", 
     {
         successRedirect: "/campgrounds", 
         failureRedirect: "/login"
     }), function(req, res){
 });

 app.get("/logout", function(req,res){
     req.logout();
     res.redirect("/campgrounds");
 });

 function isLoggedIn(req, res, next){
     if(req.isAuthenticated()){
         return next();
     }
     res.redirect("/login");
 }

app.listen(5000, function(){
    console.log("Yelpcamp server started");
});
