const express=require('express');
const app = express();
const router= express.Router();
const { signup , makeAppointment , login, checkLoginStatus}=require('../controllers/handler');
router.post('/ap', makeAppointment);
router.post('/signup', signup);
router.post("/login", login)
router.post("/checkLoginStatus", checkLoginStatus)
module.exports = router;