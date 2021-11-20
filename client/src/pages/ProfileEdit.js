import React, {useState, useEffect} from 'react';
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
const [instruments, setInstruments] = useState([])
const [selectedFile, setSelectedFile] = useState(null);


const instrumentSelectHandle = (event) => {
    setInstruments(event)
}

useEffect(()=> {
    if (data) {
        const {firstName, lastName, userName, bio, email} = data.user
        setFormState({firstName, lastName, userName, bio, email})
        console.log(data)
        if (data.user.instruments) {
            const multiInstruments = data.user.instruments.map((instrument) => {
                
                const label = instrument.name
                const value = instrument._id
                return {label, value}

            })
            setInstruments(multiInstruments)
        }
    }
},[data])

useEffect(()=> {
    const selectedInstruments = instruments.map((instrument) => instrument.value)
    setFormState((formState) => {return {...formState, instruments: selectedInstruments}})
 },[instruments])

 useEffect(()=>{
    setFormState((selectedFile) => {
        const img = selectedFile;
        return {...formState, img}
    })
 }, [selectedFile])

const [formState, setFormState] = useState({
        firstName: "",
        lastName:"",
        userName: "",
        email:"",
        img: "",
        bio: ""
      }); 

const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
        ...formState,
        [name]: value,
    });
};

const handlePhoto = (e) => {
    setFormState({...formState, img: e.target.files[0]});
}

const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
       
        await updateUser({
            variables: { ...formState},
            });
            return window.location = "/profile/" + userName;
    } catch (e) {
        console.error(e);
    }
};

if (!Auth.loggedIn()){
    return <Redirect to="/login" />;
}

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
                        <input className="mb-4 rounded-lg border-2 border-gray-300 p-2 w-full"
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            defaultValue={data.user.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="text-xl text-gray-600">Last Name</label>
                        <input className="mb-4 rounded-lg border-2 border-gray-300 p-2 w-full"
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            defaultValue={data.user.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="text-xl text-gray-600">User Name</label>
                        <input className="mb-4 rounded-lg border-2 border-gray-300 p-2 w-full"
                            type="text"
                            placeholder="User Name"
                            name="userName"
                            defaultValue={data.user.userName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="text-xl text-gray-600">Email</label>
                        <input className="mb-4 rounded-lg border-2 border-gray-300 p-2 w-full"
                            type="email"
                            placeholder="Email"
                            name="email"
                            defaultValue={data.user.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-xl text-gray-600">Instruments</label>
                        <InstrumentList filterList={instruments} filterHandle={instrumentSelectHandle} className="rounded-lg border-2 border-gray-300 p-2 w-full" />
                    </div>
                    <div>
                        <label className="text-xl text-gray-600">About Me</label>
                        <textarea className="mb-24 rounded-lg border-2 border-gray-300 p-2 w-full h-48"
                            type="text"
                            placeholder="About Me"
                            name="bio"
                            defaultValue={data.user.bio}
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
