import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Players.scss";
import { FaMinus, FaPause, FaPlay, FaPlus, FaStop, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import CountUp from 'react-countup';
import { ByAmount } from "./PlayersSlice";
import { DeleteAll } from "./CalculatorSlice";
import { AddHistory } from "./HistorySlice";

import PointsSound1 from "../Audio/Points.mp3";
import DamageSound1 from "../Audio/Damage.mp3";

const PointsSound = new Audio(PointsSound1);
const DamageSound = new Audio(DamageSound1);


export const Players = ({ InitialHealth, setInitialHealth,SoundStatus,setSoundStatus}) => {
    const dispatch = useDispatch();
    const Players = useSelector(state => state.Players);
    const Calculator = useSelector(state => state.Calculator);

    const [VolumeStatus, setVolumeStatus] = useState(true);

    const LP = obj => {
        /* Check if Amount is Valid Number to Prevent Errors */
        if (!isNaN(obj.howmuch)) {
            console.log("obj.howmuch is a Number! " + obj.howmuch);
            const Uhrzeit = new Date().toLocaleTimeString();
            /* Calculate in Store */
            dispatch(ByAmount(obj));
            /* Calculate in State and Checks Which Player */
            switch (obj.who) {
                case "P1":
                    /* Checks if Substraction or Addition */
                    switch (obj.negative) {
                        case false:
                            setInitialHealth({
                                ...InitialHealth,
                                Player1: <CountUp start={Players.P1.health}
                                    end={Players.P1.health + parseInt(Calculator)} />
                            });
                            dispatch(AddHistory({
                                who: "P1",
                                message: `Spieler 1 : ${parseInt(Calculator)} Lifepoints hinzugefügt um ${Uhrzeit}`
                            }));
                            PointsSound.pause();
                            PointsSound.currentTime = 0;
                            if(SoundStatus){
                                PointsSound.play();
                            }
                            break;
                        case true:
                            setInitialHealth({
                                ...InitialHealth,
                                Player1: <CountUp start={Players.P1.health}
                                    end={Players.P1.health - parseInt(Calculator)} />
                            });
                            dispatch(AddHistory({
                                who: "P1",
                                message: `Spieler 1 : ${parseInt(Calculator)} Lifepoints verloren um ${Uhrzeit}`
                            }));
                            DamageSound.pause();
                            DamageSound.currentTime = 0;
                            if(SoundStatus){
                                DamageSound.play();
                            }
                            break;
                    }
                    break;

                case "P2":
                    /* Checks if Substraction or Addition */
                    switch (obj.negative) {
                        case false:
                            setInitialHealth({
                                ...InitialHealth,
                                Player2: <CountUp start={Players.P2.health}
                                    end={Players.P2.health + parseInt(Calculator)} />
                            });
                            dispatch(AddHistory({
                                who: "P2",
                                message: `Spieler 2 : ${parseInt(Calculator)} Lifepoints hinzugefügt um ${Uhrzeit}`
                            }));
                            PointsSound.pause();
                            PointsSound.currentTime = 0;
                            if(SoundStatus){
                                PointsSound.play();
                            }
                            break;
                        case true:
                            setInitialHealth({
                                ...InitialHealth,
                                Player2: <CountUp start={Players.P2.health}
                                    end={Players.P2.health - parseInt(Calculator)} />
                            });
                            dispatch(AddHistory({
                                who: "P2",
                                message: `Spieler 2 : ${parseInt(Calculator)} Lifepoints verloren um ${Uhrzeit}`
                            }));
                            DamageSound.pause();
                            DamageSound.currentTime = 0;
                            if(SoundStatus){
                                DamageSound.play();
                            }
                            break;
                    }
                    break;
            }
            dispatch(DeleteAll()); /* Clear Calculator after Calculation */
        }
    }
    const [HealthColor, setHealthColor] = useState({
        Player1: "HealthStatus",
        Player2: "HealthStatus"
    })
    useEffect(() => {
        /* Player 1 Life Check */
        if (Players.P1.health > 4000) {
            setHealthColor({
                ...HealthColor,
                Player1: "HealthStatus"
            });
        }
        if (Players.P1.health <= 4000) {
            setHealthColor({
                ...HealthColor,
                Player1: "HealthStatus lowlife"
            });
        }
        if (Players.P1.health <= 2000) {
            setHealthColor({
                ...HealthColor,
                Player2: "HealthStatus verylowlife"
            });
        }
        /* Player 2 */
        if (Players.P1.health > 4000) {
            setHealthColor({
                ...HealthColor,
                Player2: "HealthStatus"
            });
        }
        if (Players.P1.health <= 4000) {
            setHealthColor({
                ...HealthColor,
                Player2: "HealthStatus lowlife"
            });
        }
        if (Players.P1.health <= 2000) {
            setHealthColor({
                ...HealthColor,
                Player2: "HealthStatus verylowlife"
            });
        }
    }, [Players.P1.health]);

    let Seconds = useRef(0);
    let Minutes = useRef(0);
    let Hours = useRef(0);
    let [Status, setStatus] = useState(false);
    let [RenderedSeconds, setRenderedSeconds] = useState(0);
    let [RenderedMinutes, setRenderedMinutes] = useState(0);
    let [RenderedHours, setRenderedHours] = useState(0);
    let [TimerStarted, setTimerStarted] = useState(false);

    useEffect(() => {
        let interval;
        if (Status) {
            setTimerStarted(true);
            const Uhrzeit = new Date().toLocaleTimeString();
            dispatch(AddHistory({
                who: "All",
                message: `Timer gestartet um ${Uhrzeit}`
            }));
            setStartStop(<FaPause onClick={() => { setStatus(false) }} cursor={"pointer"} />)
            interval = setInterval(() => {
                if (Seconds.current < 59) {
                    setRenderedSeconds(prevRenderedSeconds => prevRenderedSeconds + 1);
                    Seconds.current++;
                } else {
                    setRenderedSeconds(0);
                    Seconds.current = 0;
                    setRenderedMinutes(prevRenderedMinutes => prevRenderedMinutes + 1);
                    Minutes.current++;
                }
                if (Hours.current >= 59) {
                    setRenderedMinutes(0);
                    Minutes = 0;
                    setRenderedHours(prevRenderedHours => prevRenderedHours + 1);
                    Hours.current++;
                }
            }, 1000);
        } else {
            clearInterval(interval);
            setStartStop(<FaPlay onClick={() => { setStatus(true) }} cursor={"pointer"} />);
            if (TimerStarted) {
                const Uhrzeit = new Date().toLocaleTimeString();
                dispatch(AddHistory({
                    who: "All",
                    message: `Timer gestoppt 
                um ${Uhrzeit} 
                bei 
                ${RenderedHours < 10 ? "0" + RenderedHours : RenderedHours} :
                ${RenderedMinutes < 10 ? "0" + RenderedMinutes : RenderedMinutes} :
                ${RenderedSeconds < 10 ? "0" + RenderedSeconds : RenderedSeconds} 
                `
                }));
            }
        }
        return () => clearInterval(interval);
    }, [Status]);


    const [StartStop, setStartStop] = useState(
        <FaPlay onClick={() => { setStatus(true) }} cursor={"pointer"} />
    )
    const ResetTimer = () => {
        setStatus(!Status);
        setTimerStarted(false);
        setRenderedSeconds(0);
        setRenderedMinutes(0);
        setRenderedHours(0);
        Seconds.current = 0;
        Minutes.current = 0;
        Hours.current = 0;
        const Uhrzeit = new Date().toLocaleTimeString();
        dispatch(AddHistory({
            who: "All",
            message: `Timer resettet um ${Uhrzeit}`
        }));
    }

    const ToggelSound = () => {

    }

    return (
        <>
            <div className="SoundOnOff">
                {SoundStatus ?
                    <FaVolumeUp className="SoundOn" onClick={() => { setSoundStatus(false) }} />
                    :
                    <FaVolumeMute className="SoundOn" onClick={() => { setSoundStatus(true) }} />}
            </div>
            <div className="Timer">
                <div className="StartTimer">
                    {StartStop}
                </div>
                <div className="Time">
                    <div id="RenderedHours">{RenderedHours < 10 ? "0" + RenderedHours : RenderedHours}</div>
                    <div className="Doppelpunkt">:</div>
                    <div id="RenderedMinutes">{RenderedMinutes < 10 ? "0" + RenderedMinutes : RenderedMinutes}</div>
                    <div className="Doppelpunkt">:</div>
                    <div id="RenderedSeconds">{RenderedSeconds < 10 ? "0" + RenderedSeconds : RenderedSeconds}</div>
                </div>
                <div className="StartTimer">
                    {TimerStarted ? <FaStop cursor={"pointer"} onClick={ResetTimer} /> : ""}
                </div>
            </div>
            <div className="Players">

                <div className="Player1">
                    <div className={HealthColor.Player1}>
                        {InitialHealth.Player1}
                        <hr />
                    </div>
                    <div className="PlayerOptions">
                        <div className="PlusHealth"
                            onClick={() => {
                                LP({
                                    who: "P1",
                                    howmuch: parseInt(Calculator),
                                    negative: false
                                }
                                )
                            }}>
                            <FaPlus fontSize={"xx-large"} />
                        </div>
                        <div className="MinusHealth"
                            onClick={() => {
                                LP({
                                    who: "P1",
                                    howmuch: parseInt(Calculator),
                                    negative: true
                                }
                                )
                            }}>
                            <FaMinus fontSize={"xx-large"} />
                        </div>
                    </div>
                </div>

                <div className="Player2">
                    <div className="HealthStatus">
                        {InitialHealth.Player2}
                        <hr />
                    </div>
                    <div className="PlayerOptions">
                        <div className="PlusHealth"
                            onClick={() => {
                                LP({
                                    who: "P2",
                                    howmuch: parseInt(Calculator),
                                    negative: false
                                }
                                )
                            }}>
                            <FaPlus fontSize={"xx-large"} />
                        </div>
                        <div className="MinusHealth"
                            onClick={() => {
                                LP({
                                    who: "P2",
                                    howmuch: parseInt(Calculator),
                                    negative: true
                                }
                                )
                            }}>
                            <FaMinus fontSize={"xx-large"} />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}