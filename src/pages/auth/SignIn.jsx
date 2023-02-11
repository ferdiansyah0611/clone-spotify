import { Link } from "react-router-dom";

export default function SignIn() {
	return (
		<div className="flex text-center items-center justify-center">
			<section className="auth">
				<h3>To continue, login to Spotify.</h3>
				<div>
					<div className="api">
						<a href="/" className="btn-facebook">
							CONTINUE WITH FACEBOOK
						</a>
						<a href="/" className="btn-apple">
							CONTINUE WITH APPLE
						</a>
						<a href="/" className="btn-google">
							CONTINUE WITH GOOGLE
						</a>
					</div>
					<div className="divider-or">
						<span></span>
						<p>OR</p>
						<span></span>
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
									className="input"
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
									className="input"
									id="password"
								/>
							</div>
						</div>
						<div className="block text-left">
							<Link to="/" className="hover:underline">Forget Password</Link>
						</div>
						<div className="flex items-center">
							<div className="flex-1">
								<p className="text-left">
									<input id="remember" type="checkbox" />
									<label htmlFor="remember" className="ml-2">
										Remember Me
									</label>
								</p>
							</div>
							<div>
								<button
									type="submit"
									className="btn-submit"
								>
									Sign In
								</button>
							</div>
						</div>
						<hr className="border-zinc-600 hidden sm:block" />
						<div className="mt-3">
							<hr className="border-gray-300 mt-5 mb-5 block sm:hidden" />
							<div className="flex flex-col space-y-2">
								<h3 className="mb-9 font-bold">Don't have a account?</h3>
								<Link
									to="/signup"
									className="btn-signup"
								>
									Register To Spotify
								</Link>
							</div>
						</div>
					</form>
				</div>
			</section>
		</div>
	);
}
