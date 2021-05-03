import React from "react"
import {
    Link
} from "react-router-dom"
import {
    PlayIcon,
    DotsHorizontalIcon,
    PauseIcon,
} from '@heroicons/react/solid'

import Spotify from '../spotify.js'
import DefaultContext from '../context.js'
import AOS from 'aos';
import 'aos/dist/aos.css';

class ShowAlbum extends React.Component {
    static contextType = DefaultContext
    constructor(props) {
        super(props)
        this.state = {
            albumsTrack: [],
            detail: {
                name: '',
                release_date: '',
                images: []
            }
        }
        this.playMusic = this.playMusic.bind(this)
    }
    async componentDidMount() {
        const albumsTrack = await new Spotify().getAlbumTrack(this.props.match.params.id)
        const albums = await new Spotify().getAlbum(this.props.match.params.id)
        if (albumsTrack && albums) {
            this.setState({ albumsTrack: albumsTrack.items })
            this.context.setVal('listMusic', albumsTrack.items)
            this.setState({ detail: albums })
            AOS.init();
        }
    }
    playMusic(e) {
        if(!this.state.commit){
            this.context.playMusic(e)
            this.context.setVal('listMusic', this.state.albumsTrack)
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
					<p className="p-2 float-left font-light text-sm sm:text-base text-opacity-70 text-gray-200 d-block">{this.state.detail.description}</p>
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
    						<ul className="w-full d-block">
    							{
    								this.state.albumsTrack.length > 1 ? this.state.albumsTrack.map((data, key) => {
    									var name        = data.track ? data.track.artists.map((art, key) => art.name).join(' & ') + " - " + data.track.name: data.artists.map((art, key) => art.name).join(' & ') + " - " + data.name
                                        var classActive = result.nameMusic === name ? 'bg-green-700 flex transition duration-700 w-2/2 hover:bg-green-400 hover:bg-opacity-50 cursor-pointer': 'flex transition duration-700 w-2/2 hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer'
                                        var trackUrl    = data.track ? data.track.preview_url: data.preview_url
                                        return(
                                          <li key={key} className={classActive}>
                                              <span className="w-1/4 rounded-sm p-2 play-icon cursor-pointer" onClick={this.playMusic} data-url={trackUrl} data-name={name}>
                                              {
                                                result.nameMusic === name && result.statusPlay ? <PauseIcon data-url={trackUrl} data-name={name} className="h-10" /> : <PlayIcon data-url={trackUrl} data-name={name} className="h-10" />
                                              }
                                              </span>
                                              <p className="w-2/4 font-bold text-sm p-2" dangerouslySetInnerHTML={{__html: name}}/>
                                              <span className="w-1/4 rounded-sm p-2 play-icon cursor-pointer">
                                                  <DotsHorizontalIcon data-url={trackUrl} data-name={name} className="h-10"/>
                                              </span>
                                            </li>
                                        )
    								})
    								: false
    							}
    						</ul>
                        )
                    }
                    </DefaultContext.Consumer>
				</section>
			</div>
        )
    }
}

export default ShowAlbum