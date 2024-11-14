"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

interface Choice {
  text: string;
  answer: boolean;
}

interface Question {
  question: string;
  choices: Choice[];
}

const questionsData: Record<string, Question[]> = {};

export default function QuizPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const category = searchParams.get('category');

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questionText, setQuestionText] = useState("");
  const [choices, setChoices] = useState<Choice[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showNextButton, setShowNextButton] = useState(false);

  useEffect(() => {
    if (!category || !questionsData[category]) {
      router.push('/quiz-selection'); // Redirect if the category is invalid
      return;
    }
    startQuiz(category);
  }, [category]);

  const startQuiz = (category: string) => {
    setCurrentQuestionIndex(0);
    setScore(0);
    showQuestion(0, questionsData[category]);
  };

  const showQuestion = (index: number, questions: Question[]) => {
    const currentQuestion = questions[index];
    setQuestionText(currentQuestion.question);
    setChoices(currentQuestion.choices);
    setSelectedAnswer(null);
    setShowNextButton(false);
  };

  const selectChoice = (isCorrect: boolean, index: number) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    setSelectedAnswer(index);
    setShowNextButton(true);
  };

  const handleNextButton = () => {
    const categoryQuestions = questionsData[category as string];
    if (currentQuestionIndex < categoryQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      showQuestion(currentQuestionIndex + 1, categoryQuestions);
    } else {
      setQuestionText(`You scored ${score} out of ${categoryQuestions.length}!`);
    }
  };

  return (
    <div>
      <h1>Quiz - {category}</h1>
      <div>
        <h2>{questionText}</h2>
        <div>
          {choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => selectChoice(choice.answer, index)}
              disabled={selectedAnswer !== null}
              className={selectedAnswer === index ? (choice.answer ? "correct" : "incorrect") : ""}
            >
              {choice.text}
            </button>
          ))}
        </div>
        {showNextButton && (
          <button onClick={handleNextButton}>Next</button>
        )}
      </div>
    </div>
  );
}
