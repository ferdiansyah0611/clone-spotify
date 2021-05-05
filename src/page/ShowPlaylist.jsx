import React from "react"
import {
    Link
} from "react-router-dom"
import {
    PlayIcon,
    PauseIcon
} from '@heroicons/react/solid'

import Spotify from '../spotify.js'
import DefaultContext from '../context.js'
import AOS from 'aos';
import 'aos/dist/aos.css';

class ShowPlaylist extends React.Component {
    static contextType = DefaultContext
    constructor(props) {
        super(props)
        this.state = {
            playlists: [],
            detail: {
                images: [],
                followers: {
                    detail: false
                }
            },
            commit: false
        }
        this.playMusic = this.playMusic.bind(this)
        this.pauseMusic = this.pauseMusic.bind(this)
    }
    async componentDidMount() {
        const playlists = await new Spotify().getPlaylistItem(this.props.match.params.id)
        const playlistsDetail = await new Spotify().getPlaylist(this.props.match.params.id)
        if (playlists && playlistsDetail) {
            this.setState({ playlists: playlists.items })
            this.setState({ detail: playlistsDetail })
            AOS.init()
        }
    }
    playMusic(e) {
        if(!this.state.commit){
            this.context.playMusic(e)
            this.context.setVal('listMusic', this.state.playlists)
            this.setState({
                'commit': true,
            })
            return true
        }
        else{
            this.context.playMusic(e)
        }
    }
    pauseMusic(e){
        this.context.pauseMusic(e)
    }
    render() {
        return (
            <div className="flex flex-wrap">
				<section className="mt-2 bg-gray-600 w-full">
					<img className="w-24 mr-2 float-left" src={this.state.detail.images.length >= 1 ? this.state.detail.images[0].url: ''} alt=""/>
					<h3 className="ml-2 font-bold text-2xl">
						<Link className="hover:underline" to="/">{this.state.detail.name}</Link>
					</h3>
					<p className="font-light text-sm sm:text-base text-red-400 d-block">{this.state.detail.followers.total ? this.state.detail.followers.total + ' Followers': ''} </p>
					<p className="font-light text-sm sm:text-base text-opacity-70 text-gray-200 d-block" dangerouslySetInnerHTML={{__html: this.state.detail.description}}/>
				</section>
				<section className="mt-2 w-full">
					<h3 className="font-bold text-2xl">
						<Link className="hover:underline" to="/">Track</Link>
					</h3>
					<Link to="/" className="float-right text-opacity-70 text-gray-300 hover:underline">Show All</Link>
					<p className="font-light text-opacity-70 text-gray-200">List of track</p>
                    <DefaultContext.Consumer>
                    {
                        result => (
    						<div className="flex flex-wrap">
    							{
    								this.state.playlists.length > 1 ? this.state.playlists.map((data, key) => {
    									var name 	= data.track.artists.map((art, key) => art.name).join(' & ') + " - " + data.track.name
    									var img 	= data.track.album.images.length >= 1 ? data.track.album.images[1].url: ''
    									return(
    										<div key={key} onClick={this.playMusic} className="transition duration-700 w-1/2 sm:w-60 hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer sm:m-2 p-2 item-music">
    											<img src={img} data-key={key} data-url={data.track.preview_url} data-img={img} data-name={name} className="w-full rounded-sm" alt="" />
    											<span data-key={key} data-img={img} data-url={data.track.preview_url} data-name={name} className="rounded-sm float-right absolute -mt-14 hidden p-2 play-icon cursor-pointer">
                                                {
                                                    result.nameMusic === name ? 
                                                        result.statusPlay ?
                                                            <svg data-url={data.track.preview_url} data-key={key} data-img={img} data-name={name} xmlns="http://www.w3.org/2000/svg" className="h-10 z-10" viewBox="0 0 20 20" fill="currentColor">{/*pauseicon*/}
                                                                <path data-url={data.track.preview_url} data-key={key} data-img={img} data-name={name} fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                            </svg>
                                                        :
                                                            <svg data-url={data.track.preview_url} data-key={key} data-img={img} data-name={name} xmlns="http://www.w3.org/2000/svg" className="h-10 z-10" viewBox="0 0 20 20" fill="currentColor">{/*playicon*/}
                                                                <path data-url={data.track.preview_url} data-key={key} data-img={img} data-name={name} fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                                            </svg>
                                                    :
                                                    <svg data-url={data.track.preview_url} data-key={key} data-img={img} data-name={name} xmlns="http://www.w3.org/2000/svg" className="h-10 z-10" viewBox="0 0 20 20" fill="currentColor">{/*playicon*/}
                                                        <path data-url={data.track.preview_url} data-key={key} data-img={img} data-name={name} fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                                    </svg>
                                                }
    											</span>
    											<h5 data-key={key} data-img={img} data-url={data.track.preview_url} data-name={name} className="font-light text-center text-base mt-1" dangerouslySetInnerHTML={{__html: name}}/>
    											<p data-key={key} data-img={img} data-url={data.track.preview_url} data-name={name} className="font-sm font-light" dangerouslySetInnerHTML={{__html: data.description}}/>
    										</div>
    									)
    								})
    								: false
    							}
    						</div>
                        )
                    }
                    </DefaultContext.Consumer>
				</section>
			</div>
        )
    }
}

export default ShowPlaylist