import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { useNavigate } from 'react-router';

const UpdateUserForm = () => {
    const {id} = useParams();
    // console.log(id)
    const navEr = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    // Fetch user data when the component mounts or when userId changes
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/user/getOne/${id}`);
                const userData = response.data;
                setName(userData.name);
                setEmail(userData.email);
                setAddress(userData.address);
            } catch (error) {
                console.error("Error fetching user data", error);
            }
        };

        if (id) {
            fetchUserData();
        }
    }, [id]);

    const updateUser = async () => {
        try {
            await axios.put(`http://localhost:8000/api/user/update/${id}`, {
                name,
                email,
                address,
            });
            console.log("User updated successfully");
            navEr("/");
            // Optionally refresh user list or navigate away
        } catch (error) {
            console.error("Error updating user", error);
        }
    };

    const handleUpdateUser = (event) => {
        event.preventDefault(); // Prevent form submission
        updateUser();
    };

    return (
        <>
            <form onSubmit={handleUpdateUser}>
                <div className="container">
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)} // Update state on input change
                            required
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Update state on input change
                            required
                        />
                    </div>
                    <div>
                        <label>Address:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)} // Update state on input change
                            required
                        />
                    </div>
                    <button type="submit">Update</button>
                </div>
            </form>
        </>
    );
};

export default UpdateUserForm;
