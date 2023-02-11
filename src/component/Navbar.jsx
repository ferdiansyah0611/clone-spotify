import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { shallow } from "zustand/shallow";
import { ArrowLeftIcon, ArrowRightIcon, Bars3Icon } from "@heroicons/react/20/solid";
import useApp from "../store/useApp";

function Navbar() {
	const { toggleOpen } = useApp((state) => ({ toggleOpen: state.toggleOpen }), shallow);
	const [searchParams, setSearchParams] = useSearchParams();
	const [search, setSearch] = useState('');
	const to = useNavigate();
	useEffect(() => {
		let handlers = (e) => {
			if (e.matches) {
				toggleOpen("sidebar", false);
			}
			else {
				toggleOpen("sidebar", true);
			}
		};
		let match = window.matchMedia("(max-width: 640px)");
		match.addEventListener("change", handlers);
		handlers({
			matches: window.innerWidth <= 640
		})
		return () => {
			match.removeEventListener("change", handlers);
		};
	}, [toggleOpen]);
	useEffect(() => {
		let value = searchParams.get('value')
		if (value) {
			setSearch(value)
		}
	}, [searchParams]);
	const submitSearch = useCallback((e) => {
		e.preventDefault()
		to('/search?value=' + search)
	}, [search]);
	return (
		<nav id="navbar">
			<div className="flex px-5 py-2">
				<div className="action">
					<button className="p-2 block md:hidden" onClick={() => toggleOpen("sidebar")}>
						<Bars3Icon className="h-6" />
					</button>
					<button onClick={() => to(-1)} className="switcher">
						<ArrowLeftIcon className="h-6" />
					</button>
					<button onClick={() => to(1)} className="switcher">
						<ArrowRightIcon className="h-6" />
					</button>
					<form onSubmit={submitSearch} className="flex-1">
						<input
							type="search"
							placeholder="Search music, artist, album and more"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</form>
				</div>
				<div className="flex-1 flex space-x-2 text-white font-bold justify-end">
					<Link to="/signup" className="p-2">
						Sign Up
					</Link>
					<Link to="/signin" className="p-2 bg-white text-black rounded-xl">
						Sign In
					</Link>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
