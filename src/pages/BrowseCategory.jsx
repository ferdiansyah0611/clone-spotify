import { useEffect, useReducer, useTransition } from "react";
import { useParams, Link } from "react-router-dom";
import SectionMusic from "../component/SectionMusic";
import spotify, { initalResponse } from "../service/spotify";

function handlers(value, action){
	switch(action.type) {
		case "setInfo":
			return {...value, info: action.data}
		case "setPlaylists":
			return { ...value, playlists: action.data.playlists };
		default:
			return value;
	}
}
export default function BrowseCategory({playHandlers}){
	const param = useParams();
	const [state, dispatch] = useReducer(handlers, {
		info: { name: '' },
		playlists: initalResponse
	})
	const [isPending, startTransition] = useTransition();
	useEffect(() => {
		function main(){
			startTransition(async() => {
				const [info, playlists] = await Promise.all([spotify.getCategory(param.id), spotify.getCategoryPlaylist(param.id)]);
				if(!playlists.error && !info.error) {
					dispatch({
						type: 'setInfo', data: info
					})
					dispatch({
						type: 'setPlaylists', data: playlists
					})
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
	return(
		<>
			<SectionMusic
				title={state.info.name}
				description="List of categories"
				data={state.playlists}
				isMusic={true}
				path="/playlist/"
				handlers={(data) => dispatch({ type: "setPlaylists", data })}
				{...{ playHandlers }}
			/>
		</>
	)
};