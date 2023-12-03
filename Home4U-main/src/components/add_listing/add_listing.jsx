import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const cookies = require("js-cookie");



const AddListing = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        location: '',
        type: '',
        price_per_sqft: '',
        user_uid: '',
        image_urls: {},
        description: '',
        bedrooms: 0,
        bathrooms: 0,
        area_sqft: 0,
        year_built: 0,
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = cookies.get('access_token');
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const uid = await JSON.parse(jsonPayload).uid;
        console.log(uid);
        setForm({
            ...form,
            user_uid: uid,
        });
        console.log(form);

        const formWithArray = {
            ...form,
            image_urls: form.image_urls.split(',').map(url => url.trim()),
        };

        const response = await fetch('http://localhost:3000/api/listing/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formWithArray),
            credentials: 'include',
        }).then(response => response.json())
            .then(data => {

                console.log('creation successful');
                console.log(data);
                navigate('/', { state: { uid: uid } }); // Redirect to main page

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit} style={{ margin: 100, display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '500px', margin: 'auto' }}>
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
            <input type="text" name="location" value={form.location} onChange={handleChange} placeholder="Location" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
            <select name="type" value={form.type} onChange={handleChange} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                <option value="">Select type</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
                <option value="office">Office</option>
                <option value="apartment">Apartment</option>
            </select>
            <input type="number" name="price_per_sqft" value={form.price_per_sqft} onChange={handleChange} placeholder="Price per sqft" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
            <input type="number" name="bedrooms" value={form.bedrooms} onChange={handleChange} placeholder="Number of bedrooms" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', margin: '10px 0' }} />
            <input type="number" name="bathrooms" value={form.bathrooms} onChange={handleChange} placeholder="Number of bathrooms" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', margin: '10px 0' }} />
            <input type="text" name="image_urls" value={form.image_urls} onChange={handleChange} placeholder="Image URLs (comma-separated)" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', margin: '10px 0' }} />
            <input type="number" name="area_sqft" value={form.area_sqft} onChange={handleChange} placeholder="Area (sqft)" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', margin: '10px 0' }} />
            <input type="number" name="year_built" value={form.year_built} onChange={handleChange} placeholder="Year built" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', margin: '10px 0' }} />
            <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="Description" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', margin: '10px 0' }} />


            <button type="submit" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#007BFF', color: 'white', cursor: 'pointer', margin: '10px 0' }}>Add Listing</button>
        </form>
    );
};

export default AddListing;