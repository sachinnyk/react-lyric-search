import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
function Lyrics(props) {
  const [lyricBody, setLyricBody] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [track, setTrack] = useState([]);
  useEffect(() => {
    const getLyrics = async function (track_id) {
      const response = await fetch(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${track_id}&apikey=${process.env.REACT_APP_MM_KEY}`
      );
      const data = await response.json();

      setLyricBody(data.message.body.lyrics?.lyrics_body);
    };

    const getTrackDetails = async function (track_id) {
      const response = await fetch(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${track_id}&apikey=${process.env.REACT_APP_MM_KEY}`
      );
      const data = await response.json();
      setTrack(data.message.body.track);
      console.log(data.message);
      setLoading(false);
    };
    getLyrics(props.match.params.id);
    getTrackDetails(props.match.params.id);
    console.log(props.match.params.id);
  }, [props.match.params.id]);

  if (isLoading) return <Spinner />;
  else
    return (
      <div className="container">
        <h1>Lyrics</h1>
        <Link to="/" className="btn btn-dark btn-sm mb-2 align-left">
          Back
        </Link>
        <div className="card ">
          <h5 className="card-header">
            {track.track_name} By {track.artist_name}
          </h5>
          <div className="card-body">
            <div className="card-text">{lyricBody}</div>
          </div>
        </div>
      </div>
    );
}

export default Lyrics;
