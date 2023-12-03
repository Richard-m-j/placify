const express = require('express');
const router = express.Router();
const pool = require('../db');
const verify_user = require('../utils/verify_user.js');
const { update_user, delete_user, get_user_listings, delete_user_listing, user_details } = require('../controller/user_controller.js');

router.get('/test', async (req, res) => {
    const client = await pool.connect();
    client.query('SELECT * FROM users', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result.rows);
        }
    }
    );
}
);


router.post('/update/:id', verify_user, update_user);
router.delete('/delete/:id', verify_user, delete_user);
router.get("/listings/:id", verify_user, get_user_listings);
router.delete("/listings/:id", verify_user, delete_user_listing);
router.get("/details/:id", verify_user, user_details);

module.exports = router;