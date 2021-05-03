import React from "react"
import {
  Link
} from "react-router-dom"

import Spotify from '../spotify.js'
import AOS from 'aos';
import 'aos/dist/aos.css';

class ShowCategory extends React.Component
{
	constructor(props)
	{
		super(props)
		this.state = {
			detail: {
				name: ''
			},
			category: []
		}
	}
	async componentDidMount()
	{
		const category = await new Spotify().getCategoryPlaylist(this.props.match.params.id)
		const detail = await new Spotify().getCategory(this.props.match.params.id)
		if(category && detail)
		{
			this.setState({category: category.playlists.items})
			this.setState({detail: detail})
			AOS.init();
		}
	}
	render()
	{
		return(
			<div>
				<section className="mt-2">
					<h3 className="font-bold text-2xl">
						<Link className="hover:underline" to="/">{this.state.detail.name}</Link>
					</h3>
					<Link to="/" className="float-right text-opacity-70 text-gray-300 hover:underline">Show All</Link>
					<p className="font-light text-opacity-70 text-gray-200">List of categories</p>
						<div className="flex flex-wrap">
							{
								this.state.category.length > 1 ? this.state.category.map((data, key) => {
									return(
										<Link data-aos="fade-in" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out" to={"/playlists/" + data.id} key={key} className="transition duration-700 w-1/2 sm:w-60 hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer sm:m-2 p-2">
											<img src={data.images[0].url} className="w-full rounded-sm" alt="" />
											<h5 className="font-bold text-base mt-1" dangerouslySetInnerHTML={{__html: data.name}}/>
											<p className="font-sm font-light" dangerouslySetInnerHTML={{__html: data.description}}/>
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

 export default ShowCategory