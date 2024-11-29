const router = require("express").Router()
const {validateRequest} = require('../middleware/validate.js')
const {auth} = require('../middleware/auth.js')

const {login, register, getAllUsers} = require('../controllers/users.js')
const {loginSchema, registerSchema} = require('../validations/users.js')

router.post('/login', validateRequest(loginSchema), login);
router.post('/register', validateRequest(registerSchema), register);
router.get('/getAllUsers', auth, getAllUsers);

module.exports = router;