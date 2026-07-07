"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";

export default function PaymentVerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get("reference");
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!reference) {
      setStatus("failed");
      setMessage("No payment reference found.");
      return;
    }

    const verify = async () => {
      try {
        const res = await api.get(`/payment/verify?reference=${reference}`);
        setStatus("success");
        setMessage(res.data.message || "Payment successful! You are now enrolled.");
      } catch (err: any) {
        setStatus("failed");
        setMessage(err.response?.data?.message || "Payment verification failed.");
      }
    };

    verify();
  }, [reference]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl shadow-sm w-full max-w-md p-10 text-center">

        {status === "loading" && (
          <>
            <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-blue-700 mx-auto mb-6" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Verifying Payment</h2>
            <p className="text-gray-500 text-sm">Please wait while we confirm your payment...</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-500 mb-6">{message}</p>
            <Link
              href="/my-courses"
              className="inline-block bg-blue-700 text-white font-semibold px-8 py-3 rounded-full hover:bg-blue-800 transition-colors mb-3"
            >
              View My Courses
            </Link>
            <br />
            <Link href="/courses" className="text-sm text-blue-700 hover:underline">
              Browse more courses
            </Link>
          </>
        )}

        {status === "failed" && (
          <>
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h2>
            <p className="text-gray-500 mb-6">{message}</p>
            <Link
              href="/cart"
              className="inline-block bg-blue-700 text-white font-semibold px-8 py-3 rounded-full hover:bg-blue-800 transition-colors"
            >
              Back to Cart
            </Link>
          </>
        )}

      </div>
    </div>
  );
}
