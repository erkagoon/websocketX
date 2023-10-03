const { getAllArticles } = require("../models/articleQueries");
const { getHomepageContent } = require("../models/homePageQueries");

module.exports = {
	type: "get",
	order: 0,
	routePath: "/",
	route: (router) => {
		router.get("/", (req, res) => {
			getAllArticles((err, articlesResult) => {
				if (err) {
					console.error(err);
					res
						.status(500)
						.json({ error: "Erreur lors de la récupération des articles." });
					return;
				}

				getHomepageContent((err, homepageResult) => {
					if (err) {
						console.error(err);
						res.status(500).json({
							error:
								"Erreur lors de la récupération du contenu de la page d'accueil.",
						});
						return;
					}
					if (typeof homepageResult === "array" && homepageResult.length > 0) {
						const homepageContent = homepageResult[0]; // Car LIMIT 1 nous renvoie un tableau avec un seul élément

						res.render("index", {
							title: homepageContent.title || "Page d'accueil", // Utilisez le titre récupéré s'il existe
							text: homepageContent.texte, // Nouveau champ pour le texte
							cssBody: "/assets/css/body.css",
							cssPage: "/assets/css/index.css",
							userBar: "/assets/css/userBar.css",
							articles: articlesResult,
						});
					} else {
						res.render("index", {
							title: "Le Jeu Mystère", // Utilisez le titre récupéré s'il existe
							text: "Plongée dans l'Inconnu\n\nChapitre 1 : \"L'Énigme du Jeu Inconnu\"\nImaginez un monde de jeux vidéo où l'inconnu règne en maître, un territoire encore inexploré par les foules de joueurs. Dans ce premier chapitre, nous allons plonger dans l'univers mystérieux de ce jeu inconnu et dévoiler les secrets qui se cachent derrière.\n\nChapitre 2 : \"L'Expérience Unique qui Vous Attend\"\nVous êtes-vous déjà demandé ce que cela fait de jouer à un jeu sans aucun préjugé ni attente ? Dans ce chapitre, nous explorerons les caractéristiques uniques de ce jeu mystère, des graphismes à couper le souffle à des mécaniques de jeu innovantes. Préparez-vous à être surpris par cette expérience inédite.\n\nChapitre 3 : \"Le Verdict des Premiers Joueurs\"\nNous avons recueilli les impressions de ceux qui ont déjà osé plonger dans ce jeu inconnu. Dans ce chapitre, découvrez ce que les premiers joueurs ont à dire sur leur expérience. Est-ce que ce jeu est à la hauteur des attentes ? Les réactions sont-elles positives ou négatives ? Les réponses pourraient vous surprendre.\n\nChapitre 4 : \"La Chasse aux Indices et au Succès\"\nLe mystère qui entoure ce jeu est loin d'être résolu. Dans ce dernier chapitre, nous examinerons les théories et les indices découverts jusqu'à présent, ainsi que les défis qui attendent les futurs joueurs. Êtes-vous prêt à relever le défi et à plonger dans l'inconnu ?", // Nouveau champ pour le texte
							cssBody: "/assets/css/body.css",
							cssPage: "/assets/css/index.css",
							userBar: "/assets/css/userBar.css",
							articles: [],
						});
					}
				});
			});
		});
	},
};
