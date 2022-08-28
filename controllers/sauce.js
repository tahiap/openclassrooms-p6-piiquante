// import
const fs = require("fs")
const Sauce = require("../models/sauce")

// middleware pour créer une sauce
exports.createSauce = (req, res, next) => {
	const sauceObject = JSON.parse(req.body.sauce)
	delete sauceObject._id
	delete sauceObject._userId
	const sauce = new Sauce({
		...sauceObject,
		userId: req.auth.userId,
		imageUrl: `${req.protocol}://${req.get("host")}/images/${
			req.file.filename
		}`,
	})

	sauce
		.save()
		.then(() => {
			res.status(201).json({ message: "Sauce enregistrée !" })
		})
		.catch((error) => {
			res.status(400).json({ error })
		})
}

// middleware pour afficher toutes les sauces
exports.getAllSauces = (req, res, next) => {
	Sauce.find()
		.then((sauces) => {
			res.status(200).json(sauces)
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			})
		})
}

// middleware pour supprimer une sauce
exports.deleteSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => {
			// vérifie que l'utilisateur qui supprime la sauce soit celui qui l'a créé
			if (sauce.userId !== req.auth.userId) {
				res.status(401).json({ message: "Non autorisé" })
			} else {
				const filename = sauce.imageUrl.split("/images/")[1]
				// supprime l'image et exécute la fonction de suppression
				fs.unlink(`images/${filename}`, () => {
					Sauce.deleteOne({ _id: req.params.id })
						.then(() => {
							res.status(200).json({ message: "Sauce supprimée !" })
						})
						.catch((error) => res.status(401).json({ error }))
				})
			}
		})
		.catch((error) => {
			res.status(500).json({ error })
		})
}

// middleware pour afficher une sauce
exports.getOneSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => {
			res.status(200).json(sauce)
		})
		.catch((error) => {
			res.status(404).json({
				error: error,
			})
		})
}

// middleware pour modifier une sauce
exports.modifySauce = (req, res, next) => {
	// vérifie si la requête contient un fichier
	const sauceObject = req.file
		? {
				...JSON.parse(req.body.sauce),
				imageUrl: `${req.protocol}://${req.get("host")}/images/${
					req.file.filename
				}`,
		  }
		: { ...req.body }

	delete sauceObject._userId
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => {
			// vérifie que l'utilisateur qui supprime la sauce soit celui qui l'a créé
			if (sauce.userId !== req.auth.userId) {
				res.status(401).json({ message: "Non autorisé" })
			} else {
				const filename = sauce.imageUrl.split("/images/")[1]
				// supprime l'image et exécute la fonction de mise à jour
				fs.unlink(`images/${filename}`, () => {
					Sauce.updateOne(
						{ _id: req.params.id },
						{ ...sauceObject, _id: req.params.id }
					)
						.then(() => res.status(200).json({ message: "Sauce modifiée !" }))
						.catch((error) => res.status(401).json({ error }))
				})
			}
		})
		.catch((error) => {
			res.status(400).json({ error })
		})
}

// middleware pour liker/disliker une sauce
exports.likeSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => {
			switch (req.body.like) {
				case 1:
					// ajouter un like
					if (!sauce.usersLiked.includes(req.body.userId)) {
						Sauce.updateOne(
							{ _id: req.params.id },
							{
								$inc: { likes: 1 },
								$push: { usersLiked: req.body.userId },
							}
						)
							.then(() => res.status(201).json({ message: "Like +1" }))
							.catch((error) => {
								res.status(400).json({ error })
							})
					}
					break
				case -1:
					// ajouter un dislike
					if (!sauce.usersDisliked.includes(req.body.userId)) {
						Sauce.updateOne(
							{ _id: req.params.id },
							{
								$inc: { dislikes: 1 },
								$push: { usersDisliked: req.body.userId },
							}
						)
							.then(() => res.status(201).json({ message: "Dislike +1" }))
							.catch((error) => {
								res.status(400).json({ error })
							})
					}
					break
				case 0:
					// retirer le like ou le dislike
					if (sauce.usersLiked.includes(req.body.userId)) {
						Sauce.updateOne(
							{ _id: req.params.id },
							{
								$inc: { likes: -1 },
								$pull: { usersLiked: req.body.userId },
							}
						)
							.then(() => res.status(201).json({ message: "Like -1" }))
							.catch((error) => {
								res.status(400).json({ error })
							})
					} else if (sauce.usersDisliked.includes(req.body.userId)) {
						Sauce.updateOne(
							{ _id: req.params.id },
							{
								$inc: { dislikes: -1 },
								$pull: { usersDisliked: req.body.userId },
							}
						)
							.then(() => res.status(201).json({ message: "Dislike -1" }))
							.catch((error) => {
								res.status(400).json({ error })
							})
					}
					break
			}
		})

		.catch((error) => {
			res.status(404).json({ error })
		})
}
