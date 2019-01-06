var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud Rest",
        image: "https://images.pexels.com/photos/1376960/pexels-photo-1376960.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        description: "Cloud rest Cloud rest Cloud rest"
    },
    {
        name: "Lake Laky",
        image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        description: "Cloud rest Cloud rest Cloud rest"
    },
    {
        name: "Trees Around",
        image: "https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        description: "Cloud rest Cloud rest Cloud rest"
    }

]


function seedDB(){

    //remove all campground
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("campground removed");
         //add a few campground
         data.forEach(function(seed){
             Campground.create(seed, function(err, campground){
                 if(err){
                     console.log(err);
                 }
                 else{
                     console.log("added a campground");//create a comment
                     Comment.create({
                         text: "No internet here!",
                         author: "Amar"
                     }, function(err, comment){
                         if(err){
                             console.log(err);
                         }
                         else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created New Comment");
                         }
                        
                     });

                 }
             });
         });
        
    });

   

    
    //add A few comments
}

module.exports = seedDB;