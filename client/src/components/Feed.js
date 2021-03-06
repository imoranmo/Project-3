import React, {useEffect, useState} from 'react';
import { QUERY_POSTS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import InstrumentList from './InstrumentList'
import RhythmList from './RhythmList'
import Comment from "./Comment"

import Auth from '../utils/auth';

const Feed = (props) => {

    const {user} = props
 
    const [rhythms, setRhythms] = useState(window.localStorage.getItem('rhythmFilters') || [])
    const [instruments, setInstruments] = useState(JSON.parse(window.localStorage.getItem('instrumentFilters')) || [])
    const [posts, setPosts] = useState([])
    const [filteredPosts, setfilteredPosts] = useState([])

    const instrumentFilterHandle = (event) => {
        setInstruments(event)
    }
    const rhythmFilterHandle = (event) => {
        setRhythms(event)
    }

    const { loading, data } = useQuery(QUERY_POSTS, {variables: {user}});

    useEffect(()=> {
       setPosts(data?.posts)
       setfilteredPosts(data?.posts)
    },[data])


    useEffect(()=>{
        console.log(instruments)
        console.log(rhythms)

        const newPosts = posts.filter((post) => {
            let inst = false
            for ( let i=0; i < rhythms.length; i++){
                console.log(rhythms[i].value)
                if (rhythms[i].value === post.rhythm._id){
                    inst =  true;
                }
            }
            let rhyth = false
            for ( let j=0; j < instruments.length; j++){
                for (let k=0; k < post.user.instruments.length; k++){
                
                if (instruments[j].value === post.user.instruments[k]._id){
                    rhyth = true;
                }
            }
        }
            return inst && rhyth
        })

        console.log(newPosts)
        setfilteredPosts(newPosts)


    },[instruments, rhythms])

    const showAllPosts = () => {
        setfilteredPosts(posts)
    }

    if (loading) {
        return <div>Loading...</div>
    }


    return (

<div className="max-w-3xl px-10 mx-auto mb-4"> 
        <>
            <div className="flex space-x-2 my-4">
               
                <RhythmList filterList={rhythms} filterHandle={rhythmFilterHandle}/>
                <InstrumentList filterList={instruments} filterHandle={instrumentFilterHandle}/>
                <button onClick={showAllPosts}>Show All</button>
            </div>
            {filteredPosts.map((post) => {
        
                return (<><div  className="max-w-4xl px-10 py-6 mx-auto bg-white rounded-lg shadow-md mb-4">

                            <div className="flex items-center justify-between"><span className="font-light text-gray-600">{post.dateCreated} by:&nbsp;&nbsp;<a className="underline text-blue-400 float-right" href={`/profile/${post.user.userName}`}>{post.user.userName}</a></span>
                            {post.user._id === Auth.getProfile().data._id ? (<a href={`/Post/${post._id}`} className="text-sm text-blue-500 underline">edit</a>) : ""}
                            </div>
                            <div className="mt-2"><div className="text-2xl font-bold text-gray-700 hover:underline">{post.title}</div>
                                <div className="text-blue-700">#{post.rhythm.name}</div>
                                <div dangerouslySetInnerHTML={{__html: post.content}}></div>
                                <div><a className="text-blue-700 underline" target="_blank" rel="noreferrer" href={post.url}>{post.url}</a></div>
                            </div>
                            <Comment data={post.comments} postId={post._id}/>
                        </div></>)
            })}
        </>
    
     
</div>
)};
export default Feed;