import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { shallow } from "zustand/shallow";
import {
	PlayIcon,
	PauseIcon,
	BackwardIcon,
	ForwardIcon,
	ChevronDownIcon,
	EllipsisHorizontalIcon,
	EllipsisVerticalIcon,
} from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
import useApp from "../store/useApp";
import ItemAlbums from "./ItemAlbums";

export default function Player({ togglePausePlay, changeDuration, playHandlers }) {
	const { timer, music, toggleOpen, openAlbums } = useApp(
		(state) => ({
			timer: state.timer,
			music: state.music,
			toggleOpen: state.toggleOpen,
			openAlbums: state.open.albums,
		}),
		shallow
	);
	const musicName = useMemo(() => {
		if (music.active) {
			if (!music.active.artists || !music.active.artists.length) {
				return music.active.name;
			}
			let value = "";
			let username = music.active.artists.map((item, i) => {
				return item.name;
			});
			value = username.join(", ");
			value += " - " + music.active.name;
			return value;
		}
		return "No Play Music";
	}, [music.active]);
	const musicImage = useMemo(() => {
		if (music.active && music.active.album && music.active.album.images.length) {
			return music.active.album.images[0].url;
		}
		return ''
	}, [music.active]);
	const navigateMusic = useCallback((isNext) => {
		if (music.active && music.albums.items) {
			let index = -1;
			for(let i = 0; i < music.albums.items.length; i++){
				let current = music.albums.items[i];
				if (current && current.id === music.active.id) {
					index = (isNext ? i + 1: i - 1);
					break;
				}
			}
			if (index === -1) {
				return;
			}

			let musicNew = music.albums.items.find((item, i) => i === index)
			if (musicNew) {
				playHandlers(musicNew, music.albums.items.length ? (() => music.albums.items): undefined)
			}
		}
	}, [music.active, music.albums, playHandlers]);
	return (
		<div id="player">
			<div id="albums" className={openAlbums ? "open" : ""}>
				<div className="close-action p-2">
					<button onClick={() => toggleOpen("albums")}>
						<ChevronDownIcon className="h-8" />
					</button>
				</div>
				<div className="p-2 md:p-4 !pb-12">
					{music.albums.items.map((data) => (
						<ItemAlbums key={data.id} title={data.name} {...{ data, playHandlers }} />
					))}
				</div>
			</div>
			<div className="action">
				<div>
					{musicImage ? (
						<img
							onClick={() => toggleOpen("albums")}
							style={{ zIndex: 60 }}
							className={
								(music.isPlaying ? "music-spin " : "") +
								"absolute bottom-0 left-6 cursor-pointer rounded-full w-20 mb-14 border-gray-200 border-2"
							}
							src={musicImage}
							alt=""
						/>
					) : (
						""
					)}
				</div>
				<div>
					<div className="p-1">
						<marquee onClick={() => toggleOpen("albums")} className="cursor-pointer" behavior="" direction="left">
							{musicName}
						</marquee>
					</div>
					<div className="p-1">
						<button onClick={() => navigateMusic()}>
							<BackwardIcon className="w-6" />
						</button>
						<button onClick={togglePausePlay}>
							{music.isPlaying ? <PauseIcon className="w-6" /> : <PlayIcon className="w-6" />}
						</button>
						<button onClick={() => navigateMusic(true)}>
							<ForwardIcon className="w-6" />
						</button>
					</div>
					<div>
						<span className="text-zinc-300">{timer.start}</span>
						<input
							value={timer.progress.value}
							onChange={changeDuration}
							min="0"
							max={timer.progress.max}
							type="range"
						/>
						<span className="text-zinc-300">{timer.end}</span>
					</div>
				</div>
				<div className="relative">
					<DropdownMusic />
				</div>
			</div>
		</div>
	);
}

function DropdownMusic() {
	const { config, toggleAutoPlay } = useApp(
		(state) => ({
			config: state.config,
			toggleAutoPlay: state.toggleAutoPlay,
		}),
		shallow
	);
	return (
		<Menu as="div" className="absolute right-6 -top-6 z-50">
			{({ open }) => (
				<>
					<Menu.Button className="bg-green-500 hover:bg-green-600 cursor-pointer p-3 rounded-full">
						<EllipsisVerticalIcon className="h-6" />
					</Menu.Button>
					<Transition
						show={open}
						enter="transition duration-100 ease-out"
						enterFrom="transform scale-95 opacity-0"
						enterTo="transform scale-100 opacity-100"
						leave="transition duration-75 ease-out"
						leaveFrom="transform scale-100 opacity-100"
						leaveTo="transform scale-95 opacity-0"
					>
						<Menu.Items className="flex flex-col absolute right-14 -top-40 w-40 shadow-2xl" static>
							<Menu.Item onClick={toggleAutoPlay}>
								<a className={(config.autoPlay ? 'bg-zinc-500': 'bg-zinc-700') + " hover:bg-zinc-600 p-2 cursor-pointer"}>Auto Play</a>
							</Menu.Item>
							<Menu.Item>
								<a className="bg-zinc-700 hover:bg-zinc-600 p-2 cursor-pointer">Add to Favorite</a>
							</Menu.Item>
							<Menu.Item>
								<a className="bg-zinc-700 hover:bg-zinc-600 p-2 cursor-pointer">Share</a>
							</Menu.Item>
						</Menu.Items>
					</Transition>
				</>
			)}
		</Menu>
	);
}
