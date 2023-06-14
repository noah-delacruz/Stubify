import React from 'react'
import qrcode from '../qrcode.png'
import spotifylogo from '../spotifylogo.png'

export default function Stub(props) {
    console.log("In stub component")
    console.log(props.topTracks)
    console.log(props.profileInfo)

    // Calculate total duration of tracks in minutes and seconds
    function calculateLength() {
        let length = 0
        for(let i = 0; i < 10; i++) {
            length += props.topTracks[i].duration_ms
        }
        const minutes = Math.floor(length / 60000); // 1 minute = 60,000 milliseconds
        const seconds = Math.floor((length % 60000) / 1000);

        const duration = minutes + " MINUTES AND " + seconds + " SECONDS"
        return duration
    }

    function renderArtists() {
        return props.topTracks.map(track => (
            <div key={track.id}>
                {track.name} by {track.artists[0].name}
            </div>
        ))
    }

    return (
        <div className="stub-container">
            <h1>-------------</h1>
            <h3>{props.profileInfo.display_name}</h3>
            <p>presenting</p>
            <h3>Stubify</h3>
            <p>LENGTH: {calculateLength()}</p>
            <p>featuring</p>
            {renderArtists()}
            <p>COPYRIGHT: {props.profileInfo.display_name.toUpperCase()} {new Date().getFullYear()}</p>
            <p>AUDITORIUM 2</p>
            <img src={qrcode} /><br></br>
            <p>{new Date().getMonth() + 1}/{new Date().getDate()}/{new Date().getFullYear()}</p>
            <img src={spotifylogo} />
            <h1>-------------</h1>
        </div>
    )
}