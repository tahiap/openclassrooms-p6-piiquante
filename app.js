// import
const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const helmet = require("helmet")

require("dotenv").config()

const userRoutes = require("./routes/user")
const saucesRoutes = require("./routes/sauce")

// connexion à mongoDB
mongoose
	.connect(
		"mongodb+srv://" +
			process.env.USER +
			":" +
			process.env.PASSWORD +
			"@clusteroc.clibtr6.mongodb.net/?retryWrites=true&w=majority",
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then(() => console.log("Connexion à MongoDB réussie !"))
	.catch(() => console.log("Connexion à MongoDB échouée !"))

// créé une application express
const app = express()

// parse les requêtes qui ont comme Content-Type : application/json et met à disposition le contenu dans le body de la requête
app.use(express.json())

// helmet définit des en-têtes HTTP liés à la sécurité
app.use(helmet())

// ajout des headers à l'objet response
app.use((req, res, next) => {
	// accés à l'API depuis n'importe quelle origine
	res.setHeader("Access-Control-Allow-Origin", "*")
	// ajout des headers mentionnés aux requêtes envoyées vers l'API
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	)
	// envoie des requêtes avec les méthodes mentionnéess
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	)
	res.setHeader("Cross-Origin-Resource-Policy", "same-site")
	next()
})

// attribue un middleware à une route spécifique de l'application
// les chemins d'URL dans le dossier de routes incluront automatiquement le préfixe
app.use("/api/auth", userRoutes)
app.use("/api/sauces", saucesRoutes)
app.use("/images", express.static(path.join(__dirname, "images")))

module.exports = app
