import '../css/ezmail.css';
import great  from '../assets/great.png'
import icon  from '../assets/external-link.png'
import html  from '../assets/html.png'
import css  from '../assets/css.png'
import js  from '../assets/js.png'
import react  from '../assets/react.png'
import ezmail  from '../assets/ezmail.png'
import { useState } from 'react';

export default function Ezmail() {
  const script = [
    "Being a first gen Australian, english is not my parents' first language...",
    "I was pestered to write emails or make phone calls for a myriad of tasks...",
    "So I decided to use my coding skills to simplify emails for them...",
    "Utilising OpenAi API, This marked the birth of Ezmail! Made this for you Mum ❤️",
  ]
  const [step, setStep] = useState(0);

  const handleNext = () => {
    setStep(s => Math.min(s + 1, script.length - 1));
  };

  return (
    <div className="ezmail-box">
      <div className="great-box">
        <h1 className="great-text title-text"> Great Move! <img className="great-img" src={great}/> </h1>
      </div>

      <div className="ezmail-card">
        <div className="title-box">
          <h1 className="title-text white"> Ezmail Card </h1>
        </div>

        <div className = "top-box">
          <img className="ezmail" src={ezmail}/>
          <div className = "icon-box">
            <img className="icon"  onClick={() => window.open('https://react.dev/', '_blank')} src={react}/>
            <img className="icon"  onClick={() => window.open('https://html.spec.whatwg.org/', '_blank')} src={html}/>
            <img className="icon"  onClick={() => window.open('https://developer.mozilla.org/en-US/docs/Web/CSS', '_blank')} src={css}/>
            <img className="icon"  onClick={() => window.open('https://developer.mozilla.org/en-US/docs/Web/JavaScript', '_blank')} src={js}/>
            <img className="icon"  onClick={() => window.open('https://spencerwong1.github.io/ezmail/', '_blank')} src={icon}/>
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
