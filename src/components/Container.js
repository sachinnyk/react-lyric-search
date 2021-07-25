import React, { useState, useEffect } from "react";
import Tracks from "./Tracks";
import LyricSearch from "./LyricSearch";
import { TracksContext } from "./Context";
import Spinner from "./Spinner";

function Container(props) {
  const [tracks, setTracks] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    async function getTrendingTracks() {
      const rep = await fetch(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=in&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`
      ).catch((e) => console.log(e));
      const result = await rep.json().catch((e) => console.log(e));
      setTracks(result.message.body.track_list);
      setLoading(false);
      props.history.push({
        pathname: "/",
        state: { track: result.message.body.track_list },
      });
    }
    console.log(props.location.state?.track);
    if (props.location.state?.track !== undefined) {
      setTracks(props.location.state.track);
      setLoading(false);
    } else {
      getTrendingTracks();
    }
  }, []);

  return (
    <>
      <TracksContext.Provider value={{ tracks, setTracks }}>
        <LyricSearch />
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <h3 className="mt-4 mb-4">Top 10 Tracks</h3> <Tracks />
          </>
        )}
      </TracksContext.Provider>
    </>
  );
}

export default Container;
