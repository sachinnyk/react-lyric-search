import React, { useState, useContext } from "react";
import { TracksContext } from "./Context";
function LyricSearch() {
  const [trackTitle, setTrackTitle] = useState("");
  const { setTracks } = useContext(TracksContext);
  const onChange = (e) => {
    setTrackTitle(e.target.value);
  };

  const fetchResults = async () => {
    console.log("Fetching Results");
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`
    );
    const data = await response.json();
    console.log(data.message.body.track_list);
    setTracks(data.message.body.track_list);
  };
  return (
    <div className="card container-md">
      <div className="card-body">
        <h3 className="card-title">
          <i className="bi bi-music-note-beamed"></i> Search for a song
        </h3>
        <p className="card-text">Get the Lyrics for any track</p>
        <div className="d-flex flex-column align-items-center">
          <input
            type="text"
            className="form-control w-50"
            name="trackTitle"
            id="lyric-text"
            placeholder="Search"
            value={trackTitle}
            onChange={onChange}
          />
          <button className="btn btn-primary mt-2 w-25" onClick={fetchResults}>
            Find Lyrics
          </button>
        </div>
      </div>
    </div>
  );
}

export default LyricSearch;
