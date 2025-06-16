export default function Register(){
    return(
        <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                Create Your Account
            </h2>
            <form>
                <div className="mb-5">
                    <label htmlFor="email"
                           className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <input 
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 bg-gray-50 borde border-gray-300 rounded-lg shadow-sm
                                   placeholder-gray-400" 
                        placeholder="you@example.com"/>
                </div>
                <div className="mb-5">
                    <label htmlFor="password"
                           className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input 
                        type="password"
                        id="password"
                        className="w-full px-4 py-2 bg-gray-50 borde border-gray-300 rounded-lg shadow-sm
                                   placeholder-gray-400" 
                        placeholder="*******"/>
                </div>
                <div className="mb-6">
                    <label htmlFor="confirmPassword"
                           className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                    </label>
                    <input 
                        type="password"
                        id="confirmPassword"
                        className="w-full px-4 py-2 bg-gray-50 borde border-gray-300 rounded-lg shadow-sm
                                   placeholder-gray-400" 
                        placeholder="*******"/>
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4
                                rounded-lg transition duration-300">
                    Register
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
                    onClick={() => navigate("/forgot")}
                    className="text-blue-600 hover:underline"
                >
                    Forgot Password?
                </button>
                </div>
            </form>
        </div>
    )
}