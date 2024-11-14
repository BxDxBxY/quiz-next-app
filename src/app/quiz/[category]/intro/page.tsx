"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface QuizInfo {
  questionCount: number;
  time: number;
  description: string;
}

// Define the quiz information with explicit type
const quizInfo: Record<string, QuizInfo> = {
  science: {
    questionCount: 10,
    time: 15,
    description: "Explore the wonders of science!",
  },
  math: {
    questionCount: 8,
    time: 10,
    description: "Challenge your math skills!",
  },
  history: { questionCount: 12, time: 20, description: "Dive into the past!" },
  geography: {
    questionCount: 7,
    time: 12,
    description: "Test your knowledge of the world!",
  },
};

export default function QuizIntroPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<string | null>(null);
  const [info, setInfo] = useState<QuizInfo | null>(null);

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam && quizInfo[categoryParam]) {
      setCategory(categoryParam);
      setInfo(quizInfo[categoryParam]);
    } else {
      router.push("/quiz-selection"); // Redirect if category is invalid
    }
  }, [router, searchParams]);

  const handleStartQuiz = () => {
    if (category) {
      router.push(`/quiz/${category}`);
    }
  };
  const handleBackToCategories = () => {
    router.back();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {info && (
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-blue-600 mb-4">
            Welcome to the {category} Quiz!
          </h1>
          <p className="text-lg text-gray-700 mb-4">{info.description}</p>

          <div className="text-gray-800 mb-6">
            <p>
              <strong>Number of Questions:</strong> {info.questionCount}
            </p>
            <p>
              <strong>Estimated Time:</strong> {info.time} minutes
            </p>
          </div>

          <div className="w-full gap-2 grid grid-cols-2">
            <button
              onClick={handleBackToCategories}
              className="w-full px-4 py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors duration-200"
            >
              Back to Categories
            </button>
            <button
              onClick={handleStartQuiz}
              className="w-full px-4 py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors duration-200"
            >
              Start Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
