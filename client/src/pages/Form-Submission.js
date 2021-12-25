import React from "react";
import { Container, Message, Button } from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Header from './components/Header'
import Footer from './components/Footer'

export default class FormSubmission extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    
  }

  render() {
    if (!this.props.location.state || !this.props.location.state.submitSuccess) {
      return <Redirect to="/" />
    } else {
      return (
        <div>
          <Header></Header>
          <Container>
            <div className="submit-page">
                <Message positive>
                    <Message.Header>Jay Swaminarayan, your response has been submitted.</Message.Header>
                    <p>You will be reached out by a <b>karyakar</b> soon.</p>
                    <br/>
                    <Button onClick={() => {window.location.href="/"}} primary>Go back to Home</Button>
                </Message>
            </div>
          </Container>
          <Footer></Footer>
        </div>
      );
    }
  }
}
