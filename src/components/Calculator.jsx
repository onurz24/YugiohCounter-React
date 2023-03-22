import React, { useEffect, useRef, useState } from "react";
import "../styles/Calculator.scss";
import { MdBackspace, MdSettings } from "react-icons/md";
import { FaHistory, FaTools } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AddToCalculator, DeleteAll, DeleteLast } from "./CalculatorSlice";
import { useNavigate } from "react-router-dom";
import ButtonSound3 from "../Audio/ButtonSound.mp3";
import PopSound1 from "../Audio/Pop.mp3";

const ButtonClick = new Audio(ButtonSound3);
const PopSound = new Audio(PopSound1);

export const Calculator = ({SoundStatus}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Calculator = useSelector((state) => state.Calculator);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (!isNaN(parseInt(e.key))) dispatch(AddToCalculator(e.key));
      if (e.key == "Backspace") dispatch(DeleteLast());
    });
  }, []);

  const handleNumberClick = (number) => {

    ButtonClick.pause();
    ButtonClick.currentTime = 0;
    if(SoundStatus){
      ButtonClick.play();
    }
    if (Calculator.length < 8) {
      dispatch(AddToCalculator(number));
    }
  };

  const DeleteLastCalculator = () => {
    PopSound.pause();
    PopSound.currentTime = 0;
    if(SoundStatus){
      PopSound.play();
    }
    dispatch(DeleteLast())
  }

  return (
    <table className="Calculator">
      <tbody>
        <tr>
          <td colSpan={3} id={"Output"}>
            {Calculator !== "" ? (
              <div className="CalcCount">{Calculator}</div>
            ) : (
              <div className="CalcCount Hide">.</div>
            )}
            <MdBackspace
              id="DeleteLast"
              onClick={DeleteLastCalculator}
            />
          </td>
        </tr>
        <tr>
          <td onClick={() => handleNumberClick("7")}>7</td>
          <td onClick={() => handleNumberClick("8")}>8</td>
          <td onClick={() => handleNumberClick("9")}>9</td>
        </tr>
        <tr>
          <td onClick={() => handleNumberClick("4")}>4</td>
          <td onClick={() => handleNumberClick("5")}>5</td>
          <td onClick={() => handleNumberClick("6")}>6</td>
        </tr>
        <tr>
          <td onClick={() => handleNumberClick("1")}>1</td>
          <td onClick={() => { handleNumberClick("2") }}>2</td>
          <td onClick={() => { handleNumberClick("3") }}>3</td>
        </tr>
        <tr>
          <td onClick={() => { handleNumberClick("0") }}>0</td>
          <td onClick={() => { handleNumberClick("00") }}>00</td>
          <td onClick={() => { handleNumberClick("000") }}>000</td>
        </tr>
        <tr>
          <td onClick={() => navigate('/History')}>
            <FaHistory />
          </td>
          <td onClick={() => navigate('/Gamble')}>
            <FaTools />
          </td>
          <td onClick={() => navigate('/Settings')}>
            <MdSettings />
          </td>
        </tr>
      </tbody>
    </table>
  )
}
