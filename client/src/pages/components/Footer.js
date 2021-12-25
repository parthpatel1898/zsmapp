import React from "react";

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  render() {
    return (
      <footer>
        <div className="footer-content-container">
          <img className="footer-image" src={"https://chicagomandir.org/static/media/psm-logo-msm-WHITE.2e3cb4d0.png"} alt="BAPS Swaminarayan Sanstha - Midwest" />
          <div className="footer-charity-text-container">
            <p>&copy; {(new Date().getFullYear())} BAPS Swaminarayan Sanstha. All Rights Reserved.</p>
            <p>
              1851 S IL Route 59 Pramukh Swami Rd Bartlett, IL 60103-3008 USA
            </p>
          </div>
        </div>
      </footer>
    );
  }
}
