// import
const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

// créé un schéma de données pour la base de données MongoDB
const userSchema = mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
})

userSchema.plugin(uniqueValidator)

// export du schéma en tant que modèle Mongoose, le rendant disponible pour le reste de application
module.exports = mongoose.model("User", userSchema)
