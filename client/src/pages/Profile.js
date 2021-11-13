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
  <div className="container mx-auto p-5 grid grid-row-2 ml-12">
      <div className="md:flex no-wrap md:-mx-2 ">
          <div className="w-full md:w-3/12 md:mx-2">
              <div className="bg-white p-3">
                  <h1 className="text-2xl text-gray-700 font-bold">{userName}'s Profile</h1>
              </div>
              <div className="bg-white p-3 border-t-4 border-yellow-500 rounded-lg shadow-lg">
                  <div className="image overflow-hidden">
                  {canEdit && (<a href="#" title="Click to change profile picture">Edit Picture</a>)}
                      <img className="h-auto w-full mx-auto rounded-full"
                          src={data.user.img}
                          alt="profilepic"/>
                  </div>
                  <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{`${data.user.firstName} ${data.user.lastName}`}</h1>
                  <h3 className="text-blue-600 font-lg text-semibold leading-6 mb-2">Username: <span className="text-black">{data.user.userName}</span></h3>
                  <p className="text-lg text-grey-500 leading-6 font-semibold">About me: {canEdit && (<a href="/editPost" className="text-sm text-blue-500 underline">edit</a>)} </p><span className="font-small text-base">{data.user.bio}</span>
              </div>
              <div className="my-4 "></div>
              <div class="flex items-center space-x-3 font-bold text-gray-700 text-2xl leading-8 mb-4">
        <span>Instruments</span>
    </div>
    <div class="bg-white p-1 rounded-lg shadow-lg">
        <div class="flex items-center space-x-3 font-semibold text-gray-900 text-2xl leading-8 mb-4 underline">
        </div>
        {/* {data.user.instrument} */}
        {data.user.instruments.map((instrument) => {
              return (<div class="grid grid-cols-3 gap-1 mb-2">
                  <div class="rounded-lg bg-yellow-500 text-center">{instrument.name}</div>
              </div>)
        })}
    </div>
          </div>
          <div className="w-full md:w-9/12 mx-2 my-16 h-64 shadow-lg mb-2">
              <div className="bg-white p-3 shadow-lg rounded-lg ">
                  <div className="flex items-center space-x-2 text-gray-900 leading-8">
                      <span className="tracking-wide text-xl font-semibold">Previous Posts</span>
                  </div>
                  <div className="text-gray-700">
              <div className="my-4"></div>
              <Feed user={data.user.userName}/>          
              </div>
          </div>
      </div>
    </div>
  </div>
  );
};

export default Profile;
