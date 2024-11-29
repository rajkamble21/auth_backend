const router = require("express").Router()
const {validateRequest} = require('../middleware/validate.js')
const {auth} = require('../middleware/auth.js')

const {login, register, getAllUsers, getUser, updateUser} = require('../controllers/users.js')
const {loginSchema, registerSchema} = require('../validations/users.js')


router.post('/login', validateRequest(loginSchema), login);
router.post('/register', validateRequest(registerSchema), register);
router.get('/getAllUsers', auth, getAllUsers);
router.get('/:id', auth, getUser)
router.put('/:id', auth, updateUser)


module.exports = router;