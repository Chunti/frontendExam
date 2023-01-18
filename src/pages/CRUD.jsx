import React, { useState, useEffect } from 'react';

function matchForm() {
    const [formData, setFormData] = useState({
        opponentTeam: '',
        inDoors: '',
        type: '',
        judge: '',
        location: '',
        player1: '',
        player2: ''
    });
    const [judges, setJudges] = useState([]);
    const [locations, setLocations] = useState([]);
    const [player1, setPlayer1] = useState([]);
    const [player2, setPlayer2] = useState([]);


    useEffect(() => {
        fetch('/backendExam/api/user/all')
            .then((response) => response.json())
            .then((data) => {
                setJudges(data);
                setPlayer1(data);
                setPlayer2(data);
            });
        fetch('/backendExam/api/location/all')
            .then((response) => response.json())
            .then((data) => {
                setLocations(data);
            });
        
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        fetch('/backendExam/api/admin/creatematch', {
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
                Opponent Team:
                <input
                    type="text"
                    name="opponentTeam"
                    value={formData.opponentTeam}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                InDoors:
                <input
                    type="text"
                    name="inDoors"
                    value={formData.inDoors}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Type:
                <input
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Judge:
                <select
                    name="judge"
                    value={formData.judge}
                    onChange={handleChange}
                >
                    {judges.map((judge) => (
                        <option key={judge.email} value={judge.email}>
                            {judge.id + " " + judge.name}
                        </option>
                    ))}
                </select>
            </label>
            <br />
            <label>
                Location:
                <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                >
                    {locations.map((location) => (
                        <option key={location.address} value={location.address}>
                            {location.address +" " +location.city}
                        </option>
                    ))}
                </select>
            </label>
            <br />
            <label>
                Player1:
                <select
                    name="player1"
                    value={formData.player1}
                    onChange={handleChange}
                >
                    {player1.map((player1) => (
                        <option key={player1.email} value={player1.email}>
                            {player1.id + " " +player1.name}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                 Player2:
                <select
                    name="player2"
                    value={formData.player2}
                    onChange={handleChange}
                >
                    {player2.map((player2) => (
                        <option key={player2.email} value={player2.email}>
                            {player2.id + " " +player2.name}
                        </option>
                    ))}
                </select>
            </label>
            <br />
            <button type="submit">Create Match</button>
        </form>
    );
}


export default matchForm;