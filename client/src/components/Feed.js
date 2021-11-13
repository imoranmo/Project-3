import React from 'react';
import { QUERY_POSTS } from '../utils/queries';

const Feed = () => {
    
    
    
    return (

<div className="mt-6"> 
    <div className="max-w-4xl px-10 py-6 mx-auto bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between"><span className="font-light text-gray-600">11/10/2021 by: Luke Cole</span>
        </div>
        <div className="mt-2"><a href="/" className="text-2xl font-bold text-gray-700 hover:underline">Test Post</a>
            <div className="text-blue-700">#Rhythm</div>
            <div>Post Content</div>
            <div><a className="text-blue-700 underline" target="_blank" href="{{{post.url}}}">URL in post</a></div>
        </div>
        <div className="flex items-center justify-between mt-4">
            <button id="toggle-comments" value="{{post.id}}" className="text-blue-500 hover:underline">Show Comments</button>
            <div className="hidden" id="comments">
                <h1>Comments:</h1>
            </div>
        </div>
        <div className="mb-4 rounded-full">
            <input type="text" name="" data-value="{{post.id}}" id="comment" placeholder="Add a comment!" className="mt-4 w-full px-4 py-3 rounded-full bg-gray-200 mt-2 border focus:border-black focus:bg-white focus:outline-none " autoFocus autoComplete='true' required />
        </div>
    </div>
</div>
)};
export default Feed;