const { getUserByUsername, insertUser } = require('../models/userQueries');
const { hashPassword } = require('../config/bcrypt');

module.exports = {
    type: 'post',
    order:1,
    routePath: '/reg',
    route: (router) => {
        router.post('/reg', (req, res) => {
            const { username, password, passwordCheck } = req.body;
        
            // Validation de base
            if (!username || !password || !passwordCheck) {
                return res.status(400).json({ error: 'Veuillez remplir tous les champs.', redirection: false });
            }
        
            if (password !== passwordCheck) {
                return res.status(400).json({ error: 'Les mots de passe ne correspondent pas.', redirection: false });
            }
        
            // Vérifiez si l'utilisateur existe déjà
            getUserByUsername(username, (err, results) => {
                if (err) throw err;
        
                if (results.length > 0) {
                    return res.status(400).json({ error: 'Ce nom d\'utilisateur est déjà pris.', redirection: false });
                } else {
                    // Hachage du mot de passe en utilisant la fonction hashPassword
                    hashPassword(password, (err, hash) => {
                        if (err) throw err;
        
                        // Sauvegardez le nouvel utilisateur dans la base de données
                        insertUser(username, hash, (err, result) => {
                            if (err) throw err;
        
                            res.status(200).json({ error: 'Inscription réussie!', redirection: '/' });
                        });
                    });
                }
            });
        });
    }
}
