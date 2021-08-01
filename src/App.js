import React, { useEffect, useState } from "react";
import Login from "./Components/Login";
import { getTokenFromResponse } from "./Components/Spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Components/Player";
import {StateProvider} from './Components/StateProvider'

const s = new SpotifyWebApi();

function App() {
  const [token, setToken] = useState(null)
  // const [{}, dispatch] = useStateValue();
  useEffect(() => {
    const hash = getTokenFromResponse(); //we get token by using this function and we store the token in hash
    // console.log(hash)
    window.location.hash = "";
    let _token = hash.access_token;

    if (_token) {
      setToken (_token)
      s.setAccessToken(_token);
      // s.getMe().then((user)=>{
      //   console.log(user)
      // }) //for testing
    }

  }, []);
  return (
    <div className="App">
      {
        token ?
          (<Player/>) :
          (<Login />)
      }


    </div>
  );

}
export default App;
