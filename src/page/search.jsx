import React from "react"
import {
    Link
} from "react-router-dom"
import {
    PlayIcon
} from '@heroicons/react/solid'
import $ from 'jquery'

import DefaultContext from '../context.js'
import AOS from 'aos';
import 'aos/dist/aos.css';

class Search extends React.Component {
    static contextType = DefaultContext
    constructor(props) {
        super(props)
        this.state = {
            detail: {
                name: ''
            },
            listMusic: [],
            commit: false,
            category: [],
            tabs1: true,
            tabs2: false,
            tabs3: false,
            tabs4: false,
        }
        this.playMusic = this.playMusic.bind(this)
        this.openTab = this.openTab.bind(this)
    }
    componentDidMount() {
    	AOS.init();
        this.context.setVal('search', true)
    }
    componentWillUnmount() {
        this.context.setVal('search', false)
    }
    openTab(e) {
        e.preventDefault();
        ['tabs1', 'tabs2', 'tabs3', 'tabs4'].forEach((data) => {
            if (e.target.dataset.id !== data) {
                this.setState({
                    [data]: false })
            }
        })
        this.setState({[e.target.dataset.id]: true })
    }
    playMusic(e) {
        if(!this.state.commit){
            this.context.playMusic(e)
            this.context.setVal('listMusic', this.context.searchTrack.tracks.items)
            this.setState({
                'commit': true,
            })
            return true
        }
        else{
            this.context.playMusic(e)
        }
    }
    render() {
        return (
            <div>
				<DefaultContext.Consumer>
				{
					result => {
						return(
							<>
									<div className="flex text-center">
										<span onClick={this.openTab} data-id="tabs1" className={this.state.tabs1 ? "text-opacity-100 p-3 font-bold bg-gray-700 w-1/4 text-opacity-70 text-gray-200 hover:text-opacity-100 cursor-pointer": "p-3 font-bold bg-gray-700 w-1/4 text-opacity-70 text-gray-200 hover:text-opacity-100 cursor-pointer"}>Albums</span>
										<span onClick={this.openTab} data-id="tabs2" className={this.state.tabs2 ? "text-opacity-100 p-3 font-bold bg-gray-700 w-1/4 text-opacity-70 text-gray-200 hover:text-opacity-100 cursor-pointer": "p-3 font-bold bg-gray-700 w-1/4 text-opacity-70 text-gray-200 hover:text-opacity-100 cursor-pointer"}>Artist</span>
										<span onClick={this.openTab} data-id="tabs3" className={this.state.tabs3 ? "text-opacity-100 p-3 font-bold bg-gray-700 w-1/4 text-opacity-70 text-gray-200 hover:text-opacity-100 cursor-pointer": "p-3 font-bold bg-gray-700 w-1/4 text-opacity-70 text-gray-200 hover:text-opacity-100 cursor-pointer"}>Playlist</span>
										<span onClick={this.openTab} data-id="tabs4" className={this.state.tabs4 ? "text-opacity-100 p-3 font-bold bg-gray-700 w-1/4 text-opacity-70 text-gray-200 hover:text-opacity-100 cursor-pointer": "p-3 font-bold bg-gray-700 w-1/4 text-opacity-70 text-gray-200 hover:text-opacity-100 cursor-pointer"}>Track</span>
									</div>
									<div className="w-full">
										<div id="tabs1" className={this.state.tabs1 ? 'tabs block': 'tabs hidden'}>
										{
											result.searchAlbum.albums.items.length >= 1 ?
											<section className="mt-2">
												<h3 className="font-bold text-2xl">
													<Link className="hover:underline" to="/">Albums</Link>
												</h3>
												<Link to="/" className="float-right text-opacity-70 text-gray-300 hover:underline">Show All</Link>
												<p className="font-light text-opacity-70 text-gray-200">List of albums</p>
													<div className="flex flex-wrap">
														{
															result.searchAlbum.albums.items.length > 1 ? result.searchAlbum.albums.items.map((data, key) => {
																return(
																	<Link data-aos="fade-in" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out" to={"/browse/albums/" + data.id} key={key} className="transition duration-700 w-1/2 sm:w-60 hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer sm:m-2 p-2 item-music">
																		<img src={data.images[1].url} className="w-full rounded-sm" alt="" />
																		<span to="/" className="cursor-pointer rounded-sm float-right absolute -mt-14 hidden p-2 play-icon cursor-pointer"><PlayIcon className="h-10" /></span>
																		<h5 className="font-bold text-sm sm:text-base mt-1">{data.name}</h5>
																		<p className="font-light text-sm sm:text-base text-opacity-70 text-gray-200">{data.total_tracks} Track</p>
																		<p className="font-light text-sm sm:text-base text-opacity-70 text-gray-200">{data.release_date} Released</p>
																	</Link>
																)
															})
															: false
														}
													</div>
											</section>
											: ''
										}
										</div>
										<div id="tabs2" className={this.state.tabs2 ? 'tabs block': 'tabs hidden'}>
										{
											result.searchAlbum.albums.items.length >= 1 ?
											<section className="mt-2">
												<h3 className="font-bold text-2xl">
													<Link className="hover:underline" to="/">Artist</Link>
												</h3>
												<Link to="/" className="float-right text-opacity-70 text-gray-300 hover:underline">Show All</Link>
												<p className="font-light text-opacity-70 text-gray-200">List of artists</p>
													<div className="flex flex-wrap">
														{
															result.searchArtist.artists.items.length > 1 ? result.searchArtist.artists.items.map((data, key) => {
																return(
																	<Link data-aos="fade-in" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out" to={"/artists/" + data.id} key={key} className="transition duration-700 w-1/2 sm:w-60 hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer sm:m-2 p-2 item-music">
																		<img src={data.images.length >= 1 ? data.images[1].url: ''} className="w-full rounded-sm" alt="" />
																		<span to="/" className="cursor-pointer rounded-sm float-right absolute -mt-14 hidden p-2 play-icon cursor-pointer"><PlayIcon className="h-10" /></span>
																		<h5 className="font-bold text-sm sm:text-base mt-1">{data.name}</h5>
																		<p className="font-light text-sm sm:text-base text-opacity-70 text-gray-200">{data.followers.total} Followers</p>
																	</Link>
																)
															})
															: false
														}
													</div>
											</section>
											: ''
										}
										</div>
										<div id="tabs3" className={this.state.tabs3 ? 'tabs block': 'tabs hidden'}>
										{
											result.searchAlbum.albums.items.length >= 1 ?
											<section className="mt-2">
												<h3 className="font-bold text-2xl">
													<Link className="hover:underline" to="/">Playlist</Link>
												</h3>
												<Link to="/" className="float-right text-opacity-70 text-gray-300 hover:underline">Show All</Link>
												<p className="font-light text-opacity-70 text-gray-200">List of playlists</p>
													<div className="flex flex-wrap">
														{
															result.searchPlaylist.playlists.items.length > 1 ? result.searchPlaylist.playlists.items.map((data, key) => {
																return(
																	<Link data-aos="fade-in" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out" to={"/playlists/" + data.id} key={key} className="transition duration-700 w-1/2 sm:w-60 hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer sm:m-2 p-2 item-music">
																		<img src={data.images.length >= 1 ? data.images[0].url: ''} className="w-full rounded-sm" alt="" />
																		<span to="/" className="cursor-pointer rounded-sm float-right absolute -mt-14 hidden p-2 play-icon cursor-pointer"><PlayIcon className="h-10" /></span>
																		<h5 className="font-bold text-sm sm:text-base mt-1" dangerouslySetInnerHTML={{__html: data.name}}/>
																		<p className="text-sm text-opacity-70 sm:text-base font-light text-gray-200" dangerouslySetInnerHTML={{__html: data.description}}/>
																	</Link>
																)
															})
															: false
														}
													</div>
											</section>
											: ''
										}
										</div>
										<div id="tabs4" className={this.state.tabs4 ? 'tabs block': 'tabs hidden'}>
										{
											result.searchAlbum.albums.items.length >= 1 ?
											<section className="mt-2">
												<h3 className="font-bold text-2xl">
													<Link className="hover:underline" to="/">Track</Link>
												</h3>
												<Link to="/" className="float-right text-opacity-70 text-gray-300 hover:underline">Show All</Link>
												<p className="font-light text-opacity-70 text-gray-200">List of tracks</p>
													<div className="flex flex-wrap">
														{
															result.searchTrack.tracks.items.length > 1 ? result.searchTrack.tracks.items.map((data, key) => {
																var name 	= data.artists.map((art, key) => art.name).join(' & ') + " - " + data.name
																var img 	= data.album.images.length >= 1 ? data.album.images[1].url: ''
																return(
																	<div data-aos="fade-in" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out" to={"/playlists/" + data.id} key={key} className="transition duration-700 w-1/2 sm:w-60 hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer sm:m-2 p-2 item-music">
																		<img src={img} data-url={data.preview_url} data-img={img} data-name={name} className="w-full rounded-sm" alt="" />
																		<span onClick={this.playMusic} data-img={img} data-url={data.preview_url} data-name={name} className="rounded-sm float-right absolute -mt-14 hidden p-2 play-icon cursor-pointer">
																			<PlayIcon data-url={data.preview_url} data-img={img} data-name={name} className="h-10" />
																		</span>
																		<h5 className="font-bold text-sm sm:text-base mt-1" dangerouslySetInnerHTML={{__html: name}}/>
																		<p className="text-sm text-opacity-70 sm:text-base font-light text-gray-200" dangerouslySetInnerHTML={{__html: data.description}}/>
																	</div>
																)
															})
															: false
														}
													</div>
											</section>
											: ''
										}
										</div>
									</div>
								</>
						)
					}
				}
				</DefaultContext.Consumer>
			</div>
        )
    }
}

export default Search