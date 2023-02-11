import { useCallback, useMemo } from 'react';
import { Link, NavLink } from "react-router-dom";
import { HomeIcon, MagnifyingGlassIcon, ListBulletIcon, PlusIcon, HeartIcon } from "@heroicons/react/24/solid";
import { shallow } from "zustand/shallow";
import useApp from '../store/useApp';

function Sidebar({ heightWindow }) {
	const { openSidebar, toggleOpen } = useApp((state) => ({openSidebar: state.open.sidebar, toggleOpen: state.toggleOpen}), shallow)
	const openMe = useCallback(() => {
		window.open('http://ferdiansyah.web.app')
	}, []);
	return (
		<>
			<div id="sidebar" style={{height: heightWindow.replace(')', ' + 3.5em)')}} className={openSidebar ? 'open': ''}>
				<div className="border-b border-zinc-800">
					<h1 onClick={openMe} className="p-4 font-bold cursor-pointer">Spotify by Ferdi</h1>
				</div>
				<ul className="text-white">
					<li>
						<NavLink to="/" className={({isActive}) => isActive ? "active": undefined}>
							<HomeIcon className="h-6" /> <span className="ml-3">Home</span>
						</NavLink>
					</li>
					<li>
						<NavLink to="/search" className={({isActive}) => isActive ? "active": undefined}>
							<MagnifyingGlassIcon className="h-6" /> <span className="ml-3">Search</span>
						</NavLink>
					</li>
					<li>
						<Link to="/">
							<ListBulletIcon className="h-6" /> <span className="ml-3">My Collection</span>
						</Link>
					</li>
					<li className="mt-5">
						<Link to="/">
							<PlusIcon className="h-6" /> <span className="ml-3">Create Playlist</span>
						</Link>
					</li>
					<li>
						<Link to="/">
							<HeartIcon className="h-6" /> <span className="ml-3">Favorite Songs</span>
						</Link>
					</li>
				</ul>
			</div>
			{openSidebar ? <div onClick={() => toggleOpen('sidebar')} id="layer"></div>: false}
		</>
	);
}

export default Sidebar;
