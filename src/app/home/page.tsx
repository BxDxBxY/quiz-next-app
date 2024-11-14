"use client"
import { useState, useEffect } from 'react';
import freeMadeQuestions from '../questions';
 

interface Choice {
  text: string;
  answer: boolean;
}

interface Question {
  question: string;
  choices: Choice[];
}

const questions: Question[] = freeMadeQuestions

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [questionText, setQuestionText] = useState<string>("");
  const [choices, setChoices] = useState<Choice[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showNextButton, setShowNextButton] = useState<boolean>(false);

  const startQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowNextButton(false);
    showQuestion(0);
  };

  const showQuestion = (index: number) => {
    resetState();
    const currentQuestion = questions[index];
    const questionNumber = index + 1;
    setQuestionText(`${questionNumber}. ${currentQuestion.question}`);
    const shuffledChoices = shuffle(currentQuestion.choices);
    setChoices(shuffledChoices);
    setCorrectAnswer(shuffledChoices.findIndex((choice) => choice.answer === true));
  };

  const resetState = () => {
    setChoices([]);
    setCorrectAnswer(null);
    setSelectedAnswer(null);
  };

  const shuffle = (choices: Choice[]): Choice[] => {
    return choices.sort(() => Math.random() - 0.5);
  };

  const selectChoice = (isCorrect: boolean, index: number) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    setSelectedAnswer(index);
    setShowNextButton(true);
  };

  const handleNextButton = () => {
    setShowNextButton(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      showQuestion(currentQuestionIndex + 1);
    } else {
      showScore();
    }
  };

  const showScore = () => {
    resetState();
    setQuestionText(`You scored ${score} out of ${questions.length}!`);
  };

  useEffect(() => {
    startQuiz();
  }, []);

  return (
    <div className="app">
      <h1>Simple Quiz</h1>
      <div className="quiz">
        <h2 id="question">{questionText}</h2>
        <div id="answer-buttons">
          {choices.map((choice, index) => (
            <button
              key={index}
              className={`btn ${selectedAnswer === index ? (choice.answer ? "correct" : "incorrect") : ""}`}
              onClick={() => selectChoice(choice.answer, index)}
              aria-label={choice.text}
              disabled={selectedAnswer !== null}
            >
              {choice.text}
            </button>
          ))}
        </div>
        {showNextButton && (
          <button id="next-button" onClick={handleNextButton}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}
