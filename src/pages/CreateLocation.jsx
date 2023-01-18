import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../utils/settings';

function locationForm() {
    const [formData, setFormData] = useState({
        address: '',
        city: '',
        condition: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        fetch('/backendExam/api/admin/createlocation', {
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
                Address:
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                City:
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Condition:
                <input
                    type="text"
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                />
            </label>
            <br />
            <button type="submit">Create Match</button>
        </form>
    );
}


export default locationForm;