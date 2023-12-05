const { Client } = require('pg');
const pool = require('../db');
const error_handler = require('../utils/error_handler');

const create_listing = async (req, res, next) => {
    try {
        const client = await pool.connect();
        const { title, description, branch, skills, salary } = req.body;
        console.log(req.body);

        const newListingQuery = `INSERT INTO jobs (title, description, branch, skills, salary) VALUES ($1, $2, $3, $4, $5)`;
        await client.query(newListingQuery, [title, description, branch, skills, salary]);
        client.release();
        res.status(201).json({ message: 'Listing created successfully' });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const update_user_listing = async (req, res, next) => {
    try {
        const listingId = req.params.lid;

        const client = await pool.connect();
        const valid = await client.query(`SELECT user_uid FROM listing WHERE property_id = $1`, [listingId]);
        const listingUserUid = valid.rows[0]?.user_uid;

        if (!valid.rows || valid.rows.length === 0) {
            return next(error_handler(400, "No listing found"));
        }
        if (req.user.uid !== listingUserUid) {
            return next(error_handler(404, "You can only update your own listing"));
        }

        const { name, location, type, price_per_sqft, user_uid, image_urls, description, bedrooms, bathrooms, area_sqft, year_built } = req.body;
        const updateListingQuery = `
            UPDATE listing
            SET name = COALESCE($1, name), 
                location = COALESCE($2, location), 
                type = COALESCE($3, type), 
                price_per_sqft = COALESCE($4, price_per_sqft), 
                user_uid = COALESCE($5, user_uid), 
                image_urls = COALESCE($6, image_urls), 
                description = COALESCE($7, description), 
                bedrooms = COALESCE($8, bedrooms), 
                bathrooms = COALESCE($9, bathrooms), 
                area_sqft = COALESCE($10, area_sqft), 
                year_built = COALESCE($11, year_built) 
            WHERE property_id = $12`;
        await client.query(updateListingQuery, [name, location, type, price_per_sqft, user_uid, image_urls, description, bedrooms, bathrooms, area_sqft, year_built, listingId]);
        client.release();
        res.status(200).json({ message: 'Listing updated successfully' });
    } catch (error) {
        next(error);
    }
}

const get_all_listing = async (req, res, next) => {
    try {
        const client = await pool.connect();
        const allListingQuery = `SELECT * FROM jobs`;
        const result = await client.query(allListingQuery);
        client.release();
        console.log(result.rows);
        res.status(200).json(result.rows);
    } catch (error) {
        next(error);
    }
}

const search_listings = async (req, res, next) => {
    try {
        const { skills, branch } = req.query;
        let queryText = 'SELECT * FROM jobs WHERE';
        let queryParams = [];
        let addAnd = false;
        const client = await pool.connect();

        if (branch) {
            if (addAnd) queryText += ' AND';
            queryParams.push(branch);
            queryText += ` branch = $${queryParams.length}`;
            addAnd = true;
        }

        if (skills) {
            if (addAnd) queryText += ' AND';
            queryParams.push(skills);
            queryText += ` skills = $${queryParams.length}`;
            addAnd = true;
        }

        console.log(queryText);
        console.log(queryParams);
        const { rows } = await client.query(queryText, queryParams);
        console.log(rows);
        res.status(200).json(rows);
    } catch (error) {
        next(error);
    }
}

module.exports = { create_listing, update_user_listing, get_all_listing, search_listings };
