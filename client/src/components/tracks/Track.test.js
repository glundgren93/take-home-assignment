import { render, screen, act } from "@testing-library/react";
import TrackRow from "./TrackRow";

jest.mock("./TrackContextMenu", () => {
  return function DummyTrackContextMenu(props) {
    return <div data-testid="context-menu">Context menu</div>;
  };
});

const mockTrack = {
  id: "FKYVlOXV8Q",
  title: "Slum Village",
  length: 166,
  bpm: 148,
  genres: ["Mainstream Hip Hop"],
  moods: ["Dark", "Restless"],
  main_artists: ["Tilden Parc"],
  featured_artists: [],
  audio:
    "https://storage.googleapis.com/tech-coding-interview-assets/FKYVlOXV8Q.mp3",
  cover_art:
    "https://storage.googleapis.com/tech-coding-interview-assets/FKYVlOXV8Q.jpg",
  waveform:
    "https://storage.googleapis.com/tech-coding-interview-assets/FKYVlOXV8Q.json",
  spotify: "http://link.epidemicsound.com/FKYVlOXV8Q/spotify",
};

test("renders track", () => {
  render(<TrackRow track={mockTrack} />);
  const trackTitle = screen.getByText(/Slum Village/i);
  const trackArtist = screen.getByText(/Tilden Parc/i);
  expect(trackTitle).toBeInTheDocument();
  expect(trackArtist).toBeInTheDocument();
});

test("renders no track found when track doesn't exist", () => {
  render(<TrackRow />);
  const noTrack = screen.getByText(/No track found/i);
  expect(noTrack).toBeInTheDocument();
});

test("it plays track when button is clicked", () => {
  const handlePlay = jest.fn();
  render(<TrackRow track={mockTrack} handlePlay={handlePlay} />);

  const button = document.querySelector("[data-testid=play]");

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(handlePlay).toHaveBeenCalledTimes(1);
});

test("it opens context menu on right click", () => {
  render(<TrackRow track={mockTrack} />);

  const track = document.querySelector("[data-testid=track]");

  act(() => {
    track.dispatchEvent(new MouseEvent("contextmenu", { bubbles: true }));
  });

  const contextMenu = screen.getByTestId("context-menu");

  expect(contextMenu).toBeInTheDocument();
});
