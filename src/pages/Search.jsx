import { useEffect, useCallback, useReducer, useTransition } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SectionMusic from "../component/SectionMusic";
import spotify, { initalResponse } from "../service/spotify";

function handlers(value, action) {
	switch (action.type) {
		case "all":
			return { ...value, ...action.data };
		case "changeTabs":
			return { ...value, tabs: action.data };
		case "setValue":
			return { ...value, value: action.data };
		case "setAlbums":
			return { ...value, albums: action.data.albums };
		case "setArtists":
			return { ...value, artists: action.data.artists };
		case "setPlaylists":
			return { ...value, playlists: action.data.playlists };
		case "setTracks":
			return { ...value, tracks: action.data.tracks };
		default:
			return value;
	}
}

export default function Search({ playHandlers }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [state, dispatch] = useReducer(handlers, {
		tabs: "Albums",
		albums: initalResponse,
		artists: initalResponse,
		playlists: initalResponse,
		tracks: initalResponse,
		value: ''
	});
	const [isPending, startTransition] = useTransition();
	const changeTabs = useCallback((name) => {
		dispatch({ type: "changeTabs", data: name });
	}, []);

	useEffect(() => {
		let value = searchParams.get("value");
		dispatch({
			type: 'setValue', data: value || ''
		})
	}, [searchParams]);

	useEffect(() => {
		function main() {
			startTransition(async() => {
				const [albums, artist, playlist, track] = await Promise.all([
					spotify.getSearch(state.value, "album"),
					spotify.getSearch(state.value, "artist"),
					spotify.getSearch(state.value, "playlist"),
					spotify.getSearch(state.value, "track"),
				]);
				if (albums.albums && artist.artists && playlist.playlists && track.tracks) {
					dispatch({ type: "setAlbums", data: albums });
					dispatch({ type: "setArtists", data: artist });
					dispatch({ type: "setPlaylists", data: playlist });
					dispatch({ type: "setTracks", data: track });
				}
			})
		}
		if (state.value) {
			main()
		}
	}, [state.value]);
	return (
		<div id="search">
			{isPending ?
				<div className="box-empty">
					<p>loading</p>
				</div>
				: false
			}
			{state.value && !isPending ?
				<>
					<div className="tabs">
						<button className={state.tabs === "Albums" ? "active" : ""} onClick={() => changeTabs("Albums")}>
							Albums
						</button>
						<button className={state.tabs === "Artist" ? "active" : ""} onClick={() => changeTabs("Artist")}>
							Artist
						</button>
						<button className={state.tabs === "Playlist" ? "active" : ""} onClick={() => changeTabs("Playlist")}>
							Playlist
						</button>
						<button className={state.tabs === "Track" ? "active" : ""} onClick={() => changeTabs("Track")}>
							Track
						</button>
					</div>
					<div className="tabs-body">
						{state.tabs === "Albums" ? (
							<SectionMusic
								title="Albums"
								description="Result of Albums"
								data={state.albums}
								isMusic={true}
								margin={true}
								path="/browse/albums/"
								handlers={(data) => dispatch({ type: "setAlbums", data })}
								{...{ playHandlers }}
							/>
						) : (
							false
						)}
						{state.tabs === "Artist" ? (
							<SectionMusic
								title="Artist"
								description="Result of Artist"
								data={state.artists}
								isMusic={false}
								path="/artist/"
								handlers={(data) => dispatch({ type: "setArtists", data })}
								{...{ playHandlers }}
							/>
						) : (
							false
						)}
						{state.tabs === "Playlist" ? (
							<SectionMusic
								title="Playlist"
								description="Result of Playlist"
								data={state.playlists}
								isMusic={true}
								path="/playlist/"
								handlers={(data) => dispatch({ type: "setPlaylists", data })}
								{...{ playHandlers }}
							/>
						) : (
							false
						)}
						{state.tabs === "Track" ? (
							<SectionMusic
								title="Tracks"
								description="Result of Tracks"
								data={state.tracks}
								isMusic={true}
								isTrack={true}
								path="/tracks/"
								handlers={(data) => dispatch({ type: "setTracks", data })}
								{...{ playHandlers }}
							/>
						) : (
							false
						)}
					</div>
				</>
				: <div className="box-empty">
					<p>Type input to search</p>
				</div>
			}
		</div>
	);
}
