import React from "react"
import {
    Link
} from "react-router-dom"

import Spotify from '../spotify.js'
import DefaultContext from '../context.js'
import AOS from 'aos';
import 'aos/dist/aos.css';

class ShowArtist extends React.Component {
    static contextType = DefaultContext
    constructor(props) {
        super(props)
        this.state = {
            playlists: [],
            detail: {
                genres: [],
                images: [],
                followers: {}
            },
            commit: false
        }
        this.playMusic = this.playMusic.bind(this)
    }
    async componentDidMount() {
        const playlists = await new Spotify().getArtistTopTrack(this.props.match.params.id)
        const artistDetail = await new Spotify().getArtist(this.props.match.params.id)
        if (playlists && artistDetail) {
            this.setState({ playlists: playlists.tracks })
            this.setState({ detail: artistDetail })
            AOS.init();
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
    render() {
        return (
            <div className="flex flex-wrap">
				<section className="mt-2 bg-gray-600 w-full">
					<img className="w-24 mr-2 float-left" src={this.state.detail.images.length >= 1 ? this.state.detail.images[0].url: ''} alt=""/>
					<h3 className="ml-2 font-bold text-2xl">
						<Link className="hover:underline" to="/">{this.state.detail.name}</Link>
					</h3>
                    <p className="p-1 font-light text-sm sm:text-base text-gray-400 d-block">{this.state.detail.genres.join(' | ').toUpperCase()}</p>
					<p className="p-1 font-light text-sm sm:text-base text-red-400 d-block">{this.state.detail.followers.total} Followers</p>
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
    									var name 	= data.artists.map((art, key) => art.name).join(' & ') + " - " + data.name
    									var img 	= data.album.images.length >= 1 ? data.album.images[1].url: ''
    									return(
    										<div data-aos="fade-in" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out" to={"/playlists/" + data.id} key={key} className="transition duration-700 w-1/2 sm:w-60 hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer sm:m-2 p-2 item-music">
    											<img src={img} data-key={key} data-url={data.preview_url} data-img={img} data-name={name} className="w-full rounded-sm" alt="" />
    											<span onClick={this.playMusic} data-key={key} data-img={img} data-url={data.preview_url} data-name={name} className="rounded-sm float-right absolute -mt-14 hidden p-2 play-icon cursor-pointer">
                                                    {
                                                        result.nameMusic === name && result.statusPlay ?
                                                            <svg data-key={key} data-url={data.preview_url} data-img={img} data-name={name} xmlns="http://www.w3.org/2000/svg" className="h-10" viewBox="0 0 20 20" fill="currentColor">
                                                                <path data-key={key} data-url={data.preview_url} data-img={img} data-name={name} fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                            </svg>
                                                        : 
                                                            <svg data-key={key} data-url={data.preview_url} data-img={img} data-name={name} xmlns="http://www.w3.org/2000/svg" className="h-10" viewBox="0 0 20 20" fill="currentColor">
                                                                <path data-key={key} data-url={data.preview_url} data-img={img} data-name={name} fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                                            </svg>
                                                      }
    											</span>
    											<h5 className="font-bold text-base mt-1" dangerouslySetInnerHTML={{__html: name}}/>
    											<p className="font-sm font-light" dangerouslySetInnerHTML={{__html: data.description}}/>
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

export default ShowArtist