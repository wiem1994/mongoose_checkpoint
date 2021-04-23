const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

//Create and Save a Record of a Model:
// Person.create({
//     name: "basma",
//     age: 15,
//     favoriteFoods: ["cheesecake", "burritos"],
// });
// var createAndSavePerson = () => {
//     Person.save((err, data) => {
//         if (err) {
//             return err;
//         } else {
//             return "group of persons is added";
//         }
//     });
// };

// Create Many Records with model.create()
// Person.create([
//     { name: "houssem", age: 15, favoriteFoods: ["cupcake"] },
//     { name: "amir", age: 9, favoriteFoods: ["tacos"] },
//     { name: "wissal", age: 10, favoriteFoods: ["burger", "burritos"] },
//     { name: "asma", age: 19, favoriteFoods: ["burritos"] },
// ]);
// var createAndSavePerson = () => {
//     Person.save((err, data) => {
//         if (err) {
//             return err;
//         } else {
//             return "group of persons is added";
//         }
//     });
// };

//Use model.find() to Search Your Database
router.get("/", async (req, res) => {
    try {
        const persons = await Person.find();
        res.status(200).send({ msg: "list of persons:", persons });
    } catch (error) {
        res.status(500).send("failed to show the persons");
    }
});

// Find all the people having a given name, using Model.find()
router.get("/:name", async (req, res) => {
    try {
        const name = req.params.name;
        const person = await Person.find({ name });
        res.status(200).send(person);
    } catch (error) {
        res.status(500).send("failed to show the person");
    }
});

//Use model.findOne() to Return a Single Matching Document from Your Database
// NB : cette méthode fonctionne si seulement si je mets les deux méthodes get en dessus en commentaire
//sinon j'obtiens un tableau vide

router.get("/favoriteFood", async (req, res) => {
    try {
        const persons = await Person.find({
            favoriteFoods: { $in: ["burritos"] },
        });
        res.status(200).send({ msg: "list of persons:", persons });
    } catch (error) {
        res.status(500).send("failed to show the persons");
    }
});

//Use model.findById() to Search Your Database By _id

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const person = await Person.findOne({ _id: id });
        res.status(200).send(person);
    } catch (error) {
        res.status(500).send("failed to show the person");
    }
});

//Perform Classic Updates by Running Find, Edit, then Save
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const person = await Person.findOne({ _id: id });
        person.favoriteFoods.push("hamburger");
        person.save;
        res.status(200).send(person);
    } catch (error) {
        res.status(500).send("person is not updated");
    }
});

//Perform New Updates on a Document Using model.findOneAndUpdate()

router.put("/:name", async (req, res) => {
    try {
        const name = req.params.name;
        const person = await Person.findOneAndUpdate(
            { name },
            { $set: { age: 20 } }
        );
        res.status(200).send(person);
    } catch (error) {
        res.status(500).send("person is not updated");
    }
});

//Delete One Document Using model.findByIdAndRemove
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const person = await Person.findByIdAndRemove({ _id: id });
        res.status(200).send(`person with id: ${id} is removed`);
    } catch (error) {
        res.status(500).send("person is not removed");
    }
});

// Delete Many Documents with model.remove()
router.delete("/", async (req, res) => {
    try {
        const persons = await Person.remove({ name: "amir" });
        res.status(200).send("persons with the name of amir are deleted");
    } catch (error) {
        res.status(500).send("persons are not removed");
    }
});

//Chain Search Query Helpers to Narrow Search Results
// NB : cette méthode fonctionne si seulement si je mets les autres méthodes get en dessus en commentaire
//sinon j'obtiens un tableau vide
router.get("/list", async (req, res) => {
    try {
        const persons = await Person.find({
            favoriteFoods: { $in: ["burritos"] },
        })

            .sort({ name: "asc" })
            .limit(2)
            .select({ age: 0 });

        res.status(200).send({
            msg: "the two persons who like burritos :",
            persons,
        });
    } catch (error) {
        res.status(500).send("failed to search");
    }
});

module.exports = router;
