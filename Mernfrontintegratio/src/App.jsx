import { Link, Route, Routes, useLocation } from "react-router-dom";
import Products from "./components/Products";
import Product from "./components/Product";
import { useEffect, useState } from "react";
import Cart from "./components/Cart";
import BuyNow from "./components/BuyNow";
import Login from "./components/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import AddProducts from "./components/AddProducts";
import Signup from "./components/Signup";
import CategoryPage from "./pages/CategoryPage";

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        setUser(savedUser); // Fallback for legacy plain text user
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    // Close mobile menu on route change
    setIsMenuOpen(false);
  }, [location]);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  const totalCartItems = cart.reduce((total, item) => {
    const quantity = item.quantity || 1;
    return total + quantity;
  }, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center group">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-md transform group-hover:scale-105 transition-transform duration-200">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-indigo-700 to-violet-700 bg-clip-text text-transparent tracking-tight">
                  ShopEasy
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location.pathname === "/"
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
                  }`}
              >
                Home
              </Link>
              <Link
                to="/products"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location.pathname === "/products"
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
                  }`}
              >
                Products
              </Link>
              {user && user.role === 'seller' && (
                <Link
                  to="/addproduct"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location.pathname === "/addproduct"
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
                    }`}
                >
                  Add Product
                </Link>
              )}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
              {/* Cart - Only for Buyers or Guests */}
              {(!user || user.role !== 'seller') && (
                <Link
                  to="/cart"
                  className="relative p-2 text-slate-500 hover:text-indigo-600 transition-colors rounded-full hover:bg-slate-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {totalCartItems > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                      {totalCartItems}
                    </span>
                  )}
                </Link>
              )}

              {/* User Actions */}
              <div className="relative ml-4">
                {user ? (
                  <div className="flex items-center space-x-3">
                    <div className="hidden md:flex items-center pl-4 border-l border-slate-200">
                      <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm ring-1 ring-slate-100">
                        <span className="text-indigo-700 font-bold text-sm">
                          {(user.name || user.email || user).charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="ml-2 text-slate-700 font-semibold text-sm hidden lg:block">{user.name || user.email || user}</span>
                    </div>
                    <button
                      onClick={logout}
                      className="hidden md:inline-flex items-center px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="hidden md:inline-flex items-center px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                  >
                    Login
                  </Link>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition-colors"
              >
                {isMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-slate-100 py-4 absolute top-20 left-0 w-full bg-white shadow-xl rounded-b-2xl z-50">
              <div className="flex flex-col space-y-2 px-4">
                <Link
                  to="/"
                  className={`font-medium py-3 px-4 rounded-xl transition-colors ${location.pathname === "/"
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-slate-600 hover:bg-slate-50"
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  className={`font-medium py-3 px-4 rounded-xl transition-colors ${location.pathname === "/products"
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-slate-600 hover:bg-slate-50"
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
                <Link
                  to="/addproduct"
                  className={`font-medium py-3 px-4 rounded-xl transition-colors ${location.pathname === "/addproduct"
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-slate-600 hover:bg-slate-50"
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Add Product
                </Link>
                <Link
                  to="/cart"
                  className={`font-medium py-3 px-4 rounded-xl transition-colors ${location.pathname === "/cart"
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-slate-600 hover:bg-slate-50"
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cart ({totalCartItems})
                </Link>
                {user ? (
                  <>
                    <div className="flex items-center py-3 px-4 border-t border-slate-100 mt-2 pt-4">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-indigo-700 font-bold text-sm">
                          {(user.name || user.email || user).charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="ml-3 text-slate-700 font-semibold">{user.name || user.email || user}</span>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="font-medium py-3 px-4 text-red-600 hover:bg-red-50 rounded-xl transition-colors text-left w-full mt-1"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="font-medium py-3 px-6 bg-indigo-600 text-white rounded-xl text-center hover:bg-indigo-700 transition-colors mt-4 shadow-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Products cart={cart} setCart={setCart} user={user} />} />
          <Route path="/products" element={<Products cart={cart} setCart={setCart} user={user} />} />
          <Route path="/category/:category" element={<CategoryPage cart={cart} setCart={setCart} user={user} />} />
          <Route path="/product/:id" element={<Product user={user} cart={cart} setCart={setCart} />} />
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart cart={cart} setCart={setCart} />
            </ProtectedRoute>
          } />
          <Route path="/addproduct" element={
            <ProtectedRoute>
              <AddProducts />
            </ProtectedRoute>
          } />
          <Route path="/buynow/:id" element={
            <ProtectedRoute>
              <BuyNow />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <span className="ml-3 text-2xl font-bold text-white tracking-tight">ShopEasy</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-sm">
                Your premium destination for quality shopping. Experience excellence with every purchase, backed by our commitment to customer satisfaction.
              </p>
              <div className="flex space-x-4">
                {/* Social Icons - enhanced */}
                {[
                  { icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z", label: "Facebook" },
                  { icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z", label: "Twitter" },
                  { icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z", label: "LinkedIn" }
                ].map((social, index) => (
                  <a key={index} href="#" className="w-10 h-10 bg-slate-800 hover:bg-indigo-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1">
                    <svg className="w-5 h-5 fill-current text-slate-300 hover:text-white" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white text-lg font-bold mb-6 tracking-wide">Quick Links</h3>
              <ul className="space-y-3">
                {['Home', 'Products', 'Shopping Cart'].map((link, index) => (
                  <li key={index}>
                    <Link to={link === 'Shopping Cart' ? '/cart' : link === 'Home' ? '/' : `/${link.toLowerCase()}`} className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center text-sm group">
                      <span className="w-0 group-hover:w-2 h-0.5 bg-indigo-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      {link}
                    </Link>
                  </li>
                ))}
                <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">Terms of Service</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white text-lg font-bold mb-6 tracking-wide">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center mt-0.5 text-indigo-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <span className="ml-3 text-slate-400 text-sm leading-relaxed">123 Commerce St,<br />Mumbai, India</span>
                </li>
                <li className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-indigo-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <span className="ml-3 text-slate-400 text-sm">+91 1800-123-4567</span>
                </li>
                <li className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-indigo-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <span className="ml-3 text-slate-400 text-sm">support@shopeasy.com</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-white text-lg font-bold mb-6 tracking-wide">Stay Updated</h3>
              <p className="text-slate-400 mb-4 text-sm">Subscribe for exclusive offers and new arrivals.</p>
              <div className="flex relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-200 placeholder-slate-500 text-sm transition-all"
                />
                <button className="absolute right-1 top-1 bottom-1 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md transition-colors shadow-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-slate-800 text-center">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} ShopEasy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
