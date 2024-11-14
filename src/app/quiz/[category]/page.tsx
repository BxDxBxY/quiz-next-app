"use client";

import geographyQuestions from "@/app/questions/geography";
import historyQuestions from "@/app/questions/history";
import mathQuestions from "@/app/questions/math";
import scienceQuestions from "@/app/questions/science";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

interface Choice {
  text: string;
  answer: boolean;
}

interface Question {
  question: string;
  choices: Choice[];
}

const questionsData: Record<string, Question[]> = {
  science: scienceQuestions.science,
  math: mathQuestions.math,
  history: historyQuestions.history,
  geography: geographyQuestions.geography,
};

export default function QuizPage() {
  const router = useRouter();
  const pathname = usePathname();
  const category = pathname?.split("/").pop() ?? "";

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questionText, setQuestionText] = useState("");
  const [choices, setChoices] = useState<Choice[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showNextButton, setShowNextButton] = useState(false);

  useEffect(() => {
    if (!category || !questionsData[category]) {
      router.push("/quiz-selection");
      return;
    }
    startQuiz(category);
  }, [category]);

  const startQuiz = (category: string) => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowNextButton(false);
    showQuestion(0, questionsData[category]);
  };

  const showQuestion = (index: number, questions: Question[]) => {
    const currentQuestion = questions[index];
    setQuestionText(currentQuestion.question);
    setChoices(currentQuestion.choices);
    setSelectedAnswer(null);
  };

  const selectChoice = (isCorrect: boolean, index: number) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    setSelectedAnswer(index);
    setShowNextButton(true);
  };

  const handleNextButton = () => {
    const categoryQuestions = questionsData[category];
    if (currentQuestionIndex < categoryQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      showQuestion(currentQuestionIndex + 1, categoryQuestions);
    } else {
      localStorage.setItem('user_credentials',JSON.stringify({score,userName}))
      setQuestionText(
        `You scored ${score} out of ${categoryQuestions.length}!`
      );
      setChoices([]);
      setShowNextButton(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        Quiz - {category.charAt(0).toUpperCase() + category.slice(1)}
      </h1>

      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {questionText}
        </h2>

        <div className="space-y-3">
          {choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => selectChoice(choice.answer, index)}
              disabled={selectedAnswer !== null}
              className={`w-full px-4 py-2 text-left font-medium border rounded transition-colors duration-200
                ${
                  selectedAnswer === index
                    ? choice.answer
                      ? "bg-green-100 border-green-500 text-green-700"
                      : "bg-red-100 border-red-500 text-red-700"
                    : "bg-gray-50 border-gray-300 text-gray-800 hover:bg-gray-100"
                }`}
            >
              {choice.text}
            </button>
          ))}
        </div>

        {showNextButton && (
          <button
            onClick={handleNextButton}
            className="mt-6 w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors duration-200"
          >
            Next
          </button>
        )}
      </div>

      {choices.length === 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {questionText}
          </h2>
          <button
            onClick={() => router.push("/quiz-selection")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors duration-200"
          >
            Back to Categories
          </button>
        </div>
      )}
    </div>
  );
}
