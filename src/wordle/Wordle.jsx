import { useState, useEffect } from "react";
import "./wordle.css";

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;
const WORDS = ["APPLE", "GRAPE", "MANGO", "BERRY", "PEACH"];

const getRandomWord = () => WORDS[Math.floor(Math.random() * WORDS.length)];

const checkGuess = (guess, solution) => {
  const result = Array(WORD_LENGTH).fill("absent");
  const solutionArr = solution.split("");
  const guessArr = guess.split("");

  // First pass: correct letters
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guessArr[i] === solutionArr[i]) {
      result[i] = "correct";
      solutionArr[i] = null;
      guessArr[i] = null;
    }
  }

  // Second pass: present letters
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guessArr[i] && solutionArr.includes(guessArr[i])) {
      result[i] = "present";
      solutionArr[solutionArr.indexOf(guessArr[i])] = null;
    }
  }

  return result;
};

const Cell = ({ letter, status }) => (
  <div className={`cell ${status}`}>{letter}</div>
);

const Row = ({ guess, result }) => {
  const letters = guess.padEnd(WORD_LENGTH).split("");
  return (
    <div className="row">
      {letters.map((letter, idx) => (
        <Cell key={idx} letter={letter} status={result ? result[idx] : ""} />
      ))}
    </div>
  );
};

const Board = ({ guesses, results, currentGuess }) => (
  <div className="board">
    {Array.from({ length: MAX_ATTEMPTS }).map((_, i) => (
      <Row
        key={i}
        guess={guesses[i] || (i === guesses.length ? currentGuess : "")}
        result={results[i]}
      />
    ))}
  </div>
);

export default function Wordle() {
  const [solution, setSolution] = useState(getRandomWord);
  const [guesses, setGuesses] = useState([]);
  const [results, setResults] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;
      const key = e.key.toUpperCase();
      if (/^[A-Z]$/.test(key) && currentGuess.length < WORD_LENGTH) {
        setCurrentGuess((prev) => prev + key);
      } else if (key === "BACKSPACE") {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (key === "ENTER") {
        if (currentGuess.length === WORD_LENGTH) {
          const upperGuess = currentGuess.toUpperCase();
          const result = checkGuess(upperGuess, solution);
          setGuesses((prev) => [...prev, upperGuess]);
          setResults((prev) => [...prev, result]);
          setCurrentGuess("");
          if (upperGuess === solution) {
            setGameOver(true);
            setMessage("Congratulations! You guessed the word.");
          } else if (guesses.length + 1 === MAX_ATTEMPTS) {
            setGameOver(true);
            setMessage(`Game Over! The word was ${solution}`);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentGuess, guesses, gameOver, solution]);

  const resetGame = () => {
    setSolution(getRandomWord());
    setGuesses([]);
    setResults([]);
    setCurrentGuess("");
    setGameOver(false);
    setMessage("");
  };

  return (
    <div className="game">
      <h1>Wordle</h1>
      <Board guesses={guesses} results={results} currentGuess={currentGuess} />
      {message && <div className="message">{message}</div>}
      {gameOver && <button onClick={resetGame}>New Game</button>}
    </div>
  );
};
