import { useState } from "react";
import { Link } from "react-router-dom";

export default function Cart({ cart, setCart }) {
  const [quantityMap, setQuantityMap] = useState(
    cart.reduce((acc, item) => ({ ...acc, [item._id]: 1 }), {})
  );

  const removeItem = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setQuantityMap(prev => ({ ...prev, [id]: newQuantity }));
  };

  const clearCart = () => {
    if (cart.length === 0) return;
    if (window.confirm("Are you sure you want to clear your cart?")) {
      setCart([]);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const quantity = quantityMap[item._id] || 1;
      return total + (item.price * quantity);
    }, 0);
  };

  const calculateItemTotal = (item) => {
    const quantity = quantityMap[item._id] || 1;
    return item.price * quantity;
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-50 px-4">
        <div className="text-center max-w-lg mx-auto">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-white rounded-full mb-8 shadow-sm">
            <svg className="w-16 h-16 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Your cart is empty</h2>
          <p className="text-slate-500 mb-8 text-lg">
            Looks like you haven't added any items to your cart yet. Discover our premium collection today.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-8 py-4 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Shopping Cart</h1>
        <p className="text-slate-500 mb-8 text-lg">Review your premium selection ({cart.length} items)</p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-6">
            {cart.map((item) => (
              <div key={item._id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center gap-6 transition-all hover:shadow-md">
                <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-slate-50 rounded-xl overflow-hidden p-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>

                <div className="flex-1 text-center sm:text-left w-full">
                  <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">{item.name}</h3>
                      <p className="text-slate-500 text-sm">{item.category || "Premium Category"}</p>
                    </div>
                    <p className="text-2xl font-bold text-slate-900 mt-2 sm:mt-0">₹{item.price}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center bg-slate-50 rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item._id, (quantityMap[item._id] || 1) - 1)}
                        className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-white rounded transition-all shadow-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="w-12 text-center font-bold text-slate-900">{quantityMap[item._id] || 1}</span>
                      <button
                        onClick={() => updateQuantity(item._id, (quantityMap[item._id] || 1) + 1)}
                        className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-white rounded transition-all shadow-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center gap-6">
                      <p className="font-bold text-indigo-600 text-lg">Total: ₹{calculateItemTotal(item)}</p>
                      <button
                        onClick={() => removeItem(item._id)}
                        className="text-red-400 hover:text-red-600 text-sm font-medium transition-colors flex items-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-6">
              <Link to="/" className="text-slate-500 hover:text-indigo-600 font-medium flex items-center group">
                <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Continue Shopping
              </Link>
              <button onClick={clearCart} className="text-slate-400 hover:text-red-500 text-sm font-medium transition-colors">
                Clear Shopping Cart
              </button>
            </div>
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-24 border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Order Summary</h3>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-medium">₹{calculateTotal()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping Estimate</span>
                  <span className="font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded text-sm">Free</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tax Estimate</span>
                  <span className="font-medium">₹{(calculateTotal() * 0.18).toFixed(2)}</span>
                </div>

                <div className="border-t border-slate-100 pt-4 flex justify-between items-end">
                  <span className="text-lg font-bold text-slate-900">Order Total</span>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-slate-900">₹{(calculateTotal() * 1.18).toFixed(2)}</span>
                    <p className="text-xs text-slate-400 mt-1">Including all taxes</p>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full block bg-slate-900 text-white font-bold py-4 rounded-xl text-center text-lg hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 mb-6"
              >
                Checkout Now
              </Link>

              <div className="bg-slate-50 rounded-xl p-4 mb-6">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="font-bold text-slate-800 text-sm">Instant Delivery</span>
                </div>
                <p className="text-xs text-slate-500">Get your digital assets delivered to your email instantly after payment.</p>
              </div>

              <div className="flex justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
                {/* Payment Icons Placeholder */}
                <div className="h-8 w-12 bg-slate-200 rounded"></div>
                <div className="h-8 w-12 bg-slate-200 rounded"></div>
                <div className="h-8 w-12 bg-slate-200 rounded"></div>
                <div className="h-8 w-12 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}