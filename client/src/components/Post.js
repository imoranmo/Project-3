import React, {useState} from 'react';
import { Redirect, Link } from 'react-router-dom';
import { QUERY_RHYTHMS, QUERY_POST } from '../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_POST, ADD_POST } from '../utils/mutations';
import { useParams } from 'react-router-dom';

import Auth from '../utils/auth';

const Post = () => {



    const { postId } = useParams();

    const {loading: rhythmLoad, data: rhythmData} = useQuery(QUERY_RHYTHMS);
    const {loading: postLoad, data: postData} = useQuery(QUERY_POST, {
            variables: {postId: postId}
        });

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
<div className="py-12">
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
                <h1 className="np-title mb-8 text-3xl font-bold">{canEdit ? "EDIT POST" : "NEW POST"}</h1>
                <form id='newPost-form' onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                        <label className="text-xl text-gray-600">Title<span className="text-red-500">*</span></label>
                        <input type="text" onLoad={handleChange} onChange={handleChange} className="rounded-lg border-2 border-gray-300 p-2 w-full" name="title" id="title" defaultValue={canEdit ? postData.post.title : ""} required />
                    </div>
                    <div>
                        <label className="text-xl text-gray-600">Rhythm</label>
                        <select id='rhythm' name="rhythm" onLoad={handleChange} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" defaultValue={rhythmId} >
                
                                    {(rhythmData.rhythms.map((rhythm, index)=> {
                                        return (<option key={index} value={rhythm._id}>{rhythm.name}</option>)
                                    }))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="text-xl text-gray-600">Content<span className="text-red-500">*</span></label>
                        <textarea id='content' defaultValue={postData ? postData.post.content : ""} onLoad={handleChange} onChange={handleChange} name="content" className="rounded-lg border-2 border-gray-500">
                                
                        </textarea>
                    </div>
                    <div className="mb-8">
                        <label className="text-xl text-gray-600">URL</label>
                        <input type="text" onLoad={handleChange} onChange={handleChange} className="rounded-lg border-2 border-gray-300 p-2 w-full" defaultValue={postData.post.url} name="url" id="url" placeholder="(Optional)"/>
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

export default Post;