import { useEffect, useState } from "react";
import "../progressBar.css";

export default function ProgressBarInput() {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [input, setInput] = useState("");

  function handleChange(e) {
    const val = e.target.value;
    if (val < 0 || val > 100) return;
    setInput(val);
  }

  useEffect(() => {
    setTimeout(() => {
      setAnimatedProgress(input);
    }, 100);
  }, [input]);

  return (
    <div className="container">
      <h1>Progress Bar</h1>
      <div className="outer">
        <div
          className="inner"
          style={{ transform: `translateX(${animatedProgress - 100}%)` }}
          role="progressbar"
          aria-valuenow={input}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {input}%
        </div>
      </div>
      <br />
      <input type="number" value={input} onChange={(e) => handleChange(e)} />
    </div>
  );
}
