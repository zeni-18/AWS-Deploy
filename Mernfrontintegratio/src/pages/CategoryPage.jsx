import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { API } from "../utils/api";
import ProductCard from "../components/ProductCard";
import { fallbackProducts } from "../utils/data";

export default function CategoryPage({ setCart, cart, user }) {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    // Capitalize category for display
    const displayCategory = category ? category.charAt(0).toUpperCase() + category.slice(1) : "Collection";

    useEffect(() => {
        setLoading(true);
        let url = `${API}/api/getproduct?category=${category}`;

        fetch(url)
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch");
                return res.json();
            })
            .then(data => {
                if (data.length === 0) {
                    console.warn("Backend returned empty, using fallback data");
                    const filtered = fallbackProducts.filter(p =>
                        p.category.toLowerCase() === category.toLowerCase()
                    );
                    setProducts(filtered);
                } else {
                    setProducts(data);
                }
                setLoading(false);
            })
            .catch(err => {
                console.warn("Backend offline or empty, using fallback data");
                // Filter fallback products by category
                const filtered = fallbackProducts.filter(p =>
                    p.category.toLowerCase() === category.toLowerCase()
                );
                setProducts(filtered);
                setLoading(false);
            })
    }, [category]);

    const addToCart = (item) => {
        if (!user) {
            alert("Please login to add items to your cart!");
            navigate("/login");
            return;
        }
        setCart([...cart, item]);
    };

    const deleteProduct = async (id) => {
        // Re-implement or pass request to parent? 
        // Simplified: Just alert for now since mainly buyers use this page.
        alert("Delete not supported on category page");
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Simple Hero for Category */}
            <div className="relative bg-indigo-900 py-16 px-4">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-indigo-700/50 blur-3xl"></div>
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-purple-700/50 blur-3xl"></div>
                </div>

                <div className="relative container mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                        {displayCategory}
                    </h1>
                    <div className="w-24 h-1 bg-pink-500 mx-auto rounded-full mb-6"></div>
                    <p className="text-indigo-100 max-w-2xl mx-auto text-lg">
                        Explore our premium collection of {displayCategory.toLowerCase()}.
                    </p>

                    {/* Breadcrumb */}
                    <div className="mt-8 flex justify-center space-x-2 text-sm text-indigo-300">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-white">{displayCategory}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-100">
                        <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">No products found</h3>
                        <p className="text-slate-500 mb-8">We couldn't find any products in this category.</p>
                        <Link to="/" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                            Browse All Products
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map(p => (
                            <ProductCard key={p._id} p={p} user={user} addToCart={addToCart} deleteProduct={deleteProduct} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
