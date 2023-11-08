const express = require("express");
const app = express();
const bookRoute = express.Router();
let Book = require("../model/Book");

bookRoute.route("/add-book").post( async (req,res,next) => {
 const data = new Book(req.body);
 let result = await data.save();
 res.json(data);

});

bookRoute.route('/').get( async (req,res) => {
let data3 = await Book.find();
res.json(data3);
});

bookRoute.route('/read-book/:id').get( async (req,res) => {
    let data8 = await Book.find( { _id : req.params.id });
     console.log(data8)
     res.json(data8);
});

bookRoute.route('/update-book/:id').put( async (req,res,next) => {
    let data6 =  await Book.updateOne({ _id : req.params.id }, {$set : req.body} );
    res.json(data6);  
});

bookRoute.route('/delete-book/:id').delete(async (req,res,next) => {
    console.log(req.params.id);
    let data4 =  await Book.deleteOne({ _id : req.params.id } );
    res.json(data4);
    });

module.exports = bookRoute;