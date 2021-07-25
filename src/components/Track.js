import React from "react";
import { Link } from "react-router-dom";
function Track({ track, getLyrics }) {
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">{track.track_name}</h4>
        <h6 className="card-subtitle mb-2 text-muted">{track.artist_name}</h6>

        <Link to={`lyrics/track/${track.track_id}`} className="btn btn-dark w-50">
          <i className="bi bi-file-music"></i>View Lyrics
        </Link>
      </div>
    </div>
  );
}

export default Track;
