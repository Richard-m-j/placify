const express = require('express');
const router = express.Router();
const verify_user = require('../utils/verify_user.js');
const { create_listing, update_user_listing, get_all_listing, search_listings } = require('../controller/listing_controller.js');
const { update_user } = require('../controller/user_controller.js');


router.post("/create", verify_user, create_listing);
router.put("/update/:lid", verify_user, update_user_listing);
router.get("/listings/get", verify_user, get_all_listing);
router.get("/listings/search", verify_user, search_listings)

module.exports = router;