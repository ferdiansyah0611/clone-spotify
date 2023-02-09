import { useEffect, useReducer, useTransition } from "react";
import { useParams, Link } from "react-router-dom";
import SectionMusic from "../component/SectionMusic";
import spotify, { initalResponse } from "../service/spotify";

function handlers(value, action) {
	switch (action.type) {
		case "setInfo":
			return {...value, info: action.data}
		case "setPlaylists":
			return { ...value, playlists: action.data };
		default:
			return value;
	}
}
export default function Playlist({ playHandlers }) {
	const param = useParams();
	const [state, dispatch] = useReducer(handlers, {
		info: { name: "", images: [], followers: { total: "" } },
		playlists: initalResponse,
	});
	const [isPending, startTransition] = useTransition();
	useEffect(() => {
		function main() {
			startTransition(async () => {
				const [info, playlists] = await Promise.all([spotify.getPlaylist(param.id), spotify.getPlaylistItem(param.id)]);
				if(!playlists.error && !info.error) {
					playlists.items = playlists.items.map((value) => value.track);
					dispatch({
						type: 'setInfo', data: info
					})
					dispatch({
						type: 'setPlaylists', data: playlists
					})
				}
			})
		}
		main();
	}, [param.id]);

	if (isPending) {
		<div className="box-empty">
			<p>loading</p>
		</div>
	}
	return (
		<>
			{state.info.name ? (
				<section className="info mb-5">
					<img src={state.info.images.length >= 1 ? state.info.images[0].url : ""} alt="" />
					<div>
						<h3 className="title">{state.info.name}</h3>
						<p className="followers">{state.info.followers.total ? state.info.followers.total + " Followers" : ""} </p>
						<p className="description">{state.info.description}</p>
					</div>
				</section>
			) : (
				false
			)}
			<SectionMusic
				title="Track"
				description="List of Track"
				data={state.playlists}
				isMusic={true}
				isTrack={true}
				handlers={(data) => dispatch({ type: "setPlaylists", data })}
				{...{ playHandlers }}
			/>
		</>
	);
}
