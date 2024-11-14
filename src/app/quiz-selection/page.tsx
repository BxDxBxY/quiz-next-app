"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const categories = ["Science", "Math", "History", "Geography"];

export default function QuizSelection() {
  const router = useRouter();
  const [userName, setUserName] = useState("");

  const handleCategorySelection = (category: string) => {
    if (userName !== "") {
      localStorage.setItem(
        "user_credentials",
        JSON.stringify({ name: userName, score: 0 })
      );
      router.push(
        `/quiz/${category.toLowerCase()}/intro?category=${category.toLowerCase()}`
      );
    } else alert("Please write your Name!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Select a Quiz Category
      </h1>

      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <p className="text-lg text-gray-700 mb-4 text-center">
          Choose a category to test your knowledge:
        </p>

        <div>
          <input
            className="w-full px-4 py-3  my-2 text-black font-semibold rounded  transition-colors duration-200"
            type="text"
            name="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="space-y-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategorySelection(category)}
              className="w-full px-4 py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors duration-200"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
