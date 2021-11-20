import React from 'react';
import { QUERY_RHYTHMS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const slideImages = [
  'guitar-center.png',
  'man-in-pain.jpg',
  'rolling-stones.png',
  'nationwide-pets.png'
];
const Slideshow = () => {
  const { loading, data } = useQuery(QUERY_RHYTHMS);
  return (
    
            
    <div className="py-28">
      
        <h1 className="mb-6 text-2xl font-bold text-gray-500 ">Sponsored</h1>
        
        
        <div className="flex flex-col max-w-sm px-4 h-52 py-6 mx-auto bg-white rounded-lg shadow-md h-auto w-18">

          <Slide easing="ease">
            <div className="each-slide">
            
              <div className="" style={{'backgroundImage': `url(${slideImages[0]})`}}>
              <span><link src="https://www.guitarcenter.com/"></link></span>
              </div>
              <p className="text-center mt-1">Early Black Friday deals! Get up to 30% off now!</p>
            </div>
                
            <div className="each-slide">
              <div style={{'backgroundImage': `url(${slideImages[1]})`}}>
                <span><link src="https://hemovel.com/"></link></span>
                
              </div>
              <p className="text-center mt-1">Need hemorrhoids relief quick? Click for more info...</p>
            </div>
        
            <div className="each-slide">
              <div style={{'backgroundImage': `url(${slideImages[2]})`}}>
              </div>
              <p className="text-center mt-1">Free subscription to Rolling Stones magazine!</p>
            </div>

            <div className="each-slide">
              <div style={{'backgroundImage': `url(${slideImages[3]})`}}>
                
              </div>
              <p className="text-center mt-1">Need insurance for your furry friend? Click here!</p>
            </div>

          </Slide>
    
        </div>

      </div>   
     
          )};
   
    
  


export default Slideshow;