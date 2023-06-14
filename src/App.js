import React from 'react'
import './App.css';
import axios from 'axios';

function App() {
    // Spotify params
    const CLIENT_ID = "6aabdc7c5a594ba5a860aba04969324d"
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const SCOPE = "user-top-read"

    // States
    const [token, setToken] = React.useState("")
    // const [searchKey, setSearchKey] = React.useState("")
    const [topTracks, setTopTracks] = React.useState([])

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
    async function searchTopTracks(e) {
        e.preventDefault()
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
        console.log(data.items)
        setTopTracks(data.items)
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
            <header className="App-header">
                <h1>Spotify React</h1>
                {
                    !token ? 
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Login to Spotify</a> :
                    <button onClick={logout}>Logout</button>
                }

                {
                    token ?
                        <form onSubmit={searchTopTracks}>
                            <button type={"submit"}>Top Tracks</button>
                        </form>
                    : <h2>Please login</h2>
                }
                {token && renderArtists()}
            </header>
        </div>
    );
}

export default App;
