import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const cookies = require("js-cookie");



const AddListing = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        job_title: '',
        job_description: '',
        branch: '',
        salary: '',
        skills: '',
        user_uid: '',
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
            <input type="text" name="Job Title" value={form.job_title} onChange={handleChange} placeholder="Job Title" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
            <input type="text" name="Job Description" value={form.job_description} onChange={handleChange} placeholder="Job Description" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
            <select name="branch" value={form.branch} onChange={handleChange} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                <option value="">Branch</option>
                <option value="Computer Science">Computer</option>
                <option value="Electronics">Electronics</option>
                <option value="Electrical">Electrical</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Civil">Civil</option>
            </select>
            <input type="number" name="Salary" value={form.salary} onChange={handleChange} placeholder="Salary" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
            <input type="text" name="skills" value={form.skills} onChange={handleChange} placeholder="skills" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />

            <button type="submit" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#007BFF', color: 'white', cursor: 'pointer', margin: '10px 0' }}>Add Listing</button>
        </form>
    );
};

export default AddListing;