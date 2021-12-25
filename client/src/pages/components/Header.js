import React from "react";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  render() {
    return (
      <header>
        <a href="/"><img className="title-image" src={"https://chicagomandir.org/static/media/midwest-logo.c6c0107b.png"} alt="BAPS Swaminarayan Sastha - Midwest" /></a>
      </header>
    );
  }
}
