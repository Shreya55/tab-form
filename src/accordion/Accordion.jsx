import { useState } from "react";
import "./accordion.css";

export default function Accordion() {
  const data = [
    {
      title: "React",
      desc: "React is cool",
    },
    {
      title: "Java",
      desc: "Java is very old",
    },
    {
      title: "Assembly",
      desc: "For writing a code in Assembly you must invent the world first",
    },
    {
      title: "CSS",
      desc: "I still don't know how to centre a div",
    },
  ];

  const [isOpen, setIsOpen] = useState(null);

  function handleChange(index) {
    setIsOpen(isOpen === index ? null : index);
  }

  return (
    <div className="container">
      <h1>Accordions</h1>
      {data.map((d, index) => (
        <div>
          <div className="title-container" onClick={() => handleChange(index)}>
            {d.title}
          </div>
          {isOpen === index && <div className="p-container">{d.desc}</div>}
        </div>
      ))}
    </div>
  );
}
