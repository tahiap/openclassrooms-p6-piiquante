// import
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../models/user")

// middleware d'inscription
exports.signup = (req, res, next) => {
	const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
	const emailRegex =
		/[A-Za-z0-9](([_.-]?[A-Za-z0-9]+)*)@([A-Za-z0-9]+)(([_.-]?[A-Za-z0-9]+)*).([A-Za-z]{2,})/

	if (
		passwordRegex.test(req.body.password) &&
		emailRegex.test(req.body.email)
	) {
		bcrypt
			.hash(req.body.password, 10)
			.then((hash) => {
				const user = new User({
					email: req.body.email,
					password: hash,
				})
				user
					.save()
					.then(() => res.status(201).json({ message: "Utilisateur créé !" }))
					.catch((error) => res.status(400).json({ error }))
			})
			.catch((error) => res.status(500).json({ error }))
	} else {
		return res
			.status(403)
			.json({ message: "L'email et/ou le mot passe ne sont pas valides." })
	}
}

// middleware de connexion
exports.login = (req, res, next) => {
	User.findOne({ email: req.body.email })
		.then((user) => {
			if (!user) {
				return res
					.status(401)
					.json({ error: "Utilisateur et/ou mot de passe incorrect(s) !" })
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid) {
						return res
							.status(401)
							.json({ error: "Utilisateur et/ou mot de passe incorrect(s) !" })
					}
					res.status(200).json({
						userId: user._id,
						token: jwt.sign(
							{ userId: user._id },
							process.env.TOKEN_SECRET_KEY,
							{
								expiresIn: "24h",
							}
						),
					})
				})
				.catch((error) => res.status(500).json({ error }))
		})
		.catch((error) => res.status(500).json({ error }))
}
