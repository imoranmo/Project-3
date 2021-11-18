import React from 'react';
import { QUERY_POSTS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import InstrumentList from './InstrumentList'
import RhythmList from './RhythmList'
import Comment from "./Comment"

import Auth from '../utils/auth';

const Feed = (props) => {

    const {user} = props
    const { loading, data } = useQuery(QUERY_POSTS, {variables: {user: user}});

    
    const handleFilter = () => {
        return console.log("Clicked")
      }
    
      
    
    return (

<div className="mt-6"> 
    {loading ? (
            <div>Loading...</div>
          ) : (
        <>
            <div className="hidden md:flex px-2 mx-auto font-semibold font-heading space-x-16 xl:px-10">
                <InstrumentList/>
                <RhythmList/>
                <button id="search" onClick={handleFilter} className="w-1/6 h-1/6"><img alt="filter" src="filter-filled-tool-symbol.png" title="filter" className="w-8 h-8"></img></button>
            </div>
            {data.posts.map((post) => {
        
                return (<><div  className="max-w-4xl px-10 py-6 mx-auto bg-white rounded-lg shadow-md">

                            <div className="flex items-center justify-between"><span className="font-light text-gray-600">{post.dateCreated} by: {post.user.userName}</span>
                            {post.user._id === Auth.getProfile().data._id ? (<a href={`/Post/${post._id}`} className="text-sm text-blue-500 underline">edit</a>) : ""}
                            </div>
                            <div className="mt-2"><a href="/" className="text-2xl font-bold text-gray-700 hover:underline">{post.title}</a>
                                <div className="text-blue-700">#{post.rhythm.name}</div>
                                <div>{post.content}</div>
                                <div><a className="text-blue-700 underline" target="_blank" href="{{{post.url}}}">{post.url}</a></div>
                            </div>
                            <Comment data={post.comments} postId={post._id}/>
                        </div></>)
            })}
        </>
    )}
     
</div>
)};
export default Feed;