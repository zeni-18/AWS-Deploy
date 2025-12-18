import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "buyer" // Default to buyer
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            // Automatically login or redirect to login
            navigate("/login");
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl"></div>
                <div className="absolute top-40 -left-40 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"></div>
            </div>

            <div className="max-w-md w-full space-y-8 relative z-10">
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-white/50 p-8 sm:p-12">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                            Create Account
                        </h2>
                        <p className="text-slate-500">
                            Join us as a Buyer or Seller
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSignup} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                placeholder="Create a password"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">I want to...</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, role: 'buyer' })}
                                    className={`py-3 px-4 rounded-xl font-medium transition-all ${formData.role === 'buyer'
                                            ? 'bg-indigo-600 text-white shadow-lg'
                                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    Buy Products
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, role: 'seller' })}
                                    className={`py-3 px-4 rounded-xl font-medium transition-all ${formData.role === 'seller'
                                            ? 'bg-indigo-600 text-white shadow-lg'
                                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    Sell Products
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 px-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg disabled:opacity-70"
                        >
                            {isLoading ? "Creating Account..." : "Sign Up"}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-slate-500">
                        Already have an account?{" "}
                        <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
