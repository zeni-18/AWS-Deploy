import { Link } from "react-router-dom";

export default function ProductCard({ p, user, addToCart, deleteProduct }) {
    return (
        <div
            className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-indigo-100 transition-all duration-300 flex flex-col h-full hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] transform hover:-translate-y-1"
        >
            <div className="relative pt-[110%] overflow-hidden bg-gradient-to-br from-slate-50 to-white">
                <img
                    src={p.image || "https://via.placeholder.com/400x400?text=No+Image"}
                    alt={p.name}
                    className="absolute inset-0 w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-110 mix-blend-multiply"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=No+Image" }}
                />

                {/* Overlay Action */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8 p-4">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 w-full">
                        <Link
                            to={`/product/${p._id}`}
                            className="w-full bg-white text-slate-900 font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
                        >
                            <span>Quick View</span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-3">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{p.category || 'Product'}</span>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors mt-1">
                        <Link to={`/product/${p._id}`}>
                            {p.name}
                        </Link>
                    </h3>
                </div>

                <p className="text-slate-500 text-sm mb-5 line-clamp-2">
                    {p.description}
                </p>

                <div className="mt-auto flex items-center justify-between">
                    <p className="text-2xl font-extrabold text-slate-900">
                        ₹{p.price.toLocaleString()}
                    </p>

                    <div className="flex space-x-2">
                        {(!user || user.role !== 'seller') && (
                            <button
                                onClick={() => addToCart(p)}
                                className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors shadow-md"
                                title="Add to Cart"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </button>
                        )}
                        {user && user.role === 'seller' && (
                            <button
                                onClick={() => deleteProduct(p._id)}
                                className="w-10 h-10 bg-red-50 text-red-500 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                                title="Delete Product"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
