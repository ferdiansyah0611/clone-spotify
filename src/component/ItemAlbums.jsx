import { useCallback, useMemo } from "react";
import { PlayIcon, PauseIcon, EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { shallow } from "zustand/shallow";
import useApp from "../store/useApp";

export default function ItemAlbums({ title, playHandlers, data }) {
	const { musicId, musicAlbumId, isPlaying } = useApp(
		(state) => ({
			musicId: state.music.active?.id,
			musicAlbumId: state.music.active?.album?.id,
			isPlaying: state.music.isPlaying,
		}),
		shallow
	);
	const isActivePlay = useMemo(() => {
		if (!musicId || !isPlaying) {
			return false;
		}
		return musicId === data.id
	}, [isPlaying, musicId, musicAlbumId, data.id]);
	return (
		<div className={(isActivePlay ? 'active ': '') + "item-albums"}>
			<div>
				<button onClick={() => playHandlers(data)}>
					{isActivePlay ? <PauseIcon className="h-6" /> : <PlayIcon className="h-6" />}
				</button>
			</div>
			<div className="flex-1">{title}</div>
			<div>
				<button>
					<EllipsisHorizontalIcon className="h-6" />
				</button>
			</div>
		</div>
	);
}
