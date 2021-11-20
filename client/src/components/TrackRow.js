import React from "react";
import styles from "./TrackRow.module.css";
import { contextMenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

import TrackContextMenu from "./TrackContextMenu";

function TrackRow({ track, handlePlay }) {
  const handleEvent = (event) => {
    event.preventDefault();

    contextMenu.show({
      id: track.id,
      event: event,
      props: {
        x: 1000,
        y: 1000,
        target: null,
      },
    });
  };

  return (
    <div className={styles.trackRow} onContextMenu={(e) => handleEvent(e)}>
      <button className={styles.trackPlay} onClick={() => handlePlay(track)}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 12L8 5V19L20 12Z" fill="white" />
        </svg>
      </button>
      <img
        src={track.cover_art}
        alt={track.Ttile}
        className={styles.trackCoverArt}
      ></img>
      <div className={styles.trackInfo}>
        <div className={styles.trackTitle}>{track.title}</div>
        <div className={styles.trackArtist}>
          {track.main_artists.join(", ")}
        </div>
      </div>
      <TrackContextMenu track={track} />
    </div>
  );
}

export default TrackRow;
