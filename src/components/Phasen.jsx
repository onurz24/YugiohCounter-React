import React, { useState } from 'react';

export const Phasen = () => {
    let [CurrentPhase, setCurrentPhase] = useState("Draw");
    return (
        <div id="PhasenWrapper">
            <div
                onClick={() => { setCurrentPhase("Draw") }}
                className={CurrentPhase === "Draw" ? "ActivePhase Phasen" : "Phasen"}>
                Draw Phase
            </div>
            <div
                onClick={() => { setCurrentPhase("Standby") }}
                className={CurrentPhase === "Standby" ? "ActivePhase Phasen" : "Phasen"}>
                Standby Phase
            </div>
            <div
                onClick={() => { setCurrentPhase("Main1") }}
                className={CurrentPhase === "Main1" ? "ActivePhase Phasen" : "Phasen"}>
                Main Phase 1
            </div>
            <div
                onClick={() => { setCurrentPhase("Battle") }}
                className={CurrentPhase === "Battle" ? "ActivePhase Phasen" : "Phasen"}>
                Battle Phase
            </div>
            <div
                onClick={() => { setCurrentPhase("Main2") }}
                className={CurrentPhase === "Main2" ? "ActivePhase Phasen" : "Phasen"}>
                Main Phase 2
            </div>
            <div
                onClick={() => { setCurrentPhase("End") }}
                className={CurrentPhase === "End" ? "ActivePhase Phasen" : "Phasen"}>
                End Phase
            </div>
        </div>
    )
}