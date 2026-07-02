"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
}

interface Course {
  _id: string;
  title: string;
  category: string;
  price: number;
  duration: string;
  createdAt: string;
}

interface Transaction {
  _id: string;
  user: { username: string; email: string };
  course: { title: string; price: number };
  amount: number;
  reference: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"users" | "courses" | "transactions">("users");
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data.users);
    } catch {
      setUsers([]);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await api.get("/admin/courses");
      setCourses(res.data.courses);
    } catch {
      setCourses([]);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await api.get("/admin/transactions");
      setTransactions(res.data.transactions);
    } catch {
      setTransactions([]);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    
    if (!token || user.role !== "admin") {
      router.push("/login");
      return;
    }

    const loadData = async () => {
      await Promise.all([fetchUsers(), fetchCourses(), fetchTransactions()]);
      setLoading(false);
    };
    
    loadData();
  }, [router]);

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
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage your platform</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("users")}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === "users"
                ? "text-blue-700 border-b-2 border-blue-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Users ({users.length})
          </button>
          <button
            onClick={() => setActiveTab("courses")}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === "courses"
                ? "text-blue-700 border-b-2 border-blue-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Courses ({courses.length})
          </button>
          <button
            onClick={() => setActiveTab("transactions")}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === "transactions"
                ? "text-blue-700 border-b-2 border-blue-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Transactions ({transactions.length})
          </button>
        </div>

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Username</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{user.username}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        user.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && (
              <div className="p-12 text-center text-gray-500">No users found</div>
            )}
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === "courses" && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Duration</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {courses.map((course) => (
                  <tr key={course._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{course.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{course.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-bold">
                      ₦{course.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{course.duration}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(course.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {courses.length === 0 && (
              <div className="p-12 text-center text-gray-500">No courses found</div>
            )}
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === "transactions" && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">User</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Course</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Reference</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transactions.map((tx) => (
                  <tr key={tx._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div>{tx.user.username}</div>
                      <div className="text-gray-500 text-xs">{tx.user.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{tx.course.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-bold">
                      ₦{tx.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono text-xs">
                      {tx.reference}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        tx.status === "success" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {transactions.length === 0 && (
              <div className="p-12 text-center text-gray-500">No transactions found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
