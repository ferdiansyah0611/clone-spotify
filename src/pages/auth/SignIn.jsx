import { Link } from "react-router-dom";

export default function SignIn() {
	return (
		<div>
			<section>
				<h3 className="text-center font-bold">To continue, login to Spotify.</h3>
				<div className="flex text-center">
					<div className="w-full sm:w-2/3 md:w-1/2 mx-auto">
						<ul className="block">
							<li className="flex">
								<a href="/" className="w-full rounded-2xl mt-5 bg-blue-900 hover:bg-blue-800 text-white p-4 font-bold">
									CONTINUE WITH FACEBOOK
								</a>
							</li>
							<li className="flex">
								<a href="/" className="w-full rounded-2xl mt-5 bg-black hover:bg-gray-900 text-white p-4 font-bold">
									CONTINUE WITH APPLE
								</a>
							</li>
							<li className="flex">
								<a href="/" className="w-full rounded-2xl mt-5 bg-white hover:bg-gray-100 text-black p-4 font-bold">
									CONTINUE WITH GOOGLE
								</a>
							</li>
						</ul>
						<div className="flex space-x-2 items-center mt-5">
							<span className="bg-zinc-400 flex-1" style={{height: 2}}></span>
							<p>OR</p>
							<span className="bg-zinc-400 flex-1" style={{height: 2}}></span>
						</div>
						<form className="flex flex-col gap-3">
							<div className="bg-red-700 p-5 hidden">
								<div className="flex">
									<label htmlFor="">Password Is Wrong</label>
								</div>
							</div>
							<div>
								<div className="flex">
									<label htmlFor="email">Email or Username</label>
								</div>
								<div className="flex text-black">
									<input
										type="email"
										placeholder="Email or Username"
										className="w-full text-white p-2 focus:outline-none focus:ring focus:ring-green-400"
										id="email"
									/>
								</div>
							</div>
							<div>
								<div className="flex">
									<label htmlFor="password">Password</label>
								</div>
								<div className="flex text-black">
									<input
										type="password"
										placeholder="Password"
										className="w-full text-white p-2 focus:outline-none focus:ring focus:ring-green-400"
										id="password"
									/>
								</div>
							</div>
							<div className="block text-left hover:underline">
								<Link to="/">Forget Password</Link>
							</div>
							<div className="flex items-center">
								<div className="w-full sm:w-1/2">
									<p className="text-left">
										<input id="remember" type="checkbox" />
										<label htmlFor="remember" className="ml-2">
											Remember Me
										</label>
									</p>
								</div>
								<div className="w-full sm:w-1/2">
									<button
										type="submit"
										className="w-full sm:w-1/2 sm:float-right p-4 text-white rounded-2xl bg-green-400 font-bold focus:outline-none focus:ring focus:ring-green-600 mt-4 sm:mt-0"
									>
										Login
									</button>
								</div>
							</div>
							<hr className="border-zinc-400 hidden sm:block" />
							<div className="block my-3">
								<hr className="border-gray-300 mt-5 mb-5 block sm:hidden" />
								<h3 className="mb-9 font-bold">Don't have a account?</h3>
								<Link
									to="/signup"
									className="p-4 font-bold bg-white text-black rounded-2xl text-xl hover:bg-zinc-500 hover:text-white"
								>
									Register To Spotify
								</Link>
							</div>
						</form>
					</div>
				</div>
			</section>
		</div>
	);
}
