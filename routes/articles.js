const router = require("express").Router()
const {auth} = require('../middleware/auth.js')
const {createArticle, getAllArticles, deleteArticles} = require('../controllers/articles.js')

router.post('/', auth, createArticle)
router.get('/:id', auth, getAllArticles)
router.delete('/:id', auth, deleteArticles)


module.exports = router;