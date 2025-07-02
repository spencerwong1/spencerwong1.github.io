import '../css/linkedin.css';
import book  from '../assets/book.png'
import icon  from '../assets/external-link.png'
import linkedin  from '../assets/linkedin.png'
import { useState } from 'react';

export default function Linkedin() {
  const script = [
    "Visit my linkedin page to find out more about me!"
  ]
  const [step, setStep] = useState(0);

  const handleNext = () => {
    setStep(s => Math.min(s + 1, script.length - 1));
  };

  return (
    <div className="linkedin-box">
      <div className="book-box">
        <h1 className="book-text title-text"> Book Move! <img className="book-img" src={book}/> </h1>
      </div>

      <div className="linkedin-card">
        <div className="title-box">
          <h1 className="title-text white"> Linkedin Card </h1>
        </div>

        <div className = "top-box">
          <img className="linkedin" src={linkedin}/>
          <div className = "icon-box">
            <img className="icon"  onClick={() => window.open('https://www.linkedin.com/in/spencerwongg/', '_blank')} src={icon}/>
          </div>
        </div>
        
        <div className="info">
          <div className="text">
            [ Description ]
          </div>
          <div className="description-text">
            {script[step]}
          </div>
        </div>
      </div>
    </div>
  );
}
