import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_USER, QUERY_ME } from '../utils/queries';
import InstrumentList from '../components/InstrumentList';
import Feed from '../components/Feed';


import Auth from '../utils/auth';

const Profile = () => {
  const { userName } = useParams();

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { userName },
  });

  // Enable Editting if userParam matches username
  let canEdit = false
  if (Auth.loggedIn() && Auth.getProfile().data.userName === userName) {
    console.log("You can edit this profile now")
    canEdit = true;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!Auth.loggedIn()) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div className="flex justify-center w-screen">

    <div className="bg-white p-6 mt-24 border-2 border-grey-500 rounded-lg shadow-xl w-1/4 h-3/4">
     <h1 className="text-2xl  text-gray-700 font-bold">{userName}'s Profile</h1>    
     <div className="image overflow-hidden">{canEdit && (<a href="/profileEdit" title="Click to change profile picture">Edit Profile</a>)}<img className="h-auto w-full mx-auto rounded-full" src={data.user.img} alt="profilepic"/>
     </div>
     <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{`${data.user.firstName} ${data.user.lastName}`}</h1>
     <h3 className="text-blue-600 font-lg text-semibold leading-6 mb-2">Username: <span className="text-black">{data.user.userName}</span></h3>
     <p className="text-lg text-grey-500 leading-6 font-semibold">About me: </p><span className="font-small text-base">{data.user.bio}</span>
     <div class="items-center space-x-3 font-bold text-2xl leading-8 mt-4">
     <h1>Instruments</h1>
   </div>

   <div class="flex items-center space-x-3 font-semibold text-gray-900 text-2xl leading-8 mb-4 underline">
     </div>
     {/* {data.user.instrument} */}
     {data.user.instruments.map((instrument) => {
           return (<div class="grid grid-cols-3 gap-1 mb-2">
               <div class="rounded-lg bg-yellow-500 text-center">{instrument.name}</div>
           </div>)
     })}
 
       </div>
       <div className="ml-20 w-2/4 mb-10 mt-24">
           <div className="p-3">
               <div className="flex items-center space-x-2 text-gray-900 leading-8">
                   <span className="tracking-wide text-xl font-semibold ml-10">Previous Posts</span>
               </div>
               <div className="text-gray-700 ">
           
           <Feed user={data.user._id}/>          
           
           </div>
       </div>
   </div>
 </div>





           
   

 
     


);
};


export default Profile;
