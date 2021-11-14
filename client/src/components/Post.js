import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { QUERY_RHYTHMS, QUERY_POST } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

const Post = () => {

    const { postId } = useParams();

    const {loading: rhythmLoad, data: rhythmData}= useQuery(QUERY_RHYTHMS);
        
    const {loading: postLoad, data: postData}= useQuery(QUERY_POST, {
            variables: {postId: postId}
        });

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
<div class="py-12">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow-lg sm:rounded-lg">
            <div class="p-6 bg-white border-b border-gray-200">
                <h1 class="np-title mb-8 text-3xl font-bold">{canEdit ? "EDIT POST" : "NEW POST"}</h1>
                <form id='newPost-form'>
                    <div class="mb-4">
                        <label class="text-xl text-gray-600">Title<span class="text-red-500">*</span></label>
                        <input type="text" class="rounded-lg border-2 border-gray-300 p-2 w-full" name="title" id="title" value={canEdit ? postData.post.title : ""} required />
                    </div>
                    <div>
                        <label class="text-xl text-gray-600">Rhythm</label>
                        <select id='rhythm'class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" value={rhythmId} >
                
                                    {(rhythmData.rhythms.map((rhythm)=> {
                                        return (<option value={rhythm._id}>{rhythm.name}</option>)
                                    }))}
                        </select>
                    </div>
                    <div class="mb-4">
                        <label class="text-xl text-gray-600">Content<span class="text-red-500">*</span></label>
                        <textarea id='content' name="content" class="rounded-lg border-2 border-gray-500">
                                {postData ? postData.content : ""}
                        </textarea>
                    </div>
                    <div class="mb-8">
                        <label class="text-xl text-gray-600">URL</label>
                        <input type="text" class="rounded-lg border-2 border-gray-300 p-2 w-full" name="url" id="url" placeholder="(Optional)"/>
                    </div>
                    <div class="flex flex-row-reverse p-1">
                        <button type="submit" class="w-3/12 rounded-lg p-3 bg-black text-white hover:bg-yellow-500" required>Submit</button>
                    </div>
                </form>    
            </div>
        </div>
    </div>
</div>
)}

export default Post;