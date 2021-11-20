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
     <h1 className="text-2xl  text-gray-700 font-bold">My Profile</h1>    
     <div className="image overflow-hidden"><img className="h-auto w-full mx-auto rounded-full" src={'https://scontent.fsan1-1.fna.fbcdn.net/v/t1.6435-9/49808026_10218272793601425_7188438367623708672_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=xGNmh0ih8VsAX-hTR0_&tn=3MZesCyXywzSWgmY&_nc_ht=scontent.fsan1-1.fna&oh=37d4a05edceb585fc2c25d18c3f5810c&oe=61BCC02A'} alt="profilepic"/>{canEdit && (<a href="/profileEdit" title="Click to change profile picture" className="underline text-blue-400 float-right text-sm">Edit Profile</a>)}
     </div>
     <h3 className="text-gray-900 font-bold text-lg leading-8 my-1">Name: <span className="text-blue-600">{`${data.user.firstName} ${data.user.lastName}`}</span></h3>
     <h3 className="text-lg font-bold leading-6 mb-2">Username: <span className="text-blue-600 ">{data.user.userName}</span></h3>
     <p className="text-lg text-grey-500 leading-6 font-semibold">About me: </p><span className="font-small text-base">{data.user.bio}</span>
     <div class="items-center space-x-3 font-bold text-2xl leading-8 mt-4">
     <h3 className="text-lg">Instruments</h3>
   </div>

   <div class="flex items-center space-x-3 font-semibold text-gray-900 text-2xl leading-8 mb-4 underline">
     </div>
     {/* {data.user.instrument} */}
     {data.user.instruments ? (data.user.instruments.map((instrument) => {
           return (
               <div class="rounded-lg bg-yellow-500 text-center w-auto p-1 mb-2">{instrument.name}</div>
           )
     })) : (<div class="grid grid-cols-3 gap-1 mb-2"><div class="rounded-lg bg-yellow-500 text-center">Kazoo</div></div>)}
 
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
