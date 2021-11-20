import * as React from "react";
import styles from "./PlaylistManager.module.css";
import { usePlaylists } from "../context/playlists-context";

import TrackRow from "./TrackRow";

function PlaylistManager({ handlePlay }) {
  const {
    state: { playlists },
    dispatch,
  } = usePlaylists();
  return (
    <div>
      {playlists.map((playlist, ix) => {
        return (
          <div key={ix} className={styles.playlistRow}>
            <div className={styles.trackInfo}>
              <div className={styles.playlistTitle}>{playlist.name}</div>
            </div>
            <button
              onClick={() => dispatch({ type: "delete", id: playlist.id })}
            >
              Delete Playlist
            </button>

            {playlist.tracks.map((track) => (
              <TrackRow key={ix} track={track} handlePlay={handlePlay} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default PlaylistManager;
