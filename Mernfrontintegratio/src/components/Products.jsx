import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { API } from "../utils/api";

export default function Products({ setCart, cart, user }) {
  const [products, setProducts] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/api/getproduct`)
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  const addToCart = (item) => {
    if (!user) {
      alert("Please login to add items to your cart!");
      navigate("/login");
      return;
    }
    setCart([...cart, item]);
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    const res = await fetch(`http://localhost:5000/api/deleteProduct/${id}`, {
      method: "DELETE",
    });

    if (res.status === 204) {
      alert("Product deleted successfully");
      setProducts(products.filter(p => p._id !== id));
    } else {
      alert("Error deleting product");
    }
  };

  const categories = [
    { name: "Electronics", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=500&q=60" }, // Smartwatch image as safer bet
    { name: "Fashion", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=500&q=60" },
    { name: "Home & Living", image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=500&q=60" },
    { name: "Sports", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=500&q=60" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-30"
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80"
            alt="Shop Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>
        <div className="relative container mx-auto px-4 py-24 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Discover Quality <br />
              <span className="text-indigo-500">Premium Products</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Shop the latest trends in electronics, fashion, and home essentials. Experience seamless shopping with fast delivery and exceptional support.
            </p>
            <div className="flex gap-4">
              <a href="#products" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg">
                Shop Now
              </a>
              <a href="#categories" className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm font-bold py-4 px-8 rounded-full transition-all border border-white/20">
                Explore Categories
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section id="categories" className="py-16 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Shop by Category</h2>
          <p className="text-slate-500 mt-2">Explore our wide range of collections</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div key={idx} className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all">
              <div className="aspect-[4/5] bg-slate-200">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <h3 className="text-white font-bold text-xl">{cat.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <div id="products" className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-4 tracking-tight">Featured Collection</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Discover our handpicked selection of premium products designed for quality and style.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl shadow-sm border border-slate-100">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No products found</h3>
            <p className="text-slate-500 text-center max-w-md">
              We couldn't find any products at the moment. Please check back later or contact support.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map(p => (
              <div
                key={p._id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full transform hover:-translate-y-1"
              >
                <div className="relative pt-[100%] overflow-hidden bg-slate-50">
                  <img
                    src={p.image || "https://via.placeholder.com/400x400?text=No+Image"}
                    alt={p.name}
                    className="absolute inset-0 w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110 mix-blend-multiply"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=No+Image" }}
                  />

                  {/* Overlay Button */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <Link
                        to={`/product/${p._id}`}
                        className="bg-white/90 backdrop-blur-sm text-slate-900 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-white transition-colors flex items-center space-x-2"
                      >
                        <span>View Details</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link>
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      New
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                      <Link to={`/product/${p._id}`}>
                        {p.name}
                      </Link>
                    </h3>
                  </div>

                  <p className="text-slate-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {p.description || "Experience premium quality with our latest collection."}
                  </p>

                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-2xl font-bold text-slate-900">
                      ₹{p.price}
                    </p>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => addToCart(p)}
                        className="p-3 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                        title="Add to Cart"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => deleteProduct(p._id)}
                        className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                        title="Delete Product"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Trust Badges */}
      <section className="bg-white border-t border-slate-100 py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {[
            { title: "Free Shipping", desc: "On all orders over ₹999", icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" },
            { title: "Secure Payment", desc: "100% secure payment", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
            { title: "24/7 Support", desc: "Dedicated support", icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" },
            { title: "Money Back", desc: "30 day return policy", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} /></svg>
              </div>
              <h3 className="font-bold text-slate-800">{item.title}</h3>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}