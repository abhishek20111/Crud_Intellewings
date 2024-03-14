import React, { useEffect, useState } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';

const Edit = () => {
    const { id } = useParams();
    const history = useHistory();

    const [inputValues, setInputValues] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phoneNumber1: "",
        phoneNumber2: "",
        address: ""
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await fetch(`/getContact/${id}`);
            if (!res.ok) {
                throw new Error('Failed to fetch contact data');
            }
            const data = await res.json();
            setInputValues(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/updateContact/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(inputValues)
            });
            if (!res.ok) {
                throw new Error('Failed to update contact');
            }
            const data = await res.json();
            console.log(data);
            history.push("/");
        } catch (error) {
            console.error(error);
            alert("Failed to update contact");
        }
    };

    return (
        <div className="container">
            <NavLink to="/">Home</NavLink>
            <form className="mt-4">
                <div className="row">
                    <div className="mb-3 col-lg-4">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input type="text" name="firstName" value={inputValues.firstName} onChange={handleInputChange} className="form-control" id="firstName" />
                    </div>
                    <div className="mb-3 col-lg-4">
                        <label htmlFor="middleName" className="form-label">Middle Name</label>
                        <input type="text" name="middleName" value={inputValues.middleName} onChange={handleInputChange} className="form-control" id="middleName" />
                    </div>
                    <div className="mb-3 col-lg-4">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input type="text" name="lastName" value={inputValues.lastName} onChange={handleInputChange} className="form-control" id="lastName" />
                    </div>
                    <div className="mb-3 col-lg-6">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" name="email" value={inputValues.email} onChange={handleInputChange} className="form-control" id="email" />
                    </div>
                    <div className="mb-3 col-lg-3">
                        <label htmlFor="phoneNumber1" className="form-label">Phone Number 1</label>
                        <input type="text" name="phoneNumber1" value={inputValues.phoneNumber1} onChange={handleInputChange} className="form-control" id="phoneNumber1" />
                    </div>
                    <div className="mb-3 col-lg-3">
                        <label htmlFor="phoneNumber2" className="form-label">Phone Number 2</label>
                        <input type="text" name="phoneNumber2" value={inputValues.phoneNumber2} onChange={handleInputChange} className="form-control" id="phoneNumber2" />
                    </div>
                    <div className="mb-3 col-lg-12">
                        <label htmlFor="address" className="form-label">Address</label>
                        <textarea name="address" value={inputValues.address} onChange={handleInputChange} className="form-control" id="address" rows="3"></textarea>
                    </div>
                    <div className="mb-3 col-lg-12">
                        <button type="submit" onClick={updateUser} className="btn btn-primary">Update</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Edit;
