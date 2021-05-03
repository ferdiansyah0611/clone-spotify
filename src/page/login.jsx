import React from "react"
import {
  Link,
  Redirect
} from "react-router-dom"

import Spotify from '../spotify.js'
import {clientID, secretID} from '../env.js'

class Login extends React.Component{
	constructor(props)
	{
		super(props)
		this.state = {
			hasLogged: false
		}
		this.login = this.login.bind(this)
	}
	login(e)
	{
		e.preventDefault()
		var api = new Spotify(clientID, secretID)
		api.getToken()
		this.setState({hasLogged: true})
	}
	render()
	{
		if(this.state.hasLogged)
		{
			return <Redirect to="/"/>
		}
		return(
			<div>
				<section>
					<h3 className="text-center font-bold">To continue, login to Spotify.</h3>
					<div className="flex text-center">
						<div className="w-full sm:w-2/3 md:w-1/2 mx-auto">
							<ul className="block">
								<li className="flex">
									<a href="/" className="w-full rounded-2xl mt-5 bg-blue-900 hover:bg-blue-800 text-white p-4 font-bold">CONTINUE WITH FACEBOOK</a>
								</li>
								<li className="flex">
									<a href="/" className="w-full rounded-2xl mt-5 bg-black hover:bg-gray-900 text-white p-4 font-bold">CONTINUE WITH APPLE</a>
								</li>
								<li className="flex">
									<a href="/" className="w-full rounded-2xl mt-5 bg-white hover:bg-gray-100 text-black p-4 font-bold">CONTINUE WITH GOOGLE</a>
								</li>
							</ul>
							<p className="mt-5 flex"><hr className="border-gray-300 mt-5 mb-5 w-2/4 mr-5"/> Or <hr className="border-gray-300 mt-5 mb-5 w-2/4 ml-5"/></p>
							<form onSubmit={this.login}>
								<div className="block mt-3 bg-red-700 p-5 hidden">
									<div className="flex">
										<label htmlFor="">Password Is Wrong</label>
									</div>
								</div>
								<div className="block mt-3">
									<div className="flex">
										<label htmlFor="">Email or Username</label>
									</div>
									<div className="flex text-black">
										<input type="email" placeholder="Email or Username" className="w-full p-2 focus:outline-none focus:ring focus:ring-green-400" />
									</div>
								</div>
								<div className="block mt-3">
									<div className="flex">
										<label htmlFor="">Password</label>
									</div>
									<div className="flex text-black">
										<input type="password" placeholder="Password" className="w-full p-2 focus:outline-none focus:ring focus:ring-green-400" />
									</div>
								</div>
								<div className="block mt-3 text-left hover:underline">
									<Link href="">Forget Password</Link>
								</div>
								<div className="sm:flex mt-7">
									<div className="w-full sm:w-1/2">
										<p className="sm:float-left text-left"><input type="checkbox"  />
										<label htmlFor="" className="ml-2">Remember Me</label></p>
									</div>
									<div className="w-full sm:w-1/2">
										<button type="submit" className="w-full sm:w-1/2 sm:float-right p-4 text-white rounded-2xl bg-green-400 font-bold focus:outline-none focus:ring focus:ring-green-600 mt-4 sm:mt-0">Login</button>
									</div>
								</div>
								<hr className="border-gray-300 mt-5 mb-5 hidden sm:block"/>
								<div className="block mt-3">
									<hr className="border-gray-300 mt-5 mb-5 block sm:hidden"/>
									<h3 className="mb-9 font-bold">Don't have a account?</h3>
									<Link to="/register" className="p-4 font-bold bg-white text-black rounded-2xl text-xl hover:bg-gray-500 hover:text-white">Register To Spotify</Link>
								</div>
							</form>
						</div>
					</div>
				</section>
			</div>
		)
	}
}

export default Login