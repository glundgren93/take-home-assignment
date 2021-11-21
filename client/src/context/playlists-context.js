import * as React from "react";

const initialState = {
  playlists: [],
};

const PlaylistsContext = React.createContext();

function playlistsReducer(state, action) {
  switch (action.type) {
    case "create": {
      return {
        playlists: [
          ...state.playlists,
          {
            id: Date.now(),
            name: `My playlist #${state.playlists.length + 1}`,
            tracks: [],
          },
        ],
      };
    }
    case "delete": {
      const filteredCollection = state.playlists.filter(
        (item) => item.id !== action.playlistId
      );
      return { playlists: filteredCollection };
    }
    case "addTrack": {
      const currentPlaylist = state.playlists.map((item) => {
        if (item.id === action.playlistId) {
          return { ...item, tracks: [...item.tracks, action.track] };
        }
        return item;
      });

      return { playlists: currentPlaylist };
    }

    case "removeTrack": {
      const currentPlaylist = state.playlists.map((item) => {
        if (item.id === action.playlistId) {
          return {
            ...item,
            tracks: item.tracks.filter((track) => track.id !== action.trackId),
          };
        }
        return item;
      });

      return { playlists: currentPlaylist };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function PlaylistsProvider({ children }) {
  const [state, dispatch] = React.useReducer(playlistsReducer, initialState);
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
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
