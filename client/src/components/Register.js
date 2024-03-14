import React, { useContext, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { adddata } from './context/ContextProvider';

const Register = () => {

    const { udata, setUdata } = useContext(adddata);

    const history = useHistory();

    const [inpval, setINP] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phoneNumber1: "",
        phoneNumber2: "",
        address: "",
    })

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }

    const addinpdata = async (e) => {
        e.preventDefault();

        const { firstName, middleName, lastName, email, phoneNumber1, phoneNumber2, address } = inpval;

        if (firstName === "") {
            alert("First Name is required")
        } else if (lastName === "") {
            alert("Last Name is required")
        } else if (email === "") {
            alert("Email is required")
        } else if (!email.includes("@")) {
            alert("Please enter a valid email address")
        } else if (phoneNumber1 === "") {
            alert("Phone Number 1 is required")
        } else if (address === "") {
            alert("Address is required")
        } else {
            const res = await fetch("/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName,
                    middleName,
                    lastName,
                    email,
                    phoneNumber1,
                    phoneNumber2,
                    address,
                })
            });

            const data = await res.json();
            console.log(data);

            if (res.status === 422 || !data) {
                console.log("error ");
                alert("Error adding contact");

            } else {
                history.push("/")
                setUdata(data)
                console.log("Contact added successfully");
            }
        }
    }

    return (
        <div className="container">
            <NavLink to="/">Home</NavLink>
            <form className="mt-4">
                <div className="row">
                    <div class="mb-3 col-lg-4 col-md-4 col-12">
                        <label for="firstName" class="form-label">First Name</label>
                        <input type="text" value={inpval.firstName} onChange={setdata} name="firstName" class="form-control" id="firstName" />
                    </div>
                    <div class="mb-3 col-lg-4 col-md-4 col-12">
                        <label for="middleName" class="form-label">Middle Name</label>
                        <input type="text" value={inpval.middleName} onChange={setdata} name="middleName" class="form-control" id="middleName" />
                    </div>
                    <div class="mb-3 col-lg-4 col-md-4 col-12">
                        <label for="lastName" class="form-label">Last Name</label>
                        <input type="text" value={inpval.lastName} onChange={setdata} name="lastName" class="form-control" id="lastName" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" value={inpval.email} onChange={setdata} name="email" class="form-control" id="email" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="phoneNumber1" class="form-label">Phone Number 1</label>
                        <input type="text" value={inpval.phoneNumber1} onChange={setdata} name="phoneNumber1" class="form-control" id="phoneNumber1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="phoneNumber2" class="form-label">Phone Number 2</label>
                        <input type="text" value={inpval.phoneNumber2} onChange={setdata} name="phoneNumber2" class="form-control" id="phoneNumber2" />
                    </div>
                    <div class="mb-3 col-lg-12 col-md-12 col-12">
                        <label for="address" class="form-label">Address</label>
                        <textarea name="address" value={inpval.address} onChange={setdata} className="form-control" id="address" rows="3"></textarea>
                    </div>
                    <div className="mb-3 col-lg-12">
                        <button type="submit" onClick={addinpdata} className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default Register;
