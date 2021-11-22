import { Menu, Item, Submenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

import { PLAYLIST_CONTEXT } from "../../constants";
import { usePlaylists } from "../../context/playlists-context";

function TrackContextMenu({ track }) {
  const {
    state: { playlists },
    dispatch,
  } = usePlaylists();

  //TODO: create single method for playlist creation to be used everywhere
  const handleCreatePlaylist = () => {
    dispatch({
      type: PLAYLIST_CONTEXT.CREATE_PLAYLIST,
    });
  };

  const handleAddToPlaylist = ({ props }) => {
    //TODO: check if playlist has track

    dispatch({
      type: PLAYLIST_CONTEXT.ADD_TRACK,
      track: props.track,
      playlist: props.playlist,
    });
  };

  return (
    <div>
      <Menu id={track.id} animation="fade" theme="dark">
        <Item onClick={handleCreatePlaylist}>Create playlist</Item>
        <Submenu disabled={playlists.length === 0} label="Add to playlist">
          {playlists.map((playlist, ix) => (
            <Item
              key={ix}
              onClick={handleAddToPlaylist}
              data={{ track, playlist }}
            >
              {playlist.name}
            </Item>
          ))}
        </Submenu>
      </Menu>
    </div>
  );
}

export default TrackContextMenu;
