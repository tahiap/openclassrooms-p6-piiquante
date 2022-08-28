// import
const mongoose = require("mongoose")

// créé un schéma de données pour la base de données MongoDB
const sauceSchema = mongoose.Schema({
	userId: { type: String, required: true },
	name: { type: String, required: true },
	manufacturer: { type: String, required: true },
	description: { type: String, required: true },
	mainPepper: { type: String, required: true },
	imageUrl: { type: String, required: true },
	heat: { type: Number, required: true },
	likes: { type: Number, default: 0 },
	dislikes: { type: Number, default: 0 },
	usersLiked: { type: Array },
	usersDisliked: { type: Array },
})

// export du schéma en tant que modèle Mongoose, le rendant disponible pour le reste de application
module.exports = mongoose.model("Sauce", sauceSchema)
