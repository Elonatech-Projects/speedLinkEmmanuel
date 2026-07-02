"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
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

const categories = [
  "Web Development",
  "Cybersecurity",
  "Networking",
  "Data Science",
  "Digital Marketing",
  "Cloud Computing",
  "UI/UX Design",
  "ERP & Business",
];

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const fetchCourses = async (searchVal: string, categoryVal: string) => {
    try {
      setLoading(true);
      const params: Record<string, string> = {};
      if (searchVal) params.search = searchVal;
      if (categoryVal) params.category = categoryVal;
      const res = await api.get("/courses", { params });
      setCourses(res.data.courses);
    } catch {
      setError("Failed to load courses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses("", category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchCourses(search, category);
  };

  return (
    <div className="min-h-screen bg-[#e8eaf0]">
      {/* Header */}
      <div className="bg-[#0a1628] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Our Courses</h1>
          <p className="text-gray-400 text-lg">
            Explore our cutting-edge tech courses and start learning today
          </p>
        </div>
      </div>
      <div className=" max-w-6xl mx-auto  flex flex-row pt-4 justify-between sticky top">
        <Link href="/my-courses" className="bg-blue-100 text-[#EE3539] text-sm font-semibold px-3 py-1 rounded-full hover:text-[#404297] transition-colors">
          View My Courses
        </Link>
        <CartIcon />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <form onSubmit={handleSearch} className="flex flex-1 gap-2">
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-[#404297] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#EE3539] transition-colors"
            >
              Search
            </button>
          </form>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Loading skeletons */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-4 animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4" />
                <div className="bg-gray-200 h-4 rounded mb-2" />
                <div className="bg-gray-200 h-4 rounded w-2/3" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-12 text-red-500">{error}</div>
        )}

        {/* Courses Grid */}
        {!loading && !error && (
          <>
            <p className="text-sm text-gray-500 mb-6">
              {courses.length} course{courses.length !== 1 ? "s" : ""} found
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <Link
                  key={course._id}
                  href={`/courses/${course._id}`}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden group opacity-0"
                  style={{
                    animation: "floatUp 0.5s ease forwards",
                    animationDelay: `${index * 80}ms`,
                  }}
                >
                  <div className="relative h-48 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-blue-100 text-[#EE3539] text-xs font-semibold px-3 py-1 rounded-full">
                      {course.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-[#404297] text-lg mb-2 leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#404297] font-bold text-lg">
                        &#x20A6;{course.price.toLocaleString()}
                      </span>
                      <span className="text-gray-400 text-sm">{course.duration}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {courses.length === 0 && (
              <div className="text-center py-16 text-gray-500">
                <p className="text-lg">No courses found.</p>
                <button
                  onClick={() => { setSearch(""); setCategory(""); }}
                  className="mt-4 text-[#404297] underline text-sm"
                >
                  Clear filters
                </button>
              </div>
            )}
          </>
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
