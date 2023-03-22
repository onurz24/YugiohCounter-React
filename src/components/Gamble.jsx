import React, { useState } from "react";
import { FaCoins, FaDice, FaDiceFive, FaDiceFour, FaDiceOne, FaDiceSix, FaDiceThree, FaDiceTwo } from "react-icons/fa";
import { MdGeneratingTokens } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/Section.scss";
import { AddHistory } from "./HistorySlice";
import DiceSound1 from "../Audio/DiceSound.mp3"
import CoinSound1 from "../Audio/Coin.mp3"

const DiceSound = new Audio(DiceSound1);
const CoinSound = new Audio(CoinSound1);

export const Gamble = ({SoundStatus}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    /* Münzwurf */
    let [Coin, setCoin] = useState(
        <>
            Münzwurf <br />
            <FaCoins fontSize={"xx-large"} />
        </>);
    let [CoinStatus, setCoinStatus] = useState(false);
    const Münzwurf = () => {
        if (CoinStatus) {
            setCoin(
                <>
                    Münzwurf <br />
                    <FaCoins fontSize={"xx-large"} />
                </>
            )
            setCoinStatus(!CoinStatus)
        } else {
            CoinSound.pause();
            CoinSound.currentTime = 0;
            if(SoundStatus){
                CoinSound.play();
            }
            const Uhrzeit = new Date().toLocaleTimeString();
            const randNum = Math.floor(Math.random() * 2);
            randNum === 0 ? setCoin(<div id="Coin">Kopf</div>) : setCoin(<div id="Coin">Zahl</div>)
            dispatch(AddHistory({
                who: "All",
                message: `Münzwurf Ergebnis :
                 ${randNum === 0 ? "Kopf" : "Zahl"} um ${Uhrzeit}`
            }));
            setCoinStatus(!CoinStatus)
        }
    }
    /* Würfel */
    let [Dice, setDice] = useState(
        <>
            Würfel
            <FaDice fontSize={"xx-large"} />
        </>
    );
    let [DiceStatus, setDiceStatus] = useState(false);
    const Würfeln = () => {
        if (DiceStatus) {
            setDice(
                <>
                    Würfel
                    <FaDice fontSize={"xx-large"} />
                </>
            )
            setDiceStatus(!DiceStatus)
        } else {
            const Uhrzeit = new Date().toLocaleTimeString();
            const randNum = Math.floor(Math.random() * 6 + 1);
            DiceSound.pause();
            DiceSound.currentTime = 0;
            if(SoundStatus){
                DiceSound.play();
            }

            switch (randNum) {
                case 1: setDice(<div id="Dice">{<FaDiceOne fontSize={"xx-large"} />}</div>);
                    break;
                case 2: setDice(<div id="Dice">{<FaDiceTwo fontSize={"xx-large"} />}</div>);
                    break;
                case 3: setDice(<div id="Dice">{<FaDiceThree fontSize={"xx-large"} />}</div>);
                    break;
                case 4: setDice(<div id="Dice">{<FaDiceFour fontSize={"xx-large"} />}</div>);
                    break;
                case 5: setDice(<div id="Dice">{<FaDiceFive fontSize={"xx-large"} />}</div>);
                    break;
                case 6: setDice(<div id="Dice">{<FaDiceSix fontSize={"xx-large"} />}</div>);
                    break;

            }
            dispatch(AddHistory({
                who: "All",
                message: `Würfel Ergebnis : ${randNum} um ${Uhrzeit}`
            }));
            setDiceStatus(!DiceStatus)
        }
    }

    return (
        <div className="GambleWrapper">

            <div className="Gamble GoBack" onClick={() => navigate('/Game')}>
                Zurück
            </div>

            <div className="Gamble" onClick={Münzwurf} >
                {Coin}
            </div>

            <div className="Gamble" onClick={Würfeln}>
                {Dice}
            </div>

            <div className="Gamble" onClick={() => navigate('/Token')}>
                Spielmarken
                <MdGeneratingTokens fontSize={"xx-large"} />
            </div>

        </div>
    )
}