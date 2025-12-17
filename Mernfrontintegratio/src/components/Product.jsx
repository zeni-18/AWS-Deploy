import React, { useEffect, useState } from 'react'
import { API } from "../utils/api";
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function Product({ user, cart, setCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/getproduct`)
      .then(res => res.json())
      .then(allproducts => {
        const product = allproducts.find((p) => p._id === id);
        setProduct(product);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login to add items to your cart!");
      navigate("/login");
      return;
    }
    setCart([...cart, product]);
    alert("Added to cart!");
  };

  const handleBuyNow = (e) => {
    if (!user) {
      e.preventDefault();
      alert("Please login to proceed to buy!");
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Product Not Found</h2>
          <p className="text-slate-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center text-sm font-medium text-slate-500">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <svg className="w-4 h-4 mx-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
          <Link to="/products" className="hover:text-indigo-600 transition-colors">Products</Link>
          <svg className="w-4 h-4 mx-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-slate-800 truncate max-w-xs">{product.name}</span>
        </nav>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Product Image Section */}
            <div className="p-8 lg:p-12 bg-slate-50/50 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-100">
              <div className="w-full max-w-lg aspect-square relative bg-white rounded-2xl shadow-sm p-8 flex items-center justify-center group overflow-hidden">
                <img
                  src={product.image || "https://via.placeholder.com/600x600?text=No+Image"}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 mix-blend-multiply"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/600x600?text=No+Image" }}
                />

                {/* Floating "New" Badge */}
                <div className="absolute top-6 left-6">
                  <span className="px-3 py-1 bg-black text-white text-xs font-bold tracking-wider uppercase rounded-full">New Arrival</span>
                </div>
              </div>

              {/* Optional: Gallery thumbnails could go here */}
              <div className="mt-8 flex gap-4 overflow-x-auto pb-2 w-full max-w-lg justify-center">
                <button className="w-20 h-20 rounded-xl border-2 border-indigo-600 bg-white p-2 shadow-sm">
                  <img
                    src={product.image || "https://via.placeholder.com/150?text=No+Image"}
                    alt="Thumbnail 1"
                    className="w-full h-full object-contain"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=No+Image" }}
                  />
                </button>
                {/* Placeholders for other thumbnails */}
                {[1, 2].map(i => (
                  <button key={i} className="w-20 h-20 rounded-xl border border-slate-200 bg-white p-2 hover:border-slate-300 transition-colors opacity-50 hover:opacity-100">
                    <img
                      src={product.image || "https://via.placeholder.com/150?text=No+Image"}
                      alt={`Thumbnail ${i}`}
                      className="w-full h-full object-contain"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=No+Image" }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details Section */}
            <div className="p-8 lg:p-12 flex flex-col">
              <div className="mb-8">
                <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
                  {product.name}
                </h1>

                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-4xl font-bold text-indigo-600 tracking-tight">
                    ₹{product.price}
                  </span>
                  <div className="h-6 w-px bg-slate-200"></div>
                  <span className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm font-semibold">
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    In Stock
                  </span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-slate-400 ml-2 text-sm">(128 reviews)</span>
                  </div>
                </div>

                <div className="prose prose-slate text-slate-600 mb-8 max-w-none">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">About this item</h3>
                  <p className="leading-relaxed">
                    {product.description || "This premium product features high-quality materials and exceptional craftsmanship. Perfect for daily use, it combines style and functionality seamlessly."}
                  </p>
                </div>

                {/* Features List */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { label: "Material", value: "Premium" },
                    { label: "Warranty", value: "1 Year" },
                    { label: "Shipping", value: "Free Wordwide" },
                    { label: "Returns", value: "30 Days" }
                  ].map((feature, idx) => (
                    <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{feature.label}</p>
                      <p className="text-slate-800 font-medium">{feature.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto space-y-4 pt-6 border-t border-slate-100">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to={`/buynow/${product._id}`}
                    onClick={handleBuyNow}
                    className="flex-1 bg-slate-900 hover:bg-slate-800 text-white text-lg font-bold py-4 px-8 rounded-xl text-center transition-all duration-200 shadow-xl shadow-slate-200 hover:shadow-2xl hover:-translate-y-0.5 flex items-center justify-center"
                  >
                    <span>Buy Now</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-lg font-bold py-4 px-8 rounded-xl transition-colors duration-200 border border-indigo-100 flex items-center justify-center group"
                  >
                    <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to Cart
                  </button>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-4">
                    <span className="flex items-center"><svg className="w-4 h-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Secure Checkout</span>
                    <span className="flex items-center"><svg className="w-4 h-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> SSL Encrypted</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}