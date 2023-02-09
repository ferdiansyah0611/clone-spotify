import { useReducer, useEffect, useTransition } from "react";
import { Link } from "react-router-dom";
import { ArrowSmallLeftIcon, ArrowSmallRightIcon } from "@heroicons/react/24/solid";

import spotify, { initalResponse } from "../service/spotify";
import ItemMusic from "../component/ItemMusic";
import SectionMusic from "../component/SectionMusic";
import usePaginate from '../hook/usePaginate';

function handlers(value, action) {
	switch (action.type) {
		case "":
			return { ...value, ...action.data };
		case "setCategory":
			return { ...value, category: action.data.categories };
		case "setNewRelease":
			return { ...value, newRelease: action.data.albums };
		default:
			return value;
	}
}
function Home({ playHandlers }) {
	const [state, dispatch] = useReducer(handlers, {
		newRelease: initalResponse,
		category: initalResponse,
		listMusic: [],
	});
	const [isPending, startTransition] = useTransition();
	useEffect(() => {
		function main() {
			startTransition(async() => {
				const [newRelease, category] = await Promise.all([spotify.getNewRelease(), spotify.getAllCategory()]);
				if (!newRelease.error && !category.error) {
					dispatch({
						type: "setNewRelease",
						data: newRelease,
					});
					dispatch({
						type: "setCategory",
						data: category,
					});
				}
			})
		}
		main();
	}, []);
	const [nextCategory, previousCategory] = usePaginate({
		data: state.category,
		handlers: (data) => dispatch({ type: "setCategory", data }),
	});
	if (isPending) {
		<div className="box-empty">
			<p>loading</p>
		</div>
	}
	return (
		<div>
			<SectionMusic
				title="New Release"
				description="The new released songs"
				data={state.newRelease}
				isMusic={true}
				path="/browse/albums/"
				handlers={(data) => dispatch({ type: "setNewRelease", data })}
				{...{ playHandlers }}
			/>
			<section className="mt-2">
				<div className="head-section">
					<div>
						<h3 className="title">Categories</h3>
						<p>List of categories</p>
					</div>
				</div>
				<div className="grid-music">
					{state.category.items.map((data, key) => {
						return (
							<ItemMusic key={key} isMusic={false} to={"/browse/category/" + data.id} title={data.name} {...{ data }} />
						);
					})}
				</div>
				<div className="paginate">
					<button onClick={previousCategory}>
						<ArrowSmallLeftIcon className="h-6" />
					</button>
					<button onClick={nextCategory}>
						<ArrowSmallRightIcon className="h-6" />
					</button>
				</div>
			</section>
		</div>
	);
}

export default Home;
