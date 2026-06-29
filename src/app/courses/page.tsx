"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

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

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const params: Record<string, string> = {};
      if (search) params.search = search;
      if (category) params.category = category;

      const res = await api.get("/courses", { params });
      setCourses(res.data.courses);
    } catch (err) {
      setError("Failed to load courses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [category]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCourses();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#0a1628] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Our Courses</h1>
          <p className="text-gray-400 text-lg">
            Explore our cutting-edge tech courses and start learning today
          </p>
        </div>
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
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors"
            >
              Search
            </button>
          </form>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Loading */}
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
            <p className="text-sm text-gray-500 mb-6">{courses.length} course{courses.length !== 1 ? "s" : ""} found</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Link
                  key={course._id}
                  href={`/courses/${course._id}`}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-blue-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {course.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 text-lg mb-2 leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-700 font-bold text-lg">
                        ₦{course.price.toLocaleString()}
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
                  className="mt-4 text-blue-700 underline text-sm"
                >
                  Clear filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
