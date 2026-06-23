import { useState } from "react";
import "./App.css";

export const quizData = [
  {
    id: 1,
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Home Tool Markup Language",
      "Hyper Transfer Markup Language",
    ],
    answer: "Hyper Text Markup Language",
  },
  {
    id: 2,
    question: "Which company developed React?",
    options: ["Google", "Microsoft", "Facebook", "Amazon"],
    answer: "Facebook",
  },
  {
    id: 3,
    question: "Which hook is used to manage state in React?",
    options: ["useEffect", "useState", "useRef", "useMemo"],
    answer: "useState",
  },
  {
    id: 4,
    question: "Which symbol is used for comments in JavaScript?",
    options: ["<!-- -->", "#", "//", "**"],
    answer: "//",
  },
  {
    id: 5,
    question: "What is the output of 2 + '2' in JavaScript?",
    options: ["4", "22", "NaN", "Error"],
    answer: "22",
  },
  {
    id: 6,
    question: "Which method adds an element to the end of an array?",
    options: ["pop()", "shift()", "push()", "unshift()"],
    answer: "push()",
  },
  {
    id: 7,
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Colorful Style Sheets",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    id: 8,
    question: "Which data structure follows the Last In First Out principle?",
    options: ["Queue", "Stack", "Array", "Tree"],
    answer: "Stack",
  },
  {
    id: 9,
    question: "Which keyword is used to declare a constant in JavaScript?",
    options: ["var", "let", "const", "static"],
    answer: "const",
  },
  {
    id: 10,
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    answer: "O(log n)",
  },
];

export default function App() {
  return (
    <div className="container">
      <DisplayQuestions />
    </div>
  );
}

function DisplayQuestions() {
  const [quizNum, setQuizNum] = useState(0);
  const [score, setScore] = useState(0);
  const currentQuestion = quizData[quizNum];
  const [isFinished, setIsFinished] = useState(false);

  function handleQuestionAnswer(selectedAnswer) {
    if (currentQuestion.answer === selectedAnswer) {
      alert("Correct Answer");
      setScore((prev) => prev + 5);
    } else {
      alert("Bad Answer");
    }
    if (quizNum < quizData.length - 1) {
      setQuizNum((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  }

  function handleRestart() {
    setIsFinished(false);
    setQuizNum(0);
    setScore(0);
  }

  return (
    <div>
      {isFinished ? (
        <>
          <h2>End of the Quiz!</h2>
          <h3>You score is: {score}</h3>
          <button onClick={handleRestart} className="restart-btn">
            Restart
          </button>
        </>
      ) : (
        <>
          <h1 className="h1">Welcome to the quiz app</h1>
          <h2>You Score: {score}</h2>
          <h2>{currentQuestion.question}</h2>
          {currentQuestion.options.map((item) => (
            <QuizButton
              item={item}
              key={item}
              onClickAnswer={handleQuestionAnswer}
            />
          ))}
        </>
      )}
    </div>
  );
}

function QuizButton({ item, onClickAnswer }) {
  return (
    <div>
      <button onClick={() => onClickAnswer(item)} className="button">
        {item}
      </button>
    </div>
  );
}
