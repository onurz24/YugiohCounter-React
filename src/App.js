import React,{useEffect,useState} from 'react';
import { Stars } from './components/Stars';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import { Players } from './components/Players';
import { Calculator } from './components/Calculator';
import { Gamble } from './components/Gamble';
import { Settings } from './components/Settings';
import { Token } from './components/Token';
import { History } from './components/History';
import { Start } from './components/Start';

export const App = () => {

  // const [Status,setStatus] = useState(false);
  const [Status,setStatus] = useState(false);
  const [SoundStatus,setSoundStatus] = useState(true);
  const [InitialHealth,setInitialHealth] = useState({
    Player1:8000,
    Player2:8000
});




  return (
    <BrowserRouter>
      <Routes>
        <Route 
            index
            element={<>
            <Start Status={Status} setStatus={setStatus}/>
        </>}
        />
        
        <Route 
            path='Game'
            exact
            element={<>
              <Stars Status={Status}/>
              <Players setSoundStatus={setSoundStatus} SoundStatus={SoundStatus} InitialHealth={InitialHealth} setInitialHealth={setInitialHealth}/>
              <Calculator setSoundStatus={setSoundStatus} SoundStatus={SoundStatus}/>
        </>}/>
        
        <Route 
            path='Gamble'
            exact
            element={<>
              <Stars/>
              <Players  setSoundStatus={setSoundStatus} SoundStatus={SoundStatus}InitialHealth={InitialHealth} setInitialHealth={setInitialHealth}/>
              <Gamble setSoundStatus={setSoundStatus} SoundStatus={SoundStatus}/>
        </>}/>
        <Route 
            path='History'
            exact
            element={<>
              <Stars/>
              <Players setSoundStatus={setSoundStatus} SoundStatus={SoundStatus} InitialHealth={InitialHealth} setInitialHealth={setInitialHealth}/>
              <History setSoundStatus={setSoundStatus} SoundStatus={SoundStatus}/>
        </>}/>
        <Route 
            path='Token'
            exact
            element={<>
              <Stars/>
              <Players setSoundStatus={setSoundStatus} SoundStatus={SoundStatus} InitialHealth={InitialHealth} setInitialHealth={setInitialHealth}/>
              <Token setSoundStatus={setSoundStatus} SoundStatus={SoundStatus}/>
        </>}/>
        <Route 
            path='Settings'
            exact
            element={<>
              <Stars/>
              <Players setSoundStatus={setSoundStatus} SoundStatus={SoundStatus} InitialHealth={InitialHealth} setInitialHealth={setInitialHealth}/>
              <Settings setStatus={setStatus} InitialHealth={InitialHealth} setInitialHealth={setInitialHealth}/>
        </>}/>

      </Routes>
    </BrowserRouter>
  );
}



