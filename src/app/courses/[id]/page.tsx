"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";

interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  image: string;
}

export default function CourseDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const courseRes = await api.get(`/courses/${id}`);
        setCourse(courseRes.data.course);

        const token = localStorage.getItem("token");
        if (token) {
          // Check enrollments
          try {
            const enrollRes = await api.get("/my-courses");
            const enrolled = enrollRes.data.enrollments.some(
              (e: { course: { _id: string }; paymentStatus: string }) =>
                e.course._id === id && e.paymentStatus === "paid"
            );
            setIsEnrolled(enrolled);
          } catch {}

          // Check cart
          try {
            const cartRes = await api.get("/cart");
            const alreadyInCart = cartRes.data.cartItems.some(
              (item: { course: { _id: string } }) => item.course._id === id
            );
            setInCart(alreadyInCart);
          } catch {}
        }
      } catch {
        router.push("/courses");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const addToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Save current page so we can return after login
      sessionStorage.setItem("redirectAfterLogin", `/courses/${id}`);
      router.push("/login");
      return;
    }
    setActionLoading(true);
    try {
      await api.post("/cart", { courseId: id });
      setInCart(true);
      setMsg("Added to cart!");
      window.dispatchEvent(new Event("cartUpdate"));
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setMsg(error.response?.data?.message || "Failed to add to cart");
    } finally {
      setActionLoading(false);
      setTimeout(() => setMsg(""), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#404297]" />
      </div>
    );
  }

  if (!course) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={course.image} alt={course.title} className="w-full h-72 object-cover" />
          <div className="p-8">
            <span className="bg-blue-100 text-[#404297] text-xs font-semibold px-3 py-1 rounded-full">
              {course.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-3">{course.title}</h1>
            <p className="text-gray-600 leading-relaxed mb-6">{course.description}</p>

            <div className="flex items-center gap-6 mb-8 text-sm text-gray-500">
              <span>⏱ {course.duration}</span>
              {!isEnrolled && (
                <span className="text-2xl font-bold text-[#404297]">
                  &#x20A6;{course.price.toLocaleString()}
                </span>
              )}
            </div>

            {msg && (
              <div className={`text-sm px-4 py-3 rounded-lg mb-4 ${msg.includes("Added") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
                {msg}
              </div>
            )}

            <div className="flex gap-4 flex-wrap">
              {isEnrolled ? (
                // Already enrolled — show access button
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-2 bg-green-100 text-green-700 font-semibold px-6 py-3 rounded-full">
                    ✅ Enrolled
                  </span>
                  <button
                    onClick={() => router.push("/my-courses")}
                    className="bg-[#404297] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#EE3539] transition-colors"
                  >
                    Go to My Courses
                  </button>
                </div>
              ) : inCart ? (
                // Already in cart
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-2 bg-blue-50 text-[#404297]  px-6 py-3 rounded-full border border-[#404297]/30">
                    🛒 In Cart
                  </span>
                  <button
                    onClick={() => router.push("/cart")}
                    className="bg-[#404297] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#EE3539] transition-colors"
                  >
                    View Cart & Checkout
                  </button>
                </div>
              ) : (
                // Not enrolled, not in cart
                <button
                  onClick={addToCart}
                  disabled={actionLoading}
                  className="bg-[#404297] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#EE3539] transition-colors disabled:opacity-60"
                >
                  {actionLoading ? "Adding..." : "Add to Cart"}
                </button>
              )}

              <button
                onClick={() => router.push("/courses")}
                className="border border-gray-300 text-gray-700 font-semibold px-8 py-3 rounded-full hover:bg-gray-50 transition-colors"
              >
                Back to Courses
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
