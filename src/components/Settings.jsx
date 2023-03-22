import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/Section.scss";
import { ClearHistory } from "./HistorySlice";
import { ClearToken } from "./TokenSlice";
import { DeleteAll } from "./CalculatorSlice";
import { ResetPlayers } from "./PlayersSlice";

export const Settings = ({ InitialHealth, setInitialHealth, setStatus }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Players = useSelector((state) => state.Players);

  const [isLandscape, setIsLandscape] = useState(false);

  const [ActiveTheme, setActiveTheme] = useState(0);

  const toggleLandscape = () => {
    setIsLandscape((prev) => !prev);
  };

  const resetGame = () => {
    navigate("/");
    setInitialHealth({
      Player1: (
        <CountUp start={Players.P1.health} end={8000} />
      ),
      Player2: (
        <CountUp start={Players.P2.health} end={8000} />
      ),
    });
    dispatch(ClearHistory());
    dispatch(ClearToken());
    dispatch(DeleteAll());
    dispatch(ResetPlayers());
    setStatus(false);
  };

  const wrapperStyle = {
    transform: isLandscape ? "rotate(90deg)" : "none",
    transformOrigin: "top left",
    width: isLandscape ? "100vh" : "100vw",
    height: isLandscape ? "100vw" : "100vh",
    position: "absolute",
    top: isLandscape ? "100%" : "0",
    left: isLandscape ? "0" : "100%",
  };

  const ChangeTheme = () => {
    setActiveTheme(prevActiveTheme => (prevActiveTheme + 1) % 6);
  };

  useEffect(() => {
    switch (ActiveTheme) {
      case 0:
        document.body.style.filter = "hue-rotate(0deg)";
        break;
      case 1:
        document.body.style.filter = "hue-rotate(60deg)";
        break;
      case 2:
        document.body.style.filter = "hue-rotate(120deg)";
        break;
      case 3:
        document.body.style.filter = "hue-rotate(180deg)";
        break;
      case 4:
        document.body.style.filter = "hue-rotate(240deg)";
        break;
      case 5:
        document.body.style.filter = "hue-rotate(300deg)";
        break;
      default:
        document.body.style.filter = "hue-rotate(0deg)";
        break;
    }
  }, [ActiveTheme]);


  return (
    <div className="SettingsWrapper">
      <div className="Setting GoBack" onClick={() => navigate("/Game")}>
        Zurück
      </div>
      <div className="Setting" onClick={resetGame}>
        Reset Game
      </div>
      <div className="Setting" onClick={ChangeTheme}>Theme Wechseln
        <br /> (Experimentell)</div>
      <div className="Setting" onClick={toggleLandscape}>
        {isLandscape ? "Hochformat" : "Querformat"} <br /> (Experimentell)
      </div>
    </div>
  );
};