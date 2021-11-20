import { Menu, Item, Submenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import { usePlaylists } from "../context/playlists-context";

function TrackContextMenu({ track }) {
  const {
    state: { playlists },
    dispatch,
  } = usePlaylists();
  const handleyCreatePlaylist = () => {
    dispatch({
      type: "create",
    });

    //TODO: give feedback
  };

  const handleAddToPlaylist = ({ props }) => {
    //TODO: check if playlist has track

    dispatch({
      type: "addTrack",
      track: props.track,
      playlistId: props.playlist.id,
    });

    //TODO: give feedback
  };

  return (
    <div>
      <Menu id={track.id} animation="fade" theme="dark">
        <Item onClick={handleyCreatePlaylist}>Create Playlist</Item>
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
