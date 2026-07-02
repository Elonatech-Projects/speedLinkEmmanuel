"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import myCourses from "@/app/my-courses/page";
import Link from "next/dist/client/link";
import CartIcon from "@/components/CartIcon";

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
  const [cartMsg, setCartMsg] = useState("");
  const [cartLoading, setCartLoading] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${id}`);
        setCourse(res.data.course);
      } catch {
        router.push("/courses");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCourse();
  }, [id]);

  const addToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    setCartLoading(true);
    try {
      await api.post("/cart", { courseId: id });
      setCartMsg("Added to cart successfully!");
      // Trigger cart update event for CartIcon component
      window.dispatchEvent(new Event("cartUpdate"));
    } catch (err: any) {
      setCartMsg(err.response?.data?.message || "Failed to add to cart");
    } finally {
      setCartLoading(false);
      setTimeout(() => setCartMsg(""), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700" />
      </div>
    );
  }

  if (!course) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className=" max-w-6xl mx-auto  flex flex-row pt-4 justify-around sticky ">
        <Link href="/my-courses" className="bg-blue-100 text-[#EE3539] text-sm font-semibold px-3 py-1 rounded-full hover:text-[#404297] transition-colors">
          My Courses
        </Link>
        <CartIcon />
      </div>
      <div className="max-w-5xl mx-auto px-6 py-5">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <img src={course.image} alt={course.title} className="w-full h-72 object-cover" />
          <div className="p-8">
            <span className="bg-blue-100 text-[#EE3539] text-xs font-semibold px-3 py-1 rounded-full">
              {course.category}
            </span>
            <h1 className="text-3xl font-bold text-[#404297] mt-4 mb-3">{course.title}</h1>
            <p className="text-gray-600 leading-relaxed mb-6">{course.description}</p>

            <div className="flex items-center gap-6 mb-8 text-sm text-gray-500">
              <span>⏱ {course.duration}</span>
              <span className="text-2xl font-bold text-[#404297]">₦{course.price.toLocaleString()}</span>
            </div>

            {cartMsg && (
              <div className={`text-sm px-4 py-3 rounded-lg mb-4 ${cartMsg.includes("success") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
                {cartMsg}
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={addToCart}
                disabled={cartLoading}
                className="bg-[#404297] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#EE3539] transition-colors disabled:opacity-60"
              >
                {cartLoading ? "Adding..." : "Add to Cart"}
              </button>
              <button
                onClick={() => router.back()}
                className="border border-gray-300 text-gray-700 font-semibold px-8 py-3 rounded-full hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
