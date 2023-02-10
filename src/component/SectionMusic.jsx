import { useCallback, Fragment } from "react";
import { ArrowSmallLeftIcon, ArrowSmallRightIcon } from "@heroicons/react/24/solid";
import ItemMusic from "./ItemMusic";
import ItemAlbums from "./ItemAlbums";
import spotify from "../service/spotify";
import usePaginate from "../hook/usePaginate";

export default function SectionMusic({ title, description, data, isMusic, isTrack, path, playHandlers, handlers }) {
	const [nextData, previousData] = usePaginate({ data, handlers });
	return (
		<section>
			{title ?
				<div className="head-section">
					<div>
						<h3 className="title">{title}</h3>
						<p>{description}</p>
					</div>
				</div>
				: false
			}
			{data.items.length ? (
				<>
					{!isTrack ? (
						<div className="grid-music">
							{data.items.map((items, key) => {
								if (items) {
									return (
										<ItemMusic
											key={items.id}
											isMusic={isMusic}
											to={path + items.id}
											title={items.name}
											{...{ data: items, playHandlers }}
										/>
									);
								}
								else {
									return <Fragment key={key}></Fragment>
								}
							})}
						</div>
					) : (
						<div className="mt-2">
							{data.items.map((item, i) => (
								<ItemAlbums key={item.id} title={item.name} tracks={() => data.items} {...{ data: item, playHandlers }} />
							))}
						</div>
					)}
					{(data.next || data.previous) ?
						<div className="paginate">
							<button disabled={!data.previous} onClick={previousData}>
								<ArrowSmallLeftIcon className="h-6" />
							</button>
							<button disabled={!data.next} onClick={nextData}>
								<ArrowSmallRightIcon className="h-6" />
							</button>
						</div>
						: false
					}
				</>
			) : (
				false
			)}
		</section>
	);
}
