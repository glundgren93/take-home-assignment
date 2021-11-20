import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styles from "./App.module.css";

import TrackRow from "./components/TrackRow";
import Navbar from "./components/Navbar";
import AudioPlayer from "./components/AudioPlayer";
import PlaylistManager from "./components/PlaylistManager";
import { PlaylistsProvider } from "./context/playlists-context";

function App() {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState();

  useEffect(() => {
    fetch("http://localhost:8000/tracks")
      .then((res) => res.json())
      .then((data) => setTracks(data));
  }, []);

  const handlePlay = (track) => setCurrentTrack(track);

  return (
    <Router>
      <PlaylistsProvider>
        <main className={styles.app}>
          <Route component={Navbar} />
          <Switch>
            <Route exact path="/">
              {tracks.map((track, ix) => (
                <TrackRow key={ix} track={track} handlePlay={handlePlay} />
              ))}
            </Route>
            <Route path="/playlists">
              <PlaylistManager handlePlay={handlePlay} />
            </Route>
          </Switch>
        </main>
        {currentTrack && <AudioPlayer track={currentTrack} />}
      </PlaylistsProvider>
    </Router>
  );
}

export default App;
