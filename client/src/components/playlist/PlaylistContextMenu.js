import { Menu, Item } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

import { usePlaylists } from "../../context/playlists-context";

function PlaylistContextMenu({ playlist }) {
  const { dispatch } = usePlaylists();

  const handleEditPlaylist = () => {
    //TODO: Open modal with playlist details and allow user to edit them
  };

  const handleDeletePlaylist = ({ props }) => {
    //TODO: check if playlist has track

    dispatch({
      type: "delete",
      playlistId: playlist.id,
    });

    //TODO: give feedback
  };

  return (
    <div>
      <Menu id={playlist.id} animation="fade" theme="dark">
        <Item onClick={handleEditPlaylist}>Play</Item>
        <Item onClick={handleEditPlaylist}>Rename playlist</Item>
        <Item onClick={handleDeletePlaylist}>Delete playlist</Item>
      </Menu>
    </div>
  );
}

export default PlaylistContextMenu;