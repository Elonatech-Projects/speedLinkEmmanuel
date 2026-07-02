"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

interface Enrollment {
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
  paymentStatus: string;
  createdAt: string;
}

export default function MyCoursesPage() {
  const router = useRouter();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMyCourses = async () => {
    try {
      const res = await api.get("/my-courses");
      setEnrollments(res.data.enrollments);
    } catch {
      setEnrollments([]);
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
    fetchMyCourses();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e8eaf0]">
      {/* Header */}
      <div className="bg-[#0a1628] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">My Courses</h1>
          <p className="text-gray-400">
            {enrollments.length} course{enrollments.length !== 1 ? "s" : ""} enrolled
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {enrollments.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No courses yet</h2>
            <p className="text-gray-500 mb-6">Start your learning journey by enrolling in a course</p>
            <Link
              href="/courses"
              className="inline-block bg-[#404297]  text-white font-semibold px-8 py-3 rounded-full hover:bg-blue-800 transition-colors"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrollments.map((enrollment, index) => (
              <Link
                key={enrollment._id}
                href={`/courses/${enrollment.course._id}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden group opacity-0"
                style={{
                  animation: "floatUp 0.5s ease forwards",
                  animationDelay: `${index * 80}ms`,
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={enrollment.course.image}
                    alt={enrollment.course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Enrolled
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 text-lg mb-2 leading-snug">
                    {enrollment.course.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {enrollment.course.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">{enrollment.course.duration}</span>
                    <span className="text-green-600 text-xs font-medium">
                      {enrollment.paymentStatus === "paid" ? "Paid" : "Pending"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-3">
                    Enrolled: {new Date(enrollment.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Float-up keyframe */}
      <style>{`
        @keyframes floatUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
