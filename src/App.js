import React, { useEffect, useState } from "react";
import Login from "./Components/Login";
import { getTokenFromResponse } from "./Components/Spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Components/Player";
import { useStateValue } from './Components/StateProvider'
//
const s = new SpotifyWebApi();

function App() {
  // const [token, setToken] = useState(null)
  const [{ user, token }, dispatch] = useStateValue();
  useEffect(() => {
    const hash = getTokenFromResponse(); //we get token by using this function and we store the token in hash
    // console.log(hash)
    window.location.hash = "";
    let _token = hash.access_token;

    if (_token) {
      // setToken (_token)
      s.setAccessToken(_token);
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });
      // s.getMe().then((user)=>{
      //   console.log(user)
      // }) //for testing
      s.getPlaylist("37i9dQZEVXcPN54Nek5Zij").then((response) =>
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        })
      );

      s.getMyTopArtists().then((response) =>
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        })
      );

      dispatch({
        type: "SET_SPOTIFY",
        spotify: s,
      });

      s.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user,
        });
      });

      s.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists,
        });
      });



    }

  }, [token, dispatch]);

  // console.log(user)
  // console.log(token)
  return (
    <div className="App">
      {
        token ?
          (<Player spotify={s} />) :
          (<Login />)
      }


    </div>
  );

}
export default App;
