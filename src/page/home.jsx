import React from "react"
import {
  Link
} from "react-router-dom"
import {
  PlayIcon
} from '@heroicons/react/solid'
import $ from 'jquery'

class Home extends React.Component{
	componentDidMount()
	{
	}
	render()
	{
		return(
			<div>
				<section className="mt-2">
					<h3 className="font-bold text-2xl mb-2">Top Weekly</h3>
					<div className="relative overflow-auto scrollleft-hidden">
						<div>
							{
								[0,1,2,3,4,5,6,7,8,9].map((data, key) => {
									return(
										<div key={key} className="transition duration-700 w-44 float-left hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer m-4 p-3 item-music">
											<img src="https://i.scdn.co/image/ab67706f000000025aed10e2c0587c3562788186" className="w-full" />
											<a href="" className="from-gray-500 bg-gradient-to-r rounded-sm absolute -mt-14 ml-24 p-2 hidden play-icon transition duration-700"><PlayIcon className="h-10" /></a>
											<h5 className="font-bold text-sm mt-1">New Music Freeday...</h5>
											<p className="text-sm font-light">The best newly released songs of the week...</p>
										</div>
									)
								})
							}
						</div>
					</div>
				</section>
				<section className="mt-2">
					<h3 className="font-bold text-2xl mb-2">Popular International</h3>
					<div className="relative overflow-auto scrollleft-hidden">
						<div>
							{
								[0,1,2,3,4,5,6,7,8,9].map((data, key) => {
									return(
										<div key={key} className="transition duration-700 w-44 float-left hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer m-4 p-3 item-music">
											<img src="https://i.scdn.co/image/ab67706f000000025aed10e2c0587c3562788186" className="w-full" />
											<a href="" className="from-gray-500 bg-gradient-to-r rounded-sm absolute -mt-14 ml-24 p-2 hidden play-icon transition duration-700"><PlayIcon className="h-10" /></a>
											<h5 className="font-bold text-sm mt-1">New Music Freeday...</h5>
											<p className="text-sm font-light">The best newly released songs of the week...</p>
										</div>
									)
								})
							}
						</div>
					</div>
				</section>
				<section className="mt-2">
					<h3 className="font-bold text-2xl mb-2">Top Hits Indonesia</h3>
					<div className="relative overflow-auto scrollleft-hidden">
						<div>
							{
								[0,1,2,3,4,5,6,7,8,9].map((data, key) => {
									return(
										<div key={key} className="transition duration-700 w-44 float-left hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer m-4 p-3 item-music">
											<img src="https://i.scdn.co/image/ab67706f000000025aed10e2c0587c3562788186" className="w-full" />
											<a href="" className="from-gray-500 bg-gradient-to-r rounded-sm absolute -mt-14 ml-24 p-2 hidden play-icon transition duration-700"><PlayIcon className="h-10" /></a>
											<h5 className="font-bold text-sm mt-1">New Music Freeday...</h5>
											<p className="text-sm font-light">The best newly released songs of the week...</p>
										</div>
									)
								})
							}
						</div>
					</div>
				</section>
			</div>
		)
	}
}

export default Home