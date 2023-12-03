const express = require('express');
const router = express.Router();
const { sign_up, sign_in, sign_out } = require('../controller/user_auth_controller.js');


router.post("/signup", sign_up);
router.post("/signin", sign_in);
router.get("/signout", sign_out);
module.exports = router;