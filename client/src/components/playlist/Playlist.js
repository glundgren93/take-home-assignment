import * as React from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "material-design-icons/iconfont/material-icons.css";
import { usePlaylists } from "../../context/playlists-context";
import TrackRow from "../tracks/TrackRow";
import { PLAYLIST_CONTEXT } from "../../constants";
import styles from "./Playlist.module.css";

function Playlist({ handlePlay }) {
  let { playlistId } = useParams();
  const {
    state: { currentPlaylist },
    dispatch,
  } = usePlaylists();

  const handleDeleteTrack = (track) => {
    dispatch({
      type: PLAYLIST_CONTEXT.REMOVE_TRACK,
      playlistId: playlistId,
      trackId: track.id,
    });

    toast(`Track ${track.title} removed from ${currentPlaylist.name}`);
  };

  React.useEffect(() => {
    dispatch({ type: PLAYLIST_CONTEXT.GET_PLAYLIST_BY_ID, playlistId });
  }, [dispatch, playlistId]);

  return (
    <div className={styles.trackCollection}>
      {currentPlaylist ? (
        <h1 className={styles.playlistName}>{currentPlaylist.name}</h1>
      ) : (
        ""
      )}

      {currentPlaylist?.tracks?.length > 0
        ? currentPlaylist.tracks?.map((track, ix) => (
            <div key={ix} className={styles.trackItem}>
              <TrackRow track={track} handlePlay={handlePlay} />
              <i
                onClick={() => handleDeleteTrack(track)}
                className={`material-icons ${styles.trackDeleteItem}`}
              >
                {"delete"}
              </i>
            </div>
          ))
        : "Empty"}
    </div>
  );
}

export default Playlist;
