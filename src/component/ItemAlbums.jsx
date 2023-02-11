import { useCallback, useMemo } from "react";
import { PlayIcon, PauseIcon, EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { shallow } from "zustand/shallow";
import { Menu, Transition } from "@headlessui/react";
import useApp from "../store/useApp";

export default function ItemAlbums({ title, playHandlers, data, tracks }) {
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
		return musicId === data.id;
	}, [isPlaying, musicId, musicAlbumId, data.id]);
	return (
		<div className={(isActivePlay ? "active " : "") + "item-albums"}>
			<div>
				<button onClick={() => playHandlers(data, tracks)}>
					{isActivePlay ? <PauseIcon className="h-6" /> : <PlayIcon className="h-6" />}
				</button>
			</div>
			<div className="flex-1">{title}</div>
			<div>
				<DropdownMenu />
			</div>
		</div>
	);
}

function DropdownMenu() {
	const classMenuItem = useMemo(() => {
		return 'bg-zinc-800 hover:bg-zinc-700 p-2 cursor-pointer'
	}, []);
	const classBorderless = useMemo(() => {
		return ' border-b border-zinc-600'
	}, []);
	return (
		<Menu as="div">
			{({ open }) => (
				<>
					<Menu.Button>
						<EllipsisHorizontalIcon className="h-6" />
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
						<Menu.Items className="flex flex-col absolute right-14 w-40 shadow-2xl text-sm" style={{minWidth: 200}} static>
							<Menu.Item>
								<a className={classMenuItem + classBorderless}>Add to queue</a>
							</Menu.Item>
							<Menu.Item>
								<a className={classMenuItem}>Go to song radio</a>
							</Menu.Item>
							<Menu.Item>
								<a className={classMenuItem}>Go to artist</a>
							</Menu.Item>
							<Menu.Item>
								<a className={classMenuItem}>Go to album</a>
							</Menu.Item>
							<Menu.Item>
								<a className={classMenuItem + classBorderless}>Show credits</a>
							</Menu.Item>
							<Menu.Item>
								<a className={classMenuItem}>Save to your Liked Songs</a>
							</Menu.Item>
							<Menu.Item>
								<a className={classMenuItem + classBorderless}>Add to Playlist</a>
							</Menu.Item>
							<Menu.Item>
								<a className={classMenuItem + classBorderless}>Share</a>
							</Menu.Item>
							<Menu.Item>
								<a className={classMenuItem}>Open in Desktop app</a>
							</Menu.Item>
						</Menu.Items>
					</Transition>
				</>
			)}
		</Menu>
	);
}
