import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { Route, BrowserRouter as Router } from "react-router-dom";

import 'semantic-ui/dist/semantic.min.css'
import "./pages/assets/Style.scss";

// Custom Components
import Home from "./pages/Home";
import Form from "./pages/ZSM-Form";
import FormSubmission from "./pages/Form-Submission";

import ScrollIntoView from "./pages/components/ScrollInToView";
// import TeacherAttendance from "./pages/TeacherAttendance";


const routing = (
  <Router>
    <div>
      <ScrollIntoView>
        <Route exact path="/" component={Home} />
        <Route path="/form" component={Form} />
        <Route path="/submit" component={FormSubmission} />
      </ScrollIntoView>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
