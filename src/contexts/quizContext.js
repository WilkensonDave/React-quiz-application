import { createContext, useContext, useReducer, useState } from "react";

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
const quizContext = createContext();
const quizNum = 0;
const initialState = {
  quizNum,
  score: 0,
  isFinished: false,
  currentQuestion: quizData[quizNum],
  message: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "goodAnswer":
      return { ...state, score: state.score + action.payload };
    case "badAnswer":
      return { ...state, message: action.payload };
    case "setQuizNum":
      const newQuizNum = state.quizNum + action.payload;
      return {
        ...state,
        quizNum: newQuizNum,
        currentQuestion: quizData[newQuizNum],
      };

    case "finish":
      return { ...state, isFinished: true };

    case "restart":
      return { ...state, isFinished: false, quizNum: 0, score: 0 };

    default:
      throw new Error("Unknow action type");
  }
}

function QuizProvider({ children }) {
  const [{ quizNum, score, isFinished, currentQuestion }, dispatch] =
    useReducer(reducer, initialState);

  function handleQuestionAnswer(selectedAnswer) {
    if (currentQuestion.answer === selectedAnswer) {
      alert("Correct Answer");
      dispatch({ type: "goodAnswer", payload: 5 });
      //   setScore((prev) => prev + 5);
    } else {
      alert("Bad Answer");
      dispatch({ type: "badAnswer", payload: "Bad answer" });
    }
    if (quizNum < quizData.length - 1) {
      //   setQuizNum((prev) => prev + 1);
      dispatch({ type: "setQuizNum", payload: 1 });
    } else {
      dispatch({ type: "finish" });
    }
  }

  function handleRestart() {
    dispatch({ type: "restart" });
  }

  return (
    <quizContext.Provider
      value={{
        quizNum,
        score,
        isFinished,
        handleRestart,
        handleQuestionAnswer,
        currentQuestion,
      }}
    >
      {children}
    </quizContext.Provider>
  );
}

function useQuizData() {
  const context = useContext(quizContext);
  if (context === undefined)
    throw new Error("QuizContext has been placed on the wrong place.");
  return context;
}

export { QuizProvider, useQuizData };
