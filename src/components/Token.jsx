import React, { useState, useEffect } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddHistory } from "./HistorySlice";
import { increment, decrement } from "./TokenSlice";
export const Token = () => {

  const navigate = useNavigate();
  const Tokens = useSelector(state => state.Tokens);
  const dispatch = useDispatch();

  const EditToken = obj => {
    switch (obj.who) {
      case "TOKEN1":
        switch (obj.negative) {
          case true:
            dispatch(decrement("TOKEN1"));
            dispatch(AddHistory({
              who: "All",
              message: `Zähler 1. wurde von ${Tokens.Token1} 
                          auf ${Tokens.Token1 - 1} Token verringert`
            }));
            break;
          case false:
            dispatch(increment("TOKEN1"));
            dispatch(AddHistory({
              who: "All",
              message: `Zähler 1. wurde von ${Tokens.Token1} 
                            auf ${Tokens.Token1 + 1} Token erhöht`
            }));
            break;
        }
        break;
      case "TOKEN2":
        switch (obj.negative) {
          case true:
            dispatch(decrement("TOKEN2"));
            dispatch(AddHistory({
              who: "All",
              message: `Zähler 2. wurde von ${Tokens.Token2} 
                      auf ${Tokens.Token2 - 1} Token verringert`
            }));
            break;
          case false:
            dispatch(increment("TOKEN2"));
            dispatch(AddHistory({
              who: "All",
              message: `Zähler 2. wurde von ${Tokens.Token2} 
                        auf ${Tokens.Token2 + 1} Token erhöht`
            }));
            break;
        }
        break;
      case "TOKEN3":
        switch (obj.negative) {
          case true:
            dispatch(decrement("TOKEN3"));
            dispatch(AddHistory({
              who: "All",
              message: `Zähler 3. wurde von ${Tokens.Token3} 
                      auf ${Tokens.Token3 - 1} Token verringert`
            }));
            break;
          case false:
            dispatch(increment("TOKEN3"));
            dispatch(AddHistory({
              who: "All",
              message: `Zähler 3. wurde von ${Tokens.Token3} 
                        auf ${Tokens.Token3 + 1} Token erhöht`
            }));
            break;
        }
        break;
      case "TOKEN4":
        switch (obj.negative) {
          case true:
            dispatch(decrement("TOKEN4"));
            dispatch(AddHistory({
              who: "All",
              message: `Zähler 4. wurde von ${Tokens.Token4} 
                  auf ${Tokens.Token4 - 1} Token verringert`
            }));
            break;
          case false:
            dispatch(increment("TOKEN4"));
            dispatch(AddHistory({
              who: "All",
              message: `Zähler 4. wurde von ${Tokens.Token4} 
                    auf ${Tokens.Token4 + 1} Token erhöht`
            }));
            break;
        }
        break;

    }
  }

  return (
    <ul id="Tokens">
      <li className="Token GoBack" onClick={() => navigate('/Gamble')}>
        Zurück
      </li>
      <li className="Token">
        <div className="AddToken"
          onClick={() => { EditToken({ who: "TOKEN1", negative: false }) }}
        >
          <FaPlus cursor={"pointer"} />
        </div>
        <div className="CurrentToken">
          {Tokens.Token1}
        </div>
        <div className="RemoveToken"
          onClick={() => { EditToken({ who: "TOKEN1", negative: true }) }}
        >
          <FaMinus />
        </div>
      </li>
      <li className="Token">
        <div className="AddToken"
          onClick={() => { EditToken({ who: "TOKEN2", negative: false }) }}>
          <FaPlus cursor={"pointer"} />
        </div>
        <div className="CurrentToken">
          {Tokens.Token2}
        </div>
        <div className="RemoveToken"
          onClick={() => { EditToken({ who: "TOKEN2", negative: true }) }}>
          <FaMinus />
        </div>
      </li>
      <li className="Token">
        <div className="AddToken"
          onClick={() => { EditToken({ who: "TOKEN3", negative: false }) }}>
          <FaPlus cursor={"pointer"} />
        </div>
        <div className="CurrentToken">
          {Tokens.Token3}
        </div>
        <div className="RemoveToken"
          onClick={() => { EditToken({ who: "TOKEN3", negative: true }) }}>
          <FaMinus />
        </div>
      </li>
      <li className="Token">
        <div className="AddToken"
          onClick={() => { EditToken({ who: "TOKEN4", negative: false }) }}>
          <FaPlus cursor={"pointer"} />
        </div>
        <div className="CurrentToken">
          {Tokens.Token4}
        </div>
        <div className="RemoveToken"
          onClick={() => { EditToken({ who: "TOKEN4", negative: true }) }}>
          <FaMinus />
        </div>
      </li>
    </ul>
  )
}