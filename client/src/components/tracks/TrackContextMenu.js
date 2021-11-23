import { toast } from "react-toastify";
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

    toast(`Playlist created.`);
  };

  const handleAddToPlaylist = ({ props }) => {
    let feedbackMsg;
    // only add unique tracks
    if (!props.playlist.tracks.includes(props.track)) {
      dispatch({
        type: PLAYLIST_CONTEXT.ADD_TRACK,
        track: props.track,
        playlist: props.playlist,
      });

      feedbackMsg = `Track ${props.track.title} added to ${props.playlist.name}.`;
    } else {
      feedbackMsg = `${props.track.title} is already on ${props.playlist.name}`;
    }

    toast(feedbackMsg);
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
