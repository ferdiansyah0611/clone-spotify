import { Link } from "react-router-dom";

export default function SignUp() {
	return (
		<div className="flex text-center items-center justify-center">
			<section className="auth">
				<h3>To continue, login to Spotify.</h3>
				<div>
					<form className="flex flex-col gap-3">
						<div>
							<div className="flex">
								<label htmlFor="username">Username</label>
							</div>
							<div className="flex text-black">
								<input
									type="username"
									placeholder="Username"
									className="input"
									id="username"
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
						<div>
							<div className="flex">
								<label htmlFor="confirm_password">Confirm Password</label>
							</div>
							<div className="flex text-black">
								<input
									type="password"
									placeholder="Confirm Password"
									className="input"
									id="confirm_password"
								/>
							</div>
						</div>
						<div>
							<div className="flex">
								<label htmlFor="email">E-mail</label>
							</div>
							<div className="flex text-black">
								<input
									type="email"
									placeholder="E-mail"
									className="input"
									id="email"
								/>
							</div>
						</div>
						<div className="flex items-center justify-center">
							<div>
								<button
									type="submit"
									className="btn-submit"
								>
									Sign Up
								</button>
							</div>
						</div>
						<hr className="border-zinc-600 hidden sm:block" />
						<div className="mt-3">
							<hr className="border-gray-300 mt-5 mb-5 block sm:hidden" />
							<div className="flex flex-col space-y-2">
								<h3 className="mb-9 font-bold">Have a account?</h3>
								<Link
									to="/signin"
									className="btn-signup"
								>
									Sign In To Spotify
								</Link>
							</div>
						</div>
					</form>
				</div>
			</section>
		</div>
	);
}
