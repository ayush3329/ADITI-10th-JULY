const express=require('express');
const app = express();
const router= express.Router();
const { signup , makeAppointment , login, checkLoginStatus, test, gettest, jwtDecode,showAppointments}=require('../controllers/handler');
router.post('/signup', signup);
router.post("/login", login);
router.post("/showAppointments", showAppointments);
router.post("/checkLoginStatus", checkLoginStatus);
router.post("/test", jwtDecode, test);
router.post("/gettest", gettest)
router.post("/makeappointment", jwtDecode, makeAppointment)
module.exports = router;