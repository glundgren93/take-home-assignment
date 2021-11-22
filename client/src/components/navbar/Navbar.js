import React from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import styles from "./Navbar.module.css";
import "material-design-icons/iconfont/material-icons.css";

import logo from "../../assets/logo.svg";
import { PLAYLIST_CONTEXT } from "../../constants";

import { usePlaylists } from "../../context/playlists-context";

const Navbar = () => {
  const { dispatch } = usePlaylists();

  const handleCreatePlaylist = () => {
    dispatch({ type: PLAYLIST_CONTEXT.CREATE_PLAYLIST });
    toast(`Playlist created.`);
  };

  return (
    <nav>
      <img src={logo} className={styles.logo} alt="Logo" />
      <ul className={styles.menu}>
        <li>
          <NavLink activeClassName={styles.active} to="/" exact={true}>
            Tracks
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName={styles.active} to="/playlists/">
            Playlists
          </NavLink>
        </li>
        <li className={styles.control} onClick={handleCreatePlaylist}>
          <i className={`material-icons ${styles.createPlaylistIcon}`}>
            {"add"}
          </i>
          Create Playlist
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
