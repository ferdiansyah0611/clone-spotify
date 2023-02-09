import { useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PlayIcon, PauseIcon } from "@heroicons/react/20/solid";
import { shallow } from "zustand/shallow";
import useApp from "../store/useApp";

export default function ItemMusic({ to, title, isMusic, playHandlers, data, description }) {
	const { musicId, musicAlbumId, isPlaying } = useApp(
		(state) => ({
			musicId: state.music.active?.id,
			musicAlbumId: state.music.active?.album?.id,
			isPlaying: state.music.isPlaying,
		}),
		shallow
	);
	const navigate = useNavigate();
	const go = useCallback(
		(e) => {
			e.preventDefault();
			if (e.target.localName === "span" || e.target instanceof SVGElement || !to) return;
			navigate(to);
		},
		[to]
	);
	const source = useMemo(() => {
		let arr = data.images;
		if (!data) {
			return "";
		}
		if (data.icons) {
			arr = data.icons;
		}
		if (data.album) {
			arr = data.album.images;
		}
		if (arr.length) {
			return arr[0].url;
		}
		return "";
	}, [data]);
	const isActivePlay = useMemo(() => {
		if (!musicId || !isPlaying) {
			return false;
		}
		if (data.type === "album") {
			return musicAlbumId === data.id;
		}
		if (data.type === "track") {
			return musicId === data.id;
		}
		return false;
	}, [isPlaying, musicId, musicAlbumId, data.id]);
	return (
		<a
			href={to}
			onClick={go}
			className={
				(isMusic ? "item-music " : "") +
				"transition duration-500 bg-zinc-700/40 hover:bg-zinc-700 cursor-pointer p-2 rounded-md relative"
			}
		>
			<img src={source} className="w-full rounded-sm shadow-lg" alt="" />
			{isMusic ? (
				<span
					onClick={() => playHandlers(data)}
					className="rounded-sm float-right absolute -mt-14 hidden p-2 play-icon cursor-pointer"
				>
					{isActivePlay ? <PauseIcon className="h-10" /> : <PlayIcon className="h-10" />}
				</span>
			) : (
				false
			)}
			<h5 className="font-bold text-sm mt-1">{title}</h5>
			{description ? <p className="font-sm font-light">{description}</p> : false}
		</a>
	);
}
