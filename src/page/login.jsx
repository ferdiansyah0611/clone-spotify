import React from "react"
import {
  Link
} from "react-router-dom"

class Login extends React.Component{
	render()
	{
		return(
			<div>
				<section>
					<h3 className="text-center font-bold">Untuk melanjutkan, masuk ke Spotify.</h3>
					<div className="flex text-center">
						<div className="w-1/2 mx-auto">
							<ul className="block">
								<li className="flex"><a href="#" className="w-full rounded-2xl mt-5 bg-blue-900 hover:bg-blue-800 text-white p-4 font-bold">CONTINUE WITH FACEBOOK</a></li>
								<li className="flex"><a href="#" className="w-full rounded-2xl mt-5 bg-black hover:bg-gray-900 text-white p-4 font-bold">CONTINUE WITH APPLE</a></li>
								<li className="flex"><a href="#" className="w-full rounded-2xl mt-5 bg-white hover:bg-gray-100 text-black p-4 font-bold">CONTINUE WITH GOOGLE</a></li>
							</ul>
							<p className="mt-5 flex"><hr className="border-gray-300 mt-5 mb-5 w-2/4 mr-5"/> Or <hr className="border-gray-300 mt-5 mb-5 w-2/4 ml-5"/></p>
							<form action="">
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
										<input type="email" placeholder="Password" className="w-full p-2 focus:outline-none focus:ring focus:ring-green-400" />
									</div>
								</div>
								<div className="block mt-3 text-left hover:underline">
									<a href="">Forget Password ?</a>
								</div>
								<div className="flex mt-7">
									<div className="w-1/2">
										<p className="float-left"><input type="checkbox"  />
										<label htmlFor="" className="ml-2">Remember Me ?</label></p>
									</div>
									<div className="w-1/2">
										<button type="button" className="w-1/2 float-right p-4 text-white rounded-2xl bg-green-400 font-bold focus:outline-none focus:ring focus:ring-green-600">Login</button>
									</div>
								</div>
								<hr className="border-gray-300 mt-5 mb-5"/>
								<div className="block mt-3">
									<h3 className="mb-9 font-bold">Don't have a account?</h3>
									<Link to="/register" className="p-4 font-bold bg-white text-black rounded-2xl text-xl">Register To Spotify</Link>
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