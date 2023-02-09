import { useEffect, useReducer, useTransition } from "react";
import { useParams, Link } from "react-router-dom";
import SectionMusic from "../component/SectionMusic";
import spotify, { initalResponse } from "../service/spotify";

function handlers(value, action) {
	switch (action.type) {
		case "setInfo":
			return {...value, info: action.data}
		case "setTopTrack":
			return { ...value, topTrack: { items: action.data.tracks } };
		default:
			return value;
	}
}
export default function Artist({ playHandlers }) {
	const param = useParams();
	const [state, dispatch] = useReducer(handlers, {
		info: { name: "", images: [], followers: { total: "" }, genres: '' },
		topTrack: initalResponse,
	});
	const [isPending, startTransition] = useTransition();
	useEffect(() => {
		function main() {
			startTransition(async() => {
				const [info, topTrack] = await Promise.all([spotify.getArtist(param.id), spotify.getArtistTopTrack(param.id)]);
				if(!topTrack.error && !info.error) {
					info.genres = info.genres.join(', ')
					dispatch({
						type: 'setInfo', data: info
					})
					dispatch({
						type: 'setTopTrack', data: topTrack
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
						<p className="description">{state.info.genres}</p>
					</div>
				</section>
			) : (
				false
			)}
			<SectionMusic
				title="Top Track"
				description="List of Top Track"
				data={state.topTrack}
				isMusic={true}
				isTrack={true}
				handlers={(data) => dispatch({ type: "setTopTrack", data })}
				{...{ playHandlers }}
			/>
		</>
	);
}
