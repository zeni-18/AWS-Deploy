import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { API } from "../utils/api";
import ProductCard from "./ProductCard";
import { fallbackProducts } from "../utils/data";

export default function Products({ setCart, cart, user }) {
  const [products, setProducts] = useState([])
  const navigate = useNavigate();



  useEffect(() => {
    let url = `${API}/api/getproduct`;
    if (user && user.role === 'seller' && user.id) {
      url += `?seller=${user.id}`;
    }

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(data => setProducts(data))
      .catch(err => {
        console.warn("Backend offline, using fallback data");
        // Only use fallback for Buyers, not sellers (sellers need their own real data)
        if (!user || user.role !== 'seller') {
          setProducts(fallbackProducts);
        } else {
          setProducts([]);
        }
      })
  }, [user])

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

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/deleteProduct/${id}`, {
        method: "DELETE",
        headers: {
          'x-auth-token': token
        }
      });

      if (res.status === 204) {
        alert("Product deleted successfully");
        setProducts(products.filter(p => p._id !== id));
      } else {
        alert("Error deleting product");
      }
    } catch (e) {
      alert("Cannot delete product: Backend offline");
    }
  };

  const categories = [
    { name: "Electronics", image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=500&q=80" },
    { name: "Fashion", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=500&q=80" },
    { name: "Home & Living", image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=500&q=80" },
    { name: "Sports", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=500&q=80" },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section - Redesigned Light Theme */}
      <div className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-indigo-200/30 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-pink-200/30 blur-3xl"></div>

        <div className="relative container mx-auto px-4 py-32 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10">
          <span className="text-indigo-600 font-bold tracking-wider uppercase mb-4 py-1 px-3 bg-indigo-50 rounded-full border border-indigo-100 text-sm animate-pulse">
            Welcome to ShopEasy
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
            Elevate Your <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              Lifestyle Today
            </span>
          </h1>
          <p className="max-w-2xl text-xl text-slate-600 mb-10 leading-relaxed">
            {user && user.role === 'seller'
              ? 'Manage your store with powerful tools and analytics.'
              : 'Discover a curated collection of premium products across electronics, fashion, and more.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#products" className="bg-white border-2 border-indigo-600 text-indigo-700 font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl hover:bg-indigo-50">
              {user && user.role === 'seller' ? 'View Inventory' : 'Start Shopping'}
            </a>
            {(!user || user.role !== 'seller') && (
              <a href="#categories" className="bg-white hover:bg-slate-50 text-slate-900 font-bold py-4 px-10 rounded-full transition-all border border-slate-200 shadow-md hover:shadow-lg">
                Browse Categories
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Categories Section - Only for Buyers */}
      {(!user || user.role !== 'seller') && (
        <section id="categories" className="py-20 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Curated Collections</h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {categories.map((cat, idx) => (
              <Link key={idx} to={`/category/${cat.name.toLowerCase()}`}>
                <div className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="aspect-[3/4] bg-slate-200">
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                    <div className="text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-xs font-bold uppercase tracking-wider mb-1 text-indigo-300">Shop</p>
                      <h3 className="font-bold text-2xl">{cat.name}</h3>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Product Sections - Different View for Buyers vs Seller */}
      <div id="products" className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-20">

        {/* SELLER VIEW: Single List */}
        {user && user.role === 'seller' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-800 mb-4 tracking-tight">Seller Dashboard</h2>
            </div>
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Your inventory is empty</h3>
                <p className="text-slate-500 text-center max-w-md mb-8">Start building your catalog today.</p>
                <Link to="/addproduct" className="px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-indigo-500/30">
                  Add New Product
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map(p => (
                  <ProductCard key={p._id} p={p} user={user} addToCart={addToCart} deleteProduct={deleteProduct} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* BUYER VIEW: Categorized Sections */}
        {(!user || user.role !== 'seller') && (
          <>
            {/* Product listings removed from home page for buyers as per request. 
                Only Category Cards are shown above. 
            */}
          </>
        )}
      </div>

    </div>
  )
}
