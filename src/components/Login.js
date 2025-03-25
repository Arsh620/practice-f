import React, { useState } from "react";
import api from "../services/api"; // Import API functions
import { useNavigate } from "react-router-dom"; // For redirecting after login
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";  // Import Toastify styles

const Login = () => {
    const navigate = useNavigate(); // Redirect function

    // State for login credentials
    const [credentials, setCredentials] = useState({
        email: localStorage.getItem("rememberedEmail") || "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(localStorage.getItem("rememberedEmail") ? true : false);

    // Handle input changes
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    // Handle Remember Me toggle
    const handleRememberMe = (e) => {
        setRememberMe(e.target.checked);
    };

    // Handle form submission
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.login(credentials);
            console.log("API Response:", response);

            if (response.status) {
                toast.success("✅ Login successful!");

                localStorage.setItem("token", response.metaData.token);
                localStorage.setItem("user", response.metaData.user);

                if (rememberMe) {
                    localStorage.setItem("rememberedEmail", credentials.email);
                } else {
                    localStorage.removeItem("rememberedEmail");
                }

                navigate("/dashboard");
            } else {
                toast.error(`❌ Error: ${response.message}`);
            }
        } catch (error) {
            toast.error("❌ Network error, please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-[-30px] sm:mt-[-50px]">
                <div className="w-full bg-white border border-gray-300 rounded-lg shadow-lg sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>

                        <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Your email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={credentials.email}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="name@company.com"
                                    required
                                    disabled={loading}
                                    aria-label="Enter your email"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    required
                                    disabled={loading}
                                    aria-label="Enter your password"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <input
                                        id="remember"
                                        type="checkbox"
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                                        checked={rememberMe}
                                        onChange={handleRememberMe}
                                    />
                                    <label htmlFor="remember" className="ml-3 text-sm text-gray-500 dark:text-gray-300">
                                        Remember me
                                    </label>
                                </div>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                                    Forgot password?
                                </a>
                            </div>

                            <button
                                type="submit"
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700"
                                disabled={loading}
                            >
                                {loading ? "Signing in..." : "Sign in"}
                            </button>

                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet?{" "}
                                <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                    Sign up
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            {/* Toast Notification Container */}
            <ToastContainer position="top-right" autoClose={3000} />
        </section>
    );
};

export default Login;
