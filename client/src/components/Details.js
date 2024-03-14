import React, { useEffect, useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WorkIcon from '@mui/icons-material/Work';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { NavLink, useParams, useHistory } from 'react-router-dom';

const Details = () => {
    const [userData, setUserData] = useState({});
    const { id } = useParams();
    const history = useHistory();

    const getData = async () => {
        try {
            const res = await fetch(`/getContact/${id}`);
            if (!res.ok) {
                throw new Error('Failed to fetch contact data');
            }
            const data = await res.json();
            setUserData(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const deleteUser = async (id) => {
        try {
            const res = await fetch(`/deleteContact/${id}`, {
                method: "DELETE"
            });
            if (!res.ok) {
                throw new Error('Failed to delete contact');
            }
            history.push("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mt-3">
            <h1 style={{ fontWeight: 400 }}>Contact Details</h1>

            <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                    <div className="add_btn">
                        <NavLink to={`/edit/${userData.id}`}>
                            <button className="btn btn-primary mx-2"><CreateIcon /></button>
                        </NavLink>
                        <button className="btn btn-danger" onClick={() => deleteUser(userData.id)}><DeleteOutlineIcon /></button>
                    </div>
                    <div className="row">
                        <div className="left_view col-lg-6 col-md-6 col-12">
                            <img src="/profile.png" style={{ width: 50 }} alt="profile" />
                            <h3 className="mt-3">Name: <span>{userData.firstName} {userData.middleName} {userData.lastName}</span></h3>
                            <h3 className="mt-3">Email: <span>{userData.email}</span></h3>
                            <p className="mt-3"><WorkIcon />Occupation: <span>{userData.work}</span></p>
                        </div>
                        <div className="right_view  col-lg-6 col-md-6 col-12">
                            <p className="mt-5"><PhoneAndroidIcon />Mobile: <span>{userData.phoneNumber1}</span></p>
                            <p className="mt-3"><PhoneAndroidIcon />Alternate Mobile: <span>{userData.phoneNumber2}</span></p>
                            <p className="mt-3"><LocationOnIcon />Address: <span>{userData.address}</span></p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Details;
