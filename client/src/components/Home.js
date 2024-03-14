import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { updatedata } from './context/ContextProvider';

const Home = () => {
    const history = useHistory();

    const [userData, setUserData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const res = await fetch("/getContacts");
            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await res.json();
            setUserData(data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteUser = async (id) => {
        try {
            const res = await fetch(`/deleteContact/${id}`, {
                method: "DELETE"
            });
            if (!res.ok) {
                throw new Error('Failed to delete contact');
            }
            const deletedData = await res.json();
            console.log(deletedData);
            getData(); // Refresh data after deletion
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="mt-5">
                <div className="container">
                    <div className="add_btn mt-2 mb-2">
                        <NavLink to="/register" className="btn btn-primary">Add Contact</NavLink>
                    </div>

                    <table className="table">
                        <thead>
                            <tr className="table-dark">
                                <th scope="col">ID</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Middle Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone Number 1</th>
                                <th scope="col">Phone Number 2</th>
                                <th scope="col">Address</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.map((contact, index) => (
                                <tr key={contact.id}>
                                    <td>{index + 1}</td>
                                    <td>{contact.firstName}</td>
                                    <td>{contact.middleName}</td>
                                    <td>{contact.lastName}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.phoneNumber1}</td>
                                    <td>{contact.phoneNumber2}</td>
                                    <td>{contact.address}</td>
                                    <td className="d-flex justify-content-between">
                                        <NavLink to={`/view/${contact.id}`}><button className="btn btn-success">View</button></NavLink>
                                        <NavLink to={`/edit/${contact.id}`}><button className="btn btn-primary">Edit</button></NavLink>
                                        <button className="btn btn-danger" onClick={() => deleteUser(contact.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Home;
