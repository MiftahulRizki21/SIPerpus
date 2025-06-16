export default function Forgot(){
    return(
        <div>
            <h2 className="text-2xl fon-semibold text-gray-700 mb-2 text-center">
                Forgot Your Password?
            </h2>
            <p className="text-sm text-gray-500 mb-6 text-center">
                Enter your email address and we`ll send you a link to reset
                your password.
            </p>

            <form>
            <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <input 
                        type="text"
                        id="email"
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-mb
                                    placeholder-gray-400"
                        placeholder="you@example.com" />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input 
                    type="password"
                    id="password" 
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                                placeholder-gray-400"
                    placeholder="********"/>
                </div>               
            </form>
            <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4
                            rounded-lg transition duration-300">
                Send Reset Link
            </button>
            <div className="flex justify-between mt-4 text-sm">
            <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:underline"
            >
                Login
            </button>
            <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-blue-600 hover:underline"
            >
                Register
            </button>
        </div>
        </div>
    )
}