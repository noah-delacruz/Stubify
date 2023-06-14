import React from 'react'
import qrcode from '../images/qrcode.png'
import spotifylogo from '../images/spotifylogo.png'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

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
            <div key={track.id} className="boldText">
                &#9834;&nbsp;&nbsp;{track.name} by {track.artists[0].name}
            </div>
        ))
    }

    return (
        <div class="stub">
            <div className="stubContainer">
                {/* <br></br>
                <br></br>
                <h3 className="logoText">{props.profileInfo.display_name}</h3>
                <p className="minorText">PRESENTING</p>
                <h3 className="logoText">Stubify</h3>
                <p className="smallText">LENGTH: {calculateLength()}</p>
                <p className="minorText">FEATURING</p>
                {renderArtists()}
                <p className="smallText">COPYRIGHT: {props.profileInfo.display_name.toUpperCase()} {new Date().getFullYear()}</p>
                <p>{new Date().getMonth() + 1}/{new Date().getDate()}/{new Date().getFullYear()}</p> */}
                <Container maxWidth="sm">
                <br></br>
                <br></br>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {props.profileInfo.display_name}
                        </Grid>
                        <Grid item xs={12}>
                            PRESENTING
                        </Grid>
                        <Grid item xs={12}>
                            Stubify
                        </Grid>
                        <Grid item xs={12}>
                            LENGTH: {calculateLength()}
                        </Grid>
                        <Grid item xs={12}>
                            FEATURING
                        </Grid>
                        <Grid item xs={12}>
                            {renderArtists()}
                        </Grid>
                        <Grid item xs={12}>
                            COPYRIGHT: {props.profileInfo.display_name.toUpperCase()} {new Date().getFullYear()}
                        </Grid>
                        <Grid item xs={12}>
                            {new Date().getMonth() + 1}/{new Date().getDate()}/{new Date().getFullYear()}
                        </Grid>
                    </Grid>
                </Box>

                </Container>


                {/* <img src={spotifylogo} className="spotifyLogo" /> */}
            </div>
        </div>
    )
}