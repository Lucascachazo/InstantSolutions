const express = require('express')
const router = express.Router()
require('../config/passport')
const passport = require('passport')
const validator = require('../controllers/validator')
const userController = require('../controllers/userController.js')
const articleController = require('../controllers/articleController')
const professionalController=require('../controllers/professionController')
const workController=require('../controllers/workController')
// Ruta para crear usuario que brinda servicios
router.route('/user/provider')
.post(userController.addUserProvider)
// Ruta para crear usuario que solicita servicios
router.route('/user/signIn')
.post(userController.signIn)
//Ruta user registrado
router.route('/user/customer')
.get(userController.getCustomers)
.post(validator.validNewUser, userController.addUserCustomer)

router.route('/user/providers')
.get(userController.getProviders)
//reset password
router.route('/user/requestresetpass')
.post(userController.requestResetPass)

router.route('/user/requestresetuser')
.post(userController.validateResetUser)

router.route('/user/resetpassword')
.post(userController.validateResetPassword)
// Ruta para cargar y obtener artículos
router.route('/article')
.get(articleController.getArticles)
.post(articleController.addArticle)

router.route('/professions')
.get(professionalController.getProfession)
.post(professionalController.addProfession)

//Rutas de trabajos
router.route('/work')
.post(workController.addWork)
.get(workController.getWorks)
.put(workController.changeState)

router.route('/work/:id')
.delete(workController.delWork)

router.route('/userWork/:id')
.get(workController.findWorkById)
//mails
router.route('/mail/sendMail')
.post(userController.sendMail)

router.route('/comment')
.post(userController.sendComment)

router.route('/delcomment')
.put(userController.delComment)

router.route('/rank')
.post(userController.rank)

router.route('/updatecomment')
.post(userController.editComment)

router.route('/user/storage')
.post(passport.authenticate('jwt', {session:false}), userController.preserveLog)
module.exports = router
