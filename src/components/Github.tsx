import '../css/github.css';
import book  from '../assets/book.png'
import icon  from '../assets/external-link.png'
import github  from '../assets/github.png'
import { useState } from 'react';

export default function Github() {
  const script = [
    "Visit my github page to find out more about me and my projects!"
  ]
  const [step, setStep] = useState(0);

  const handleNext = () => {
    setStep(s => Math.min(s + 1, script.length - 1));
  };

  return (
    <div className="github-box">
      <div className="book-box">
        <h1 className="book-text title-text"> Book Move! <img className="book-img" src={book}/> </h1>
      </div>

      <div className="github-card">
        <div className="title-box">
          <h1 className="title-text white"> github Card </h1>
        </div>

        <div className = "top-box">
          <img className="github" src={github}/>
          <div className = "icon-box">
            <img className="icon"  onClick={() => window.open('https://github.com/spencerwong1', '_blank')} src={icon}/>
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
