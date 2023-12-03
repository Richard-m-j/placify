CREATE TABLE users (
    uid SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    email VARCHAR(255) UNIQUE
);

SELECT * FROM public.users
ORDER BY uid ASC 

CREATE TABLE listing (
    property_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    type VARCHAR(50) CHECK(type IN ('house', 'villa', 'office', 'apartment')) NOT NULL,
    price_per_sqft DECIMAL NOT NULL,
    user_uid INT REFERENCES users(uid) ON DELETE CASCADE,
    image_urls TEXT ARRAY DEFAULT '{}',
    description TEXT DEFAULT '',
    bedrooms INT DEFAULT 0,
    bathrooms INT DEFAULT 0,
    area_sqft INT DEFAULT 0,
    year_built INT DEFAULT 0
);


SELECT * FROM public.listing ORDER BY property_id ASC;