import '../css/chess.css';
import good  from '../assets/good.png'
import vite  from '../assets/vite.png'
import ts  from '../assets/ts.png'
import chess  from '../assets/chess.png'
import js  from '../assets/js.png'
import css  from '../assets/css.png'
import { useState } from 'react';

export default function Chess() {
  const script = [
    "I wanted to build a website to showcase my portfolio and personality...",
    "So I thought why not make it interactable, engaging and fun...",
    "Welcome to my chessboard! Hope you enjoy 😁"
  ]

  const [step, setStep] = useState(0);

  const handleNext = () => {
    setStep(s => Math.min(s + 1, script.length - 1));
  };

  return (
    <div className="chess-box">
      <div className="good-box">
        <h1 className="good-text title-text"> Good Move! <img className="good-img" src={good}/> </h1>
      </div>

      <div className="chess-card">
        <div className="title-box">
          <h1 className="title-text white"> Chess Card </h1>
        </div>

        <div className = "top-box">
          <img className="chess" src={chess}/>
          <div className = "icon-box">
            <img className="icon"  onClick={() => window.open('https://vite.dev/guide/', '_blank')} src={vite}/>
            <img className="icon"  onClick={() => window.open('https://devdocs.io/typescript~5.1/', '_blank')} src={ts}/>
            <img className="icon"  onClick={() => window.open('https://developer.mozilla.org/en-US/docs/Web/JavaScript', '_blank')} src={js}/>
            <img className="icon"  onClick={() => window.open('https://developer.mozilla.org/en-US/docs/Web/CSS', '_blank')} src={css}/>
          </div>
        </div>
        
        <div className="info">
          <div className="text">
            [ Description ]
          </div>
          <div className="description-text">
            {script[step]}
          </div>
          {step < script.length - 1 && (
            <button className="next" onClick={handleNext}>
              ▼
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
