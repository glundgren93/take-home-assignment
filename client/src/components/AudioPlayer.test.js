import { render, screen, act, fireEvent } from "@testing-library/react";
import AudioPlayer from "./AudioPlayer";

import { unmountComponentAtNode } from "react-dom";

let container = null;
let playStub, pauseStub;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);

  playStub = jest
    .spyOn(window.HTMLMediaElement.prototype, "play")
    .mockImplementation(() => {});

  pauseStub = jest
    .spyOn(window.HTMLMediaElement.prototype, "pause")
    .mockImplementation(() => {});
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;

  playStub.mockRestore();
  pauseStub.mockRestore();
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

test("plays track", () => {
  render(<AudioPlayer track={mockTrack} />);
  const trackTitle = screen.getByText(/Slum Village/i);
  const trackArtist = screen.getByText(/Tilden Parc/i);
  expect(trackTitle).toBeInTheDocument();
  expect(trackArtist).toBeInTheDocument();

  // trigger the code that you would expect to call the pause function
  expect(playStub).toHaveBeenCalled();
  expect(screen.getByTestId("play")).toBeInTheDocument();
});

test("pauses track on click", () => {
  render(<AudioPlayer track={mockTrack} />);

  fireEvent(
    screen.getByTestId("playback-button"),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );

  // TODO: find way to test if audio has paused
  //expect(pauseStub).toHaveBeenCalled();

  expect(screen.getByTestId("play")).toBeInTheDocument();
});
