import * as React from "react";
import { useParams } from "react-router-dom";
import { PLAYLIST_CONTEXT } from "../../constants";

import { usePlaylists } from "../../context/playlists-context";
import TrackRow from "../tracks/TrackRow";

function Playlist({ handlePlay }) {
  let { playlistId } = useParams();
  const {
    state: { currentPlaylist },
    dispatch,
  } = usePlaylists();

  React.useEffect(() => {
    dispatch({ type: PLAYLIST_CONTEXT.GET_PLAYLIST_BY_ID, playlistId });
  }, [dispatch, playlistId]);

  return currentPlaylist && currentPlaylist?.tracks?.length > 0
    ? currentPlaylist.tracks?.map((track, ix) => (
        <TrackRow key={ix} track={track} handlePlay={handlePlay} />
      ))
    : "Empty";
}

export default Playlist;
