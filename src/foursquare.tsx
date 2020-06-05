export const foursquare = require('react-foursquare')({
    clientID: process.env.REACT_APP_CLIENT_ID,
    clientSecret: process.env.REACT_APP_CLIENT_SECRET 
  });
  
  export const params = {
    "near": "Lagos, Nigeria",
    "limit": 10,
    "radius": 500
  };