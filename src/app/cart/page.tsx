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
  const [payingId, setPayingId] = useState<string | null>(null);

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

  const handlePayment = async (courseId: string) => {
    setPayingId(courseId);
    try {
      const res = await api.post("/payment/initialize", { courseId });
      // Redirect to Paystack payment page
      window.location.href = res.data.authorization_url;
    } catch (err: any) {
      alert(err.response?.data?.message || "Payment initialization failed. Check your Paystack key.");
    } finally {
      setPayingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
              className="inline-block bg-blue-700 text-white font-semibold px-8 py-3 rounded-full hover:bg-blue-800 transition-colors"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items — each has its own Pay button */}
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
                    className="w-32 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{item.course.title}</h3>
                    <p className="text-gray-500 text-sm mb-2">{item.course.category}</p>
                    <p className="text-gray-400 text-sm">{item.course.duration}</p>
                  </div>
                  <div className="text-right flex flex-col gap-2 items-end">
                    <p className="text-blue-700 font-bold text-xl">
                      ₦{item.course.price.toLocaleString()}
                    </p>
                    <button
                      onClick={() => handlePayment(item.course._id)}
                      disabled={payingId === item.course._id}
                      className="bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-blue-800 transition-colors disabled:opacity-60"
                    >
                      {payingId === item.course._id ? "Redirecting..." : "Pay Now"}
                    </button>
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

            {/* Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-600 text-lg">Total</span>
                <span className="text-3xl font-bold text-blue-700">
                  ₦{total.toLocaleString()}
                </span>
              </div>
              <Link
                href="/courses"
                className="inline-block border border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

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
  }, [router]);

  const removeFromCart = async (cartId: string) => {
    setRemoving(cartId);
    try {
      await api.delete(`/cart/${cartId}`);
      await fetchCart();
      // Trigger cart update event for CartIcon component
      window.dispatchEvent(new Event("cartUpdate"));
    } catch {
      alert("Failed to remove item");
    } finally {
      setRemoving(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
              className="inline-block bg-blue-700 text-white font-semibold px-8 py-3 rounded-full hover:bg-blue-800 transition-colors"
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
                  <img
                    src={item.course.image}
                    alt={item.course.title}
                    className="w-32 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{item.course.title}</h3>
                    <p className="text-gray-500 text-sm mb-2">{item.course.category}</p>
                    <p className="text-gray-400 text-sm">{item.course.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-700 font-bold text-xl mb-2">
                      ₦{item.course.price.toLocaleString()}
                    </p>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      disabled={removing === item._id}
                      className="text-red-600 text-sm font-medium hover:underline disabled:opacity-50"
                    >
                      {removing === item._id ? "Removing..." : "Remove"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-600 text-lg">Total</span>
                <span className="text-3xl font-bold text-blue-700">
                  ₦{total.toLocaleString()}
                </span>
              </div>
              <Link
                href="/courses"
                className="inline-block border border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-50 transition-colors mr-4"
              >
                Continue Shopping
              </Link>
              <button
                className="inline-block bg-blue-700 text-white font-semibold px-8 py-3 rounded-full hover:bg-blue-800 transition-colors"
              >
                Proceed to Payment
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
