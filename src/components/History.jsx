import { nanoid } from "@reduxjs/toolkit";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/History.scss";

export const History = () => {
    const navigate = useNavigate()
    let [SelectedHistory, setSelectedHistory] = useState("All");
    let HistoryAll = useSelector(state => state.History.All);
    let HistoryPlayer1 = useSelector(state => state.History.Player1);
    let HistoryPlayer2 = useSelector(state => state.History.Player2);
    let [RenderedHistory, setRenderedHistory] = useState(HistoryAll.map(history => (
        <li key={nanoid()} >
            {history}
        </li>))
    )
    useEffect(() => {
        switch (SelectedHistory) {
            case "Player1":
                setRenderedHistory(HistoryPlayer1.map(history => (
                    <li key={nanoid()}>
                        {history.replace("Spieler 1 :", "")}
                    </li>
                )).reverse());
                break
            case "Player2":
                setRenderedHistory(HistoryPlayer2.map(history => (
                    <li key={nanoid()}>
                        {history.replace("Spieler 2 :", "")}
                    </li>
                )).reverse());
                break
            case "All":
                setRenderedHistory(HistoryAll.map(history => (
                    <li key={nanoid()}>
                        {history}
                    </li>
                )).reverse());
                break
        }
    }, [SelectedHistory])

    const dispatch = useDispatch();
    return (
        <div className="HistoryWrapper">

            <div className="GoBack"
                onClick={() => navigate('/Game')}>
                Zurück
            </div>

            <div className="SelectHistory">
                <div
                    onClick={() => { setSelectedHistory("Player1") }}
                    className={SelectedHistory === "Player1" ? "OptionHistory ActiveHistory" : "OptionHistory"}>
                    Spieler 1
                </div>
                <div
                    onClick={() => { setSelectedHistory("All") }}
                    className={SelectedHistory === "All" ? "OptionHistory ActiveHistory" : "OptionHistory"}>
                    Alle
                </div>
                <div
                    onClick={() => { setSelectedHistory("Player2") }}
                    className={SelectedHistory === "Player2" ? "OptionHistory ActiveHistory" : "OptionHistory"}>
                    Spieler 2
                </div>
            </div>
            <ul className="DisplayHistory">
                {RenderedHistory}
            </ul>
        </div>
    )
}