import * as React from "react";
import styles from "./PlaylistManager.module.css";
import { contextMenu } from "react-contexify";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.svg";
import PlaylistContextMenu from "./PlaylistContextMenu";
import { usePlaylists } from "../../context/playlists-context";

function PlaylistManager({ handlePlay }) {
  const {
    state: { playlists },
  } = usePlaylists();

  const handleEvent = (event, playlistId) => {
    event.preventDefault();

    contextMenu.show({
      id: playlistId,
      event: event,
    });
  };

  const renderPlaylistImg = (playlist) => {
    return playlist.tracks[0]?.cover_art || logo;
  };

  const renderPlaylists = (playlist) => {
    return (
      <div key={playlist.id} className={styles.playlistItem}>
        <Link to={`/playlists/${playlist.id}`}>
          <div onContextMenu={(e) => handleEvent(e, playlist.id)}>
            <div className={styles.playlistItemContent}>
              <div className={styles.playlistImageWrap}>
                <img
                  className={styles.playlistImage}
                  alt={`Poster for ${playlist.name}`}
                  src={renderPlaylistImg(playlist)}
                />
              </div>
              <div className={styles.playlistInfo}>
                <div>
                  <button
                    className={styles.trackPlay}
                    onClick={() => handlePlay(playlist.tracks[0])}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M20 12L8 5V19L20 12Z" fill="white" />
                    </svg>
                  </button>{" "}
                </div>

                <div className={styles.playlistTitle}>{playlist.name}</div>
              </div>
            </div>
          </div>
        </Link>
        <PlaylistContextMenu playlist={playlist} handlePlay={handlePlay} />
      </div>
    );
  };

  return (
    <div className={styles.playlistCollection}>
      {playlists.length > 0
        ? playlists.map(renderPlaylists)
        : "Your collection is empty"}
    </div>
  );
}

export default PlaylistManager;
