// import
const jwt = require("jsonwebtoken")

// middleware d'authentification
module.exports = (req, res, next) => {
	try {
		// extraction du token du header Authorization de la requête entrante
		const token = req.headers.authorization.split(" ")[1]
		// décodage du token
		const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
		// extraction du userId du token et ajout à l'objet request
		const userId = decodedToken.userId
		req.auth = {
			userId: userId,
		}
		next()
	} catch (error) {
		res.status(401).json({ error })
	}
}

// application de ce middleware aux routes sauces
