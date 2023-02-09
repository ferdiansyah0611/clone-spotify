import { create } from "zustand";

const useApp = create((set) => ({
	// timer music
	timer: {
		start: "0:00",
		end: "0:00",
		progress: {
			max: 100,
			value: 0,
		},
	},
	updateTimerStart: (value, progress) =>
		set((current) => ({ ...current, timer: { ...current.timer, start: value, progress } })),
	updateTimerEnd: (value) => set((current) => ({ ...current, timer: { ...current.timer, end: value } })),
	// music
	music: {
		active: null,
		albums: {
			items: [],
		},
		isPlaying: false,
	},
	updateMusicAlbums: (music) => set((current) => ({ ...current, music })),
	updateMusic: (value) => set((current) => ({ ...current, music: { albums: current.music.albums, ...value } })),
	updateStatusMusic: (isPlaying) => set((current) => ({ ...current, music: { ...current.music, isPlaying } })),
	open: {
		albums: false,
		sidebar: true,
	},
	toggleOpen: (name, newVal = null) =>
		set((current) => ({
			...current,
			open: { ...current.open, [name]: newVal === null ? !current.open[name] : newVal },
		})),
	// config
	config: {
		autoPlay: false,
	},
	toggleAutoPlay: () =>
		set((current) => ({ ...current, config: { ...current.config, autoPlay: !current.config.autoPlay } })),
}));

export default useApp;
