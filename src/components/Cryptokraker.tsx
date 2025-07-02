import '../css/cryptokraker.css';
import excellent  from '../assets/excellent.png'
import python  from '../assets/python.png'
import cryptokraker  from '../assets/cryptoKraker.png'
import { useState } from 'react';

export default function Cryptokraker() {
  const script = [
    "'The best way to make money is with money'...",
    "I took it as a challenge to conjoin my computer science and finance background...",
    "Hence using Kraken API, cryptoKraker was born!...",
    "although I am yet to still make money...", 
    "this project serves as a reminder that anything is possible with code ✊🏼"
  ]
  const [step, setStep] = useState(0);

  const handleNext = () => {
    setStep(s => Math.min(s + 1, script.length - 1));
  };

  return (
    <div className="cryptokraker-box">
      <div className="excellent-box">
        <h1 className="excellent-text title-text"> Excellent Move! <img className="excellent-img" src={excellent}/> </h1>
      </div>

      <div className="cryptokraker-card">
        <div className="title-box">
          <h1 className="title-text white"> CryptoKraker Card </h1>
        </div>

        <div className = "top-box">
          <img className="cryptokraker" src={cryptokraker}/>
          <div className = "icon-box">
            <img className="icon"  onClick={() => window.open('https://docs.python.org/3/', '_blank')} src={python}/>
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
