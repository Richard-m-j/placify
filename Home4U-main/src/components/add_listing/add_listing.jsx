import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const cookies = require('js-cookie');

const AddListing = () => {
    const navigate = useNavigate();
    const [uid, setUid] = useState(null);
    const [form, setForm] = useState({
        title: '',
        description: '',
        branch: '',
        salary: '',
        skills: '',
    });

    useEffect(() => {
        const token = cookies.get('access_token');
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        );

        const decodedUid = JSON.parse(jsonPayload).uid;

        setUid(decodedUid);
        console.log('hii' + uid);
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formWithArray = {
                ...form,
                userUid: uid,
            };

            const response = await fetch('http://localhost:3000/api/listing/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formWithArray),
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Creation successful', data);
            navigate('/', { state: { uid: uid } }); // Redirect to main page
        } catch (error) {
            console.error('Error:', error);
            // Handle error, show an alert, etc.
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                margin: 100,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                maxWidth: '500px',
                margin: 'auto',
            }}
        >
            <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Job Title"
                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Job Description"
                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <select
                name="branch"
                value={form.branch}
                onChange={handleChange}
                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            >
                <option value="">Branch</option>
                <option value="Computer Science">Computer</option>
                <option value="Electronics">Electronics</option>
                <option value="Electrical">Electrical</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Civil">Civil</option>
            </select>
            <input
                type="number"
                name="salary"
                value={form.salary}
                onChange={handleChange}
                placeholder="Salary"
                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <input
                type="text"
                name="skills"
                value={form.skills}
                onChange={handleChange}
                placeholder="Skills"
                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />

            <button
                type="submit"
                style={{
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    backgroundColor: '#007BFF',
                    color: 'white',
                    cursor: 'pointer',
                    margin: '10px 0',
                }}
            >
                Add Listing
            </button>
        </form>
    );
};

export default AddListing;
