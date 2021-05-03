import React from "react"
import {
  Link
} from "react-router-dom"
import {
  PlayIcon
} from '@heroicons/react/solid'

import Spotify from '../spotify.js'
import DefaultContext from '../context.js'

import AOS from 'aos';
import 'aos/dist/aos.css';

class Home extends React.Component{
	static contextType = DefaultContext
	constructor(props)
	{
		super(props)
		this.state = {
			commit: false,
			default: {
				img: 'https://i.scdn.co/image/ab67706f000000025aed10e2c0587c3562788186'
			},
			newRelease: {
				albums: {
					items: []
				}
			},
			category: {
				categories: {
					items: []
				}
			},
			listMusic: []
		}
		this.playMusic = this.playMusic.bind(this)
	}
	async componentDidMount()
	{
		const newRelease = await new Spotify().getNewRelease()
		const allCategory = await new Spotify().getAllCategory()
		if(newRelease && allCategory)
		{
		 this.setState({newRelease: newRelease})
		 this.setState({category: allCategory})
		 AOS.init()
		}
	}
	playMusic(e) {
        if(!this.state.commit){
            this.context.playMusic(e)
            this.context.setVal('listMusic', this.state.newRelease.albums.items)
            this.setState({
                'commit': true,
            })
            return true
        }
        else{
            this.context.playMusic(e)
        }
    }
	render()
	{
		return(
			<div>
				<section className="mt-2">
					<h3 className="font-bold text-2xl">
						<Link className="hover:underline" to="/">New Release</Link>
					</h3>
					<Link to="/" className="float-right text-opacity-70 text-gray-300 hover:underline">Show All</Link>
					<p className="font-light text-opacity-70 text-gray-200">The new released songs</p>
					<div className="relative overflow-auto scrollleft-hidden">
						<div>
							{
								this.state.newRelease.albums.items.length > 1 ? this.state.newRelease.albums.items.map((data, key) => {
									return(
										<div key={key} className="transition duration-700 w-44 float-left hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer m-1 sm:m-4 p-3 item-music">
											<img src={data.images[1].url} className="w-full rounded-sm" alt="" />
											<span onClick={this.playMusic} data-key={key} data-img={data.images[1].url} data-url={data.preview_url} data-name={data.name} className="rounded-sm float-right absolute -mt-14 hidden p-2 play-icon cursor-pointer">
												<PlayIcon data-url={data.preview_url} data-key={key} data-img={data.images[1].url} data-name={data.name} className="h-10" />
											</span>
											<h5 className="font-bold text-sm mt-1">{data.name}</h5>
										</div>
									)
								})
								: false
							}
						</div>
					</div>
				</section>
				<section className="mt-2">
					<h3 className="font-bold text-2xl">
						<Link className="hover:underline" to="/">Categories</Link>
					</h3>
					<Link to="/" className="float-right text-opacity-70 text-gray-300 hover:underline">Show All</Link>
					<p className="font-light text-opacity-70 text-gray-200">List of categories</p>
						<div className="flex flex-wrap">
							{
								this.state.category.categories.items.length > 1 ? this.state.category.categories.items.map((data, key) => {
									return(
										<Link data-aos="fade-in" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out" to={"/browse/category/" + data.id} key={key} className="transition duration-700 w-1/2 sm:w-60 hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer sm:m-2 p-2">
											<img src={data.icons[0].url} className="w-full rounded-sm" alt="" />
											<h5 className="font-bold text-base mt-1">{data.name}</h5>
										</Link>
									)
								})
								: false
							}
						</div>
				</section>
			</div>
		)
	}
}

export default Home