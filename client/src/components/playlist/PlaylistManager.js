import * as React from "react";
import styles from "./PlaylistManager.module.css";
import { contextMenu } from "react-contexify";

import logo from "../../assets/logo.svg";
import PlaylistContextMenu from "./PlaylistContextMenu";
import { usePlaylists } from "../../context/playlists-context";

function PlaylistManager({ handlePlay }) {
  const {
    state: { playlists },
    dispatch,
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

  const renderMovieList = (playlist) => {
    return (
      <div
        key={playlist.id}
        className={styles.playlistItem}
        onContextMenu={(e) => handleEvent(e, playlist.id)}
      >
        <div className={styles.playlistItemContent}>
          <div className={styles.playlistImageWrap}>
            <img
              className={styles.playlistImage}
              alt={`Poster for ${playlist.name}`}
              src={renderPlaylistImg(playlist)}
            />
          </div>
          <div className={styles.playlistInfo}>
            <div className={styles.playlistTitle}>{playlist.name}</div>
          </div>
        </div>
        <PlaylistContextMenu playlist={playlist} />
      </div>
    );
  };

  return (
    <div className={styles.playlistCollection}>
      {playlists.map(renderMovieList)}
    </div>
  );
}

export default PlaylistManager;
