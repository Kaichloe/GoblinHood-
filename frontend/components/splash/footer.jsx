import React from 'react';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-left"></div>
      <div className="footer-center">
        <div className="footer-title">Break Free from Muggle-Fees</div>
        <div className="footer-subtitle">Make unlimited muggle-free trades in knuts, sickles and galleons with a Certifed Gringotts Trained Goblin! Join the GoblinHood today!
        </div>
        <div className="personal-links">
          <div>
            <a href="https://www.linkedin.com/in/kaiyip-ho-216230191/">
              <img className="linkedin" src="https://image.flaticon.com/icons/svg/1384/1384046.svg"
                width="35px"/>
            </a>
          </div>
          <br/>
          <div>
            <a className="github" href="https://github.com/Kaichloe">
              <img src="https://image.flaticon.com/icons/svg/1051/1051326.svg"
              width="35px"/>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-right"></div>
    </div>
  )
}

export default Footer;