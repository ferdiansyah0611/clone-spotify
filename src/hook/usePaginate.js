import { useMemo, useCallback } from "react";
import spotify from "../service/spotify";

export default function usePaginate({data, handlers}){
	const previousData = useCallback(async () => {
		if (!data.previous) return;
		let result = await spotify.custom(data.previous);
		if (result) {
			handlers(result);
		}
	}, [data.previous]);
	const nextData = useCallback(async () => {
		if (!data.next) return;
		let result = await spotify.custom(data.next);
		if (result) {
			handlers(result);
		}
	}, [data.next]);
	return useMemo(() => {
		return [nextData, previousData]
	}, [nextData, previousData]);
};