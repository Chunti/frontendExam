import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../utils/settings';

function playerForm() {
    const [formData, setFormData] = useState({
        name: '',
        userPass: '',
        phone: '',
        email: '',
        status: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        fetch('/backendExam/api/admin/createplayer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <form onSubmit={handleSubmit} id="matchForm">
            <label>
                Player Name:
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Password:
                <input
                    type="password"
                    name="userPass"
                    value={formData.userPass}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Phone:
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Email:
                <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                 Status:
                <input
                    type="text"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                />
            </label>
            <br />
            <button type="submit">Create Match</button>
        </form>
    );
}


export default playerForm;