const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create a person using the prototype
const personSchema = new Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String],
});
// var Person = mongoose.model("Person", personSchema);

module.exports = mongoose.model("Person", personSchema);
