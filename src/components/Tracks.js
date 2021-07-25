import React, { useContext } from "react";
import Track from "./Track";
import { TracksContext } from "./Context";
function Tracks() {
  const { tracks, getLyrics } = useContext(TracksContext);
  const trending = tracks.map((track, i) => (
    <Track key={i} track={track.track} getLyrics={getLyrics} />
  ));
  return <div className="container track-container">{trending}</div>;
}

export default Tracks;
