import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios'
import {Link} from 'react-router-dom'

const User = () =>{

    const [users, setUsers] = useState([])

    useEffect(()=>{
        const fetchData = async()=>{
            try {   
                const response = await axios.get("http://localhost:8000/api/user/getUsers")
                setUsers(response.data)
            } catch (err){
                console.log("err fetch data")
            }
        }
        fetchData()
    }, []) // run only ones bcs empty array

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/user/delete/${id}`)
            .then((response)=>{
                if(response.status == 201){
                    setUsers(users.filter(user => user._id !== id))
                    alert("ok")}
                
            })
            
        } catch (err) {
            console.error("Error deleting user", err);
        }
    };
    
    return(
        <>  

            <div className="container">
                <h2 className="d-flex align-items-center px-4 bg-success text-white " style={{height:"100px"}}>List : </h2>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Student No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                        users.map((element,index)=>{
                            return(<>
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{element.name}</td>
                                    <td>{element.email}</td>
                                    <td>{element.address}</td>
                                    <td className="actionButtons">
                                        <Link to={`/update/`+element._id}> <button type="button"  className="btn btn-info mx-2" >
                                                <i class="fa-solid fa-pen-to-square "></i>
                                                
                                        </button></Link>
                                        <button type="button" className="btn btn-danger" onClick={() => deleteUser(element._id)}>
                                            <i class="fa-solid fa-trash" ></i>
                                        </button>

                                    </td>
                                 </tr>
                            
                            </>)
                        })
                       }
                    </tbody>
                </table>
                <Link to="/add"><button className="btn btn-primary">add</button></Link>
            </div>
        </>
    )
}


export default User;