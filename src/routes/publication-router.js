const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const PublicationCtrl = require('../controllers/publication-controller');

router.post('/', auth, PublicationCtrl.createPublication);
router.get('/', auth, PublicationCtrl.findAllPublications);
router.get('/:id', auth, PublicationCtrl.findPublicationById);
router.get('/user/:userId', auth, PublicationCtrl.findPublicationsByUser);

module.exports = router;