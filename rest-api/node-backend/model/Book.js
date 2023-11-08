const mongoose = require('mongoose');
const Bookschema = mongoose.Schema ({
    name:  { type:String },
    price: { type:String },
    desc:  { type: String}
});

module.exports = mongoose.model('Book',Bookschema);

