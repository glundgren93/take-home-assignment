import * as React from "react";
import { PLAYLIST_CONTEXT } from "../constants";

const initialState = {
  playlists: [],
  currentPlaylist: {},
};

const PlaylistsContext = React.createContext();

function playlistsReducer(state, action) {
  switch (action.type) {
    case PLAYLIST_CONTEXT.GET_PLAYLIST_BY_ID: {
      const filteredPlaylist = state.playlists.find(
        (item) => item.id.toString() === action.playlistId
      );
      return { playlists: state.playlists, currentPlaylist: filteredPlaylist };
    }
    case PLAYLIST_CONTEXT.CREATE_PLAYLIST: {
      const createdPlaylist = {
        id: Date.now(),
        name: `My playlist #${state.playlists.length + 1}`,
        tracks: [],
      };

      return {
        playlists: [...state.playlists, createdPlaylist],
        currentPlaylist: createdPlaylist,
      };
    }
    case PLAYLIST_CONTEXT.DELETE_PLAYLIST: {
      const filteredPlaylist = state.playlists.filter(
        (item) => item.id !== action.playlistId
      );
      return {
        playlists: filteredPlaylist,
        currentPlaylist: state.currentPlaylist,
      };
    }
    case PLAYLIST_CONTEXT.ADD_TRACK: {
      const playlists = state.playlists.map((item) => {
        if (item.id === action.playlistId) {
          return { ...item, tracks: [...item.tracks, action.track] };
        }
        return item;
      });

      return { playlists, currentPlaylist: state.currentPlaylist };
    }

    case PLAYLIST_CONTEXT.REMOVE_TRACK: {
      const playlists = state.playlists.map((item) => {
        if (item.id === action.playlistId) {
          return {
            ...item,
            tracks: item.tracks.filter((track) => track.id !== action.trackId),
          };
        }
        return item;
      });

      return { playlists, currentPlaylist: state.currentPlaylist };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function PlaylistsProvider({ children }) {
  const [state, dispatch] = React.useReducer(playlistsReducer, initialState);

  const value = { state, dispatch };
  return (
    <PlaylistsContext.Provider value={value}>
      {children}
    </PlaylistsContext.Provider>
  );
}

function usePlaylists() {
  const context = React.useContext(PlaylistsContext);
  if (context === undefined) {
    throw new Error("usePlaylists must be used within a PlaylistsProvider");
  }
  return context;
}

export { PlaylistsProvider, usePlaylists };
