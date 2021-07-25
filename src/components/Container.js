import React, { useState, useEffect } from "react";
import Tracks from "./Tracks";
import LyricSearch from "./LyricSearch";
import { TracksContext } from "./Context";
import Spinner from "./Spinner";

function Container() {
  const [tracks, setTracks] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    async function getTrendingTracks() {
      const rep = await fetch(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=in&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`
      );
      const result = await rep.json();
      setTracks(result.message.body.track_list);
      setLoading(false);
    }

    getTrendingTracks();
  }, []);

  return (
    <>
      <TracksContext.Provider value={{ tracks, setTracks }}>
        <LyricSearch />
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <h3>Top 10 Tracks</h3> <Tracks />
          </>
        )}
      </TracksContext.Provider>
    </>
  );
}

export default Container;
