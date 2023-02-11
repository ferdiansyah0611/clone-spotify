import { useEffect, useReducer, useTransition } from "react";
import { useParams } from "react-router-dom";
import SectionMusic from "../component/SectionMusic";
import spotify, { initalResponse } from "../service/spotify";

function handlers(value, action) {
	switch (action.type) {
		case "":
			return { ...value, ...action.data };
		case "setResult":
			return { ...value, result: action.data };
		default:
			return value;
	}
}

export default function BrowseAlbums({ playHandlers }) {
	const param = useParams();
	const [state, dispatch] = useReducer(handlers, {
		result: initalResponse,
	});
	const [isPending, startTransition] = useTransition();
	useEffect(() => {
		function main(){
			startTransition(async() => {
				const [info, track] = await Promise.all([spotify.getAlbum(param.id), spotify.getAlbumTrack(param.id)]);
				if (!track.error) {
					dispatch({type: 'setResult', data: track})
				}
			})
		}
		main()
	}, [param.id]);

	if (isPending) {
		<div className="box-empty">
			<p>loading</p>
		</div>
	}
	return (
		<SectionMusic
			title="Albums"
			description="The list of Albums"
			data={state.result}
			isMusic={true}
			isTrack={true}
			margin={true}
			handlers={(data) => dispatch({ type: "setResult", data })}
			{...{ playHandlers }}
		/>
	);
}
