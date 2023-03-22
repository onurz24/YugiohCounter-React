import React, { useState } from "react";
import "../styles/Start.scss";
import { MdPerson } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const Start = ({ setStatus, Status }) => {
  const navigate = useNavigate();
  const [personHeadColors, setPersonHeadColors] = useState(["#fff", "#fff"]);

  const choosePlayer = () => {
    let counter = 0;
    const intervalId = setInterval(() => {
      setPersonHeadColors(prevColors => {
        const newColors = [...prevColors];
        newColors[0] = counter % 2 === 0 ? "#fff" : "#222";
        newColors[1] = counter % 2 === 0 ? "#222" : "#fff";
        return newColors;
      });
      counter++;
      if (counter > 10) {
        clearInterval(intervalId);
        const randomIndex = Math.floor(Math.random() * 2);
        setPersonHeadColors(prevColors => {
          const newColors = [...prevColors];
          newColors[0] = randomIndex === 0 ? "#fff" : "#222";
          newColors[1] = randomIndex === 1 ? "#fff" : "#222";
          return newColors;
        });
        setStatus(true);
        setTimeout(() => {
          navigate('/Game');
        }, 3000);
      }
    }, 200);
  };

  return (
    <div className="Start">
      <div className="PersonHeads">
        <MdPerson className="PersonHead" style={{ color: personHeadColors[0] }} />
        <MdPerson className="PersonHead" style={{ color: personHeadColors[1] }} />
      </div>
      <div className={Status ? "LoadingAnimation" : "StartButton"} onClick={choosePlayer} disabled={Status}>
        Start
      </div>
    </div>
  );
};
