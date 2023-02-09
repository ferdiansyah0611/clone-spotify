import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  HomeIcon,
  SearchIcon,
  CollectionIcon,
  PlusIcon,
  HeartIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  MenuIcon,
  RewindIcon,
  FastForwardIcon,
  PlayIcon,
  PauseIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/24/solid";

import Navbar from "./component/Navbar";
import Sidebar from "./component/Sidebar";
import Player from "./component/Player";
import spotify from "./service/spotify";
import useApp from "./store/useApp";

import Home from "./pages/Home";
import BrowseCategory from "./pages/BrowseCategory";
import BrowseAlbums from "./pages/BrowseAlbums";
import Playlist from "./pages/Playlist";
import Artist from "./pages/Artist";
import Search from "./pages/Search";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

import "./App.css";

function millisToMinutesAndSeconds(millis) {
  let minutes = Math.floor(millis / 60000);
  let seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function App() {
  const container = useRef();
  const music = useRef();
  const app = useApp();
  useEffect(() => {
    async function main() {
      document.title = "Spotify";
      document.body.classList.add("overflow-auto");
      document.body.classList.remove("overflow-hidden");
      document.body.addEventListener("contextmenu", (e) => e.preventDefault());
      container.current.style.marginLeft = 240;
    }
    if (container.current) {
      main();
    }
  }, [container.current]);
  const playHandlers = useCallback(async (data) => {
    // console.log(data);
    let albums = {
        items: [],
      },
      active = data, album;
    if (music.audio) {
      music.audio.pause();
      music.audio.remove();
    }
    if (!data.preview_url) {
      if (data.type === 'album') {
        albums = await spotify.getAlbumTrack(data.id);
        album = await spotify.getAlbum(data.id)
        if (albums.items.length) {
          active = albums.items[0];
          active.album = album
        }
      }
      if (data.type === 'playlist') {
        albums = await spotify.getPlaylistItem(data.id);
        albums.items = albums.items.map((value) => value.track)
        if (albums.items.length) {
          active = albums.items.filter(v => v.preview_url)[0];
        }
      }
    }
    // console.log(active);
    let audio = await new Audio(active.preview_url);
    audio.load();
    audio.addEventListener("play", (e) => {
      document.title = active.name;
      app.updateTimerEnd(millisToMinutesAndSeconds(active.duration_ms));
      if (albums.items.length) {
        app.updateMusicAlbums({ active, albums, isPlaying: true });
      } else {
        app.updateMusic({ active, isPlaying: true });
      }
    });
    audio.addEventListener("ended", (e) => {
      document.title = "Spotify";
      audio.remove();
      app.updateStatusMusic(false);
    });
    audio.addEventListener("timeupdate", (track) => {
      let value = Math.floor(track.target.currentTime) * 1000;
      app.updateTimerStart(millisToMinutesAndSeconds(value), { max: active.duration_ms, value });
    });
    audio.play();
    music.audio = audio;
  }, []);
  const togglePausePlay = useCallback(() => {
    if (app.music.isPlaying) {
      music.audio.pause();
      app.updateStatusMusic(false);
    } else {
      music.audio.play();
      app.updateStatusMusic(true);
    }
  }, [music.audio, app.music.isPlaying]);
  const changeDuration = useCallback((e) => {
    music.audio.currentTime = e.target.value / 1000;
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <div id="layout">
          <Sidebar />
          <div ref={container} id="container">
            <Navbar />
            <div id="router-body">
              <Routes>
                <Route path="/" element={<Home {...{ playHandlers }} />} />
                <Route path="/search" element={<Search {...{ playHandlers }} />} />
                <Route path="/browse/category/:id" element={<BrowseCategory {...{ playHandlers }} />} />
                <Route path="/browse/albums/:id" element={<BrowseAlbums {...{ playHandlers }} />} />
                <Route path="/playlist/:id" element={<Playlist {...{ playHandlers }} />} />
                <Route path="/artist/:id" element={<Artist {...{ playHandlers }} />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
              </Routes>
            </div>
          </div>
        </div>
        <Player {...{ togglePausePlay, changeDuration, playHandlers }} />
      </BrowserRouter>
    </div>
  );
}

export default App;
