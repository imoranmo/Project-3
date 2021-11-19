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

    if (loading) {
        return <div>Loading...</div>
    }


    return (

<div className="mt-6"> 
        <>
            <div className="hidden md:flex px-2 mx-auto font-semibold font-heading space-x-16 xl:px-10">
                <RhythmList filterList={rhythms} filterHandle={rhythmFilterHandle}/>
                <InstrumentList filterList={instruments} filterHandle={instrumentFilterHandle}/>
            </div>
            {filteredPosts.map((post) => {
        
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
    
     
</div>
)};
export default Feed;