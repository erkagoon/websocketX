const { updateAvatar } = require('../models/userQueries');
const { ensureAuthenticated } = require("../middleware/authentication")

module.exports = {
    type: 'post',
    order:2,
    routePath: '/avatar',
    route: (router) => {
        router.post('/avatar', ensureAuthenticated, (req, res) => {
            const userId = req.user.id;
            const newAvatar = req.body.avatar;
        
            if (!newAvatar) {
                return res.status(400).json({ error: 'Lien vers l\'avatar manquant.' });
            }
        
            updateAvatar(userId, newAvatar, (err, results) => {
                if (err) {
                    return res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'avatar.' });
                }
                
                if (results.affectedRows === 0) {
                    return res.status(404).json({ error: 'Aucun utilisateur trouvé avec cet ID.' });
                }
        
                res.status(200).json({ message: 'Avatar mis à jour avec succès!' });
            });
        });        
    }
}
