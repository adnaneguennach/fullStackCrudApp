import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const UserForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const navEr = useNavigate();
    const addUser = async (newUser) => {
        try {
            const response = await axios.post("http://localhost:8000/api/user/create", newUser);
            const createdUser = response.data;
            // Update your users state with the new user
            // Assuming setUsers is coming from a parent component via props
            setUsers(prevUsers => [...prevUsers, createdUser]);
            
        } catch (error) {
            console.error("Error adding user", error);
        }
    };

    const handleAddUser = (event) => {
        event.preventDefault(); // Prevent default form submission
        const newUser = {
            name: name,
            email: email,
            address: address,
        };
        addUser(newUser);
        navEr("/");
        // Optionally, reset the form fields
        setName('');
        setEmail('');
        setAddress('');
    };

    return (
        <>
            <form onSubmit={handleAddUser}>
                <div className="container">
                    <div className="">
                        <label>Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="">
                        <label>Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="">
                        <label>Address:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)} 
                            required
                        />
                    </div>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </>
    );
};

export default UserForm;
