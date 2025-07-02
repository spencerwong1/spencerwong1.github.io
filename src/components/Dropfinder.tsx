import '../css/dropfinder.css';
import best  from '../assets/best.png'
import icon  from '../assets/external-link.png'
import html  from '../assets/html.png'
import css  from '../assets/css.png'
import js  from '../assets/js.png'
import dropfinder  from '../assets/dropfinder2.png'
import { useState } from 'react';

export default function Dropfinder() {
  const script = [
    'Being my first project, I wanted to curate an original application that was useful...',
    'I found myself constantly trying to time my workout sets to the beatdrop of songs...',
    "or skipping to find the melody/beatdrop of a friend's recommendation...",
    "who the has time to actually listen to an entire song before giving it a rating? 😆",
    "That’s how Dropfinder came to life!"
  ]
  const [step, setStep] = useState(0);

  const handleNext = () => {
    setStep(s => Math.min(s + 1, script.length - 1));
  };

  return (
    <div className="dropfinder-box">
      <div className="best-box">
        <h1 className="best-text title-text"> Best Move! <img className="best-img" src={best}/> </h1>
      </div>

      <div className="dropfinder-card">
        <div className="title-box">
          <h1 className="title-text white"> Dropfinder Card </h1>
        </div>

        <div className = "top-box">
          <img className="dropfinder" src={dropfinder}/>
          <div className = "icon-box">
            <img className="icon"  onClick={() => window.open('https://html.spec.whatwg.org/', '_blank')} src={html}/>
            <img className="icon"  onClick={() => window.open('https://developer.mozilla.org/en-US/docs/Web/CSS', '_blank')} src={css}/>
            <img className="icon"  onClick={() => window.open('https://developer.mozilla.org/en-US/docs/Web/JavaScript', '_blank')} src={js}/>
            <img className="icon"  onClick={() => window.open('https://spencerwong1.github.io/dropfinder/', '_blank')} src={icon}/>
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
