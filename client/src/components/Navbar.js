import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../assets/logo.svg";

import { usePlaylists } from "../context/playlists-context";

const Navbar = () => {
  const { dispatch } = usePlaylists();

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
          <NavLink activeClassName={styles.active} to="/playlists">
            Playlists
          </NavLink>
        </li>
        <li
          className={styles.control}
          onClick={() => dispatch({ type: "create" })}
        >
          + Create Playlist
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
