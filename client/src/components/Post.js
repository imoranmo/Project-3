import React, {useState, useEffect} from 'react';
import { Redirect, Link } from 'react-router-dom';
import { QUERY_RHYTHMS, QUERY_POST } from '../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_POST, ADD_POST } from '../utils/mutations';
import { useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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

    useEffect(()=>{
        if (postData && postData.post._id){
            const rhythm =postData.post.rhythm._id
            setFormState({...postData.post, rhythm})
            console.log(postData)
        } else if(rhythmData){
            const firstRhythm = rhythmData.rhythms[0]._id
            setFormState({...formState,rhythm: firstRhythm})
        }
        
    },[postData, rhythmData])
    
    if (!Auth.loggedIn()) {
        return <Redirect to="/login" />;
      }
      

    const handleTextChange = (event, editor) => {
            const data = editor.getData();
            const name = "content"

        setFormState({
            ...formState, [name]: data
        });
        console.log(formState)
    };
    const handleChange = (event) => {
        const { name, value} = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
        };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        let userName;

        try {
            if(postData.post._id){
                userName = postData.post.user.userName
                console.log(userName)
                 await updatePost({
                    variables: { ...formState, user:postData.post.user._id, _id:postData.post._id  },
                    });
                    console.log("UpdatePost")
                    return window.location= "/profile/" + userName ;
            } else {
                 await addPost({
                    variables: { ...formState },
                    });
                    console.log("AddPost")
                    return window.location = "/"
            }

            
            
        } catch (e) {
            console.error(e);
        }
        };


let canEdit
   if (postLoad || rhythmLoad) {
    return <div>Loading...</div>;
  }

  if (postData.post._id){
        canEdit = true;
   } else {
        canEdit = false
   }


return (
<div className="py-24">
    <div className="max-w-5xl mx-auto sm:px-6 lg:px-8 ">
        <div className="bg-white border-2 overflow-hidden shadow-lg sm:rounded-lg">
            <div className="p-6 bg-white">
                <h1 className="np-title mb-8 text-3xl font-bold">{canEdit ? "EDIT POST" : "NEW POST"}</h1>
                <form id='newPost-form' onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                        <label className="text-xl text-gray-600">Title<span className="text-red-500">*</span></label>
                        <input type="text" onChange={handleChange} className="rounded-lg border-2 border-gray-300 p-2 w-full" name="title" id="title" defaultValue={canEdit ? postData.post.title : ""} required />
                    </div>
                    <div>
                        <label className="text-xl text-gray-600">Rhythm</label>
                        <select id='rhythm' name="rhythm" onChange={handleChange} className="w-full py-4 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" defaultValue={canEdit ? postData.post.rhythm._id : ""} >
                
                                    {(rhythmData.rhythms.map((rhythm, index)=> {
                                        return (<option key={index} value={rhythm._id}>{rhythm.name}</option>)
                                    }))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="text-xl text-gray-600">Content<span className="text-red-500">*</span></label>
                        <div>

                        <CKEditor
                            editor={ ClassicEditor }
                            data={postData ? postData.post.content : ""}
                            toolbar={'bold'}
                            onReady={ editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log( 'Editor is ready to use!', editor );
                            } }
                            onChange={ handleTextChange }
                        />
{/*                         
                        <textarea defaultValue={postData ? postData.post.content : ""} onChange={handleChange}  id='content' name="content" className="rounded-lg border-2 border-gray-500">
                                
                        </textarea> */}
                        </div>
                    </div>
                    <div className="mb-8">
                        <label className="text-xl text-gray-600">URL</label>
                        <input type="text" onChange={handleChange} className="rounded-lg border-2 border-gray-300 p-2 w-full" defaultValue={postData.post.url} name="url" id="url" placeholder="(Optional)"/>
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