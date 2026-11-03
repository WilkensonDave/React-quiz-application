import { useState } from "react";
import "./App.css";
import { useQuizData } from "./contexts/quizContext";

export default function App() {
  return (
    <div className="container">
      <DisplayQuestions />
    </div>
  );
}

function DisplayQuestions() {
  const {
    quizData,
    quizNum,
    score,
    isFinished,
    handleQuestionAnswer,
    handleRestart,
    currentQuestion,
  } = useQuizData();
  // const [quizNum, setQuizNum] = useState(0);
  // const [score, setScore] = useState(0);
  // const currentQuestion = quizData[quizNum];
  // const [isFinished, setIsFinished] = useState(false);

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
              key={item}
              item={item}
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
