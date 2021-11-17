import React, {useState} from 'react';
import { Redirect, Link } from 'react-router-dom';
import { QUERY_RHYTHMS, QUERY_POST} from '../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_POST, ADD_POST } from '../utils/mutations';
import { useParams } from 'react-router-dom';
import InstrumentList from

import Auth from '../utils/auth';


const ProfileEdit = () => {


const { postId } = useParams();

const {loading: rhythmLoad, data: rhythmData} = useQuery(QUERY_RHYTHMS);
const {loading: postLoad, data: postData} = useQuery(QUERY_POST, {
        variables: {postId: postId}
    });

const [selected, setSelected] = useState([]);
const [formState, setFormState] = useState({
        content: "",
        url: "",
        title: "",
        rhythm: ""
      });


    //   const [formState, setFormState] = useState({
    //     ...postData
    //   });

const [addPost, { error: addError, data: addData }] = useMutation(ADD_POST);
const [updatePost, { error: updateError, data: updateData }] = useMutation(UPDATE_POST);

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

const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
        if(postData.post._id){
            const userId = postData.post.user._id
            console.log(userId)
             await updatePost({
                variables: { ...formState, user:postData.post.user._id, _id:postData.post._id  },
                });
                console.log("UpdatePost")
                return <Redirect to="/profile/me" />;
        } else {
             await addPost({
                variables: { ...formState },
                });
                console.log("AddPost")
                return <Redirect to="/" />;
        }

        
        
    } catch (e) {
        console.error(e);
    }
    };


let canEdit
let rhythmId = null
if (postLoad || rhythmLoad) {
return <div>Loading...</div>;
}

if (postData.post._id){
    canEdit = true;
    rhythmId = postData.post.rhythm._id
} else {
    canEdit = false
}


return (
    <form onSubmit={handleSubmit} encType='multipart/form-data'>
    <input 
        type="file" 
        accept=".png, .jpg, .jpeg"
        name="photo"
        onChange={handlePhoto}
    />

    <input 
        type="text"
        placeholder="name"
        name="name"
        value={newUser.name}
        onChange={handleChange}
    />


    <input 
        type="submit"
    />
</form>
)
