import React, {useState} from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_USER } from '../utils/mutations';
import { QUERY_USER } from '../utils/queries';
import InstrumentList from '../components/InstrumentList'

import Auth from '../utils/auth';

const ProfileEdit = () => {

const userName = Auth.getProfile().data.userName

const { loading, data} = useQuery(QUERY_USER, {variables: { userName } });
const [updateUser, { error, data: updateData }] = useMutation(UPDATE_USER);
const [formState, setFormState] = useState({
        userName: "",
        instruments: [],
        img: "",
        bio: ""
      });
if (!Auth.loggedIn()){
    return <Redirect to="/login" />;
}

if (!Auth.loggedIn()) {
    return <Redirect to="/login" />;
  }
  

const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
        ...formState,
        [name]: value,
    });
};

const handlePhoto = () => {
    return console.log("PHOTO")
}

const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
        await updateUser({
            variables: { ...formState},
            });
            return <Redirect to="/profile/me" />;
    } catch (e) {
        console.error(e);
    }
    };


if (loading) {
return <div>Loading...</div>;
}

return (
    <div className="py-24">
    <div className="max-w-5xl mx-auto sm:px-6 lg:px-8 h-full">
        <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg">
            <div className="p-6 bg-white border-2 border-gray-200">
                <h1 className="np-title mb-8 text-3xl font-bold">Edit Profile</h1>
                <form id='newPost-form' onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                        <label className="text-xl text-gray-600">Profile Photo</label>
                        <input className="rounded-lg border-2 border-gray-300 p-2 w-full"
                            type="file" 
                            accept=".png, .jpg, .jpeg"
                            name="photo"
                            onChange={handlePhoto}
                        />                    
                    </div>
                    <div>
                        <label className="text-xl text-gray-600">First Name</label>
                        <input className="bg-gray-200 mb-4 rounded-lg border-2 border-gray-300 p-2 w-full"
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            value={data.user.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="text-xl text-gray-600">Last Name</label>
                        <input className="bg-gray-200 mb-4 rounded-lg border-2 border-gray-300 p-2 w-full"
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            value={data.user.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="text-xl text-gray-600">User Name</label>
                        <input className="bg-gray-200 mb-4 rounded-lg border-2 border-gray-300 p-2 w-full"
                            type="text"
                            placeholder="User Name"
                            name="userName"
                            value={data.user.userName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="text-xl text-gray-600">Email</label>
                        <input className="bg-gray-200 mb-4 rounded-lg border-2 border-gray-300 p-2 w-full"
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={data.user.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-xl text-gray-600">Instruments</label>
                        <InstrumentList className="rounded-lg border-2 border-gray-300 p-2 w-full"  preSel={data.user.instruments}/>
                    </div>
                    <div>
                        <label className="text-xl text-gray-600">About Me</label>
                        <textarea className="mb-24 rounded-lg border-2 border-gray-300 p-2 w-full h-48"
                            type="text"
                            placeholder="About Me"
                            name="bio"
                            value={data.user.bio}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-row-reverse p-1">
                        <button type="submit" className="w-3/12 rounded-lg p-3 bg-black text-white hover:bg-yellow-500" required>Submit</button>
                    </div>
                </form>    
            </div>
        </div>
    </div>
</div>
)}

export default ProfileEdit;