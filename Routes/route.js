const express = require('express');
const Controller = require('../Controller/ConsumerController.js');
const ControllerConst = require('../Controller/ConstructorController.js');
const ControllerDaily = require('../Controller/Daily_WagesController.js');


const router = express.Router();



// const {signup , verifyemail, Registration} = require('../controller/appController.js');

router.post('/Consumer/signup',Controller.ConsumSignup);
router.post('/Consumer/login',Controller.Consumlogin);
router.post('/Contractor/signup',ControllerConst.ConstSignup);
router.post('/Contractor/login',ControllerConst.Constrlogin);
router.post('/Daily_Wages/signup',ControllerDaily.DailySignup);
router.post('/Daily_Wages/login',ControllerDaily.Dailylogin);

module.exports = router;