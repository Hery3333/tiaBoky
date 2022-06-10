const mongoose = require("mongoose")

const LecteurSchema = new mongoose.Schema({
    numero: { type: String },
    nom: { type: String },
    prenom: { type: String },
    image: { type: String },
    nbPretActuel: { type: Number, default: 0, max:3 }
})

module.exports = mongoose.model("Lecteur", LecteurSchema)