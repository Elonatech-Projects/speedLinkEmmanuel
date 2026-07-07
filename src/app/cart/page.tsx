"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

interface CartItem {
  _id: string;
  course: {
    _id: string;
    title: string;
    description: string;
    price: number;
    duration: string;
    category: string;
    image: string;
  };
}

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<string | null>(null);
  const [checkingOut, setCheckingOut] = useState(false);
  const [clearing, setClearing] = useState(false);

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      setCartItems(res.data.cartItems);
      setTotal(res.data.total);
    } catch {
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeFromCart = async (cartId: string) => {
    setRemoving(cartId);
    try {
      await api.delete(`/cart/${cartId}`);
      await fetchCart();
      window.dispatchEvent(new Event("cartUpdate"));
    } catch {
      alert("Failed to remove item");
    } finally {
      setRemoving(null);
    }
  };

  const clearCart = async () => {
    if (!confirm("Remove all items from cart?")) return;
    setClearing(true);
    try {
      await Promise.all(cartItems.map((item) => api.delete(`/cart/${item._id}`)));
      await fetchCart();
      window.dispatchEvent(new Event("cartUpdate"));
    } catch {
      alert("Failed to clear cart");
    } finally {
      setClearing(false);
    }
  };

  const checkoutAll = async () => {
    setCheckingOut(true);
    try {
      const res = await api.post("/payment/initialize-cart");
      window.location.href = res.data.authorization_url;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      alert(error.response?.data?.message || "Checkout failed. Make sure your Paystack key is set.");
    } finally {
      setCheckingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#404297]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0a1628] text-white py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-gray-400">
            {cartItems.length} course{cartItems.length !== 1 ? "s" : ""} in your cart
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Start learning by adding courses to your cart</p>
            <Link
              href="/courses"
              className="inline-block bg-[#404297] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#EE3539] transition-colors"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-4 mb-8">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-sm p-4 flex gap-4 items-center"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.course.image}
                    alt={item.course.title}
                    className="w-32 h-24 object-cover rounded-lg shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-lg mb-1 truncate">{item.course.title}</h3>
                    <p className="text-gray-500 text-sm mb-1">{item.course.category}</p>
                    <p className="text-gray-400 text-sm">{item.course.duration}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[#404297] font-bold text-xl mb-2">
                      &#x20A6;{item.course.price.toLocaleString()}
                    </p>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      disabled={removing === item._id}
                      className="text-red-500 text-xs font-medium hover:underline disabled:opacity-50"
                    >
                      {removing === item._id ? "Removing..." : "Remove"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-2 mb-4 text-sm text-gray-600">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex justify-between">
                    <span className="truncate mr-4">{item.course.title}</span>
                    <span className="shrink-0 font-medium">&#x20A6;{item.course.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 flex justify-between items-center mb-6">
                <span className="text-gray-700 font-semibold text-lg">Total</span>
                <span className="text-2xl font-bold text-[#404297]">
                  &#x20A6;{total.toLocaleString()}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={checkoutAll}
                  disabled={checkingOut}
                  className="flex-1 bg-[#404297] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#EE3539] transition-colors disabled:opacity-60"
                >
                  {checkingOut ? "Redirecting to Paystack..." : `Checkout All (${cartItems.length} course${cartItems.length !== 1 ? "s" : ""})`}
                </button>
                <button
                  onClick={clearCart}
                  disabled={clearing}
                  className="border border-red-300 text-red-500 font-semibold px-6 py-3 rounded-full hover:bg-red-50 transition-colors disabled:opacity-50"
                >
                  {clearing ? "Clearing..." : "Clear Cart"}
                </button>
                <Link
                  href="/courses"
                  className="border border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-50 transition-colors text-center"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
