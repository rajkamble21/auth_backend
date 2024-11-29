const router = require("express").Router()
const {auth} = require('../middleware/auth.js')
const {createComment} = require('../controllers/comments.js')

router.post('/', auth, createComment)

module.exports = router;