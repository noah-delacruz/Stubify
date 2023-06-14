import React from 'react'
import './App.css';
import axios from 'axios';
import Header from './components/Header';

function App() {
    // Spotify params
    const CLIENT_ID = "6aabdc7c5a594ba5a860aba04969324d"
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const SCOPE = "user-top-read user-read-private user-read-email"

    // States
    const [token, setToken] = React.useState("")
    // const [searchKey, setSearchKey] = React.useState("")
    const [topTracks, setTopTracks] = React.useState([])
    const [profileInfo, setProfileInfo] = React.useState({})

    // Get access token
    React.useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")
        
        if(!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }
        setToken(token)
    }, [])

    // Logout
    function logout() {
        setToken("")
        window.localStorage.removeItem("token")
    }

    // Get top tracks
    async function getInfo(e) {
        e.preventDefault()
        console.log("Getting info!")
        const {data} = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                // q: searchKey,
                // type: "artist",
                time_range: "medium_term",
                limit: 10
            }
        })
        console.log(data)
        setTopTracks(data.items)
        const info = await axios.get("https://api.spotify.com/v1/me/", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(info.data)
        setProfileInfo(info.data)
    }
    
    function renderArtists() {
        return topTracks.map(track => (
            <div key={track.id}>
                {track.name} by {track.artists[0].name}
            </div>
        ))
    }

    return (
        <div className="App">
            <Header />
            {
                !token ? 
                <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Login to Spotify</a> :
                <button onClick={logout}>Logout</button>
            }

            {
                token ?
                    <form onSubmit={getInfo}>
                        <button type={"submit"}>Top Tracks</button>
                    </form>
                : <h3>Please login</h3>
            }
            {token && renderArtists()}
        </div>
    );
}

export default App;
