import { toast } from "react-toastify";

import { Menu, Item } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import { PLAYLIST_CONTEXT } from "../../constants";

import { usePlaylists } from "../../context/playlists-context";

function PlaylistContextMenu({ handlePlay, playlist }) {
  const { dispatch } = usePlaylists();

  const handleEditPlaylist = () => {
    toast(
      ` //TODO: Open modal with playlist details and allow user to edit them`
    );
  };

  const handleDeletePlaylist = () => {
    //TODO: check if playlist has track

    dispatch({
      type: PLAYLIST_CONTEXT.DELETE_PLAYLIST,
      playlist,
    });
    toast(`Playlist ${playlist.name} was deleted`);
  };

  return (
    <div>
      <Menu id={playlist.id} animation="fade" theme="dark">
        <Item onClick={handleEditPlaylist}>Rename playlist</Item>
        <Item onClick={handleDeletePlaylist}>Delete playlist</Item>
      </Menu>
    </div>
  );
}

export default PlaylistContextMenu;
