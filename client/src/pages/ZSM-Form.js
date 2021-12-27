import React from "react";
import { Form, TextArea, Button, Select, Dropdown, Table, Checkbox, Container, List, Grid, Divider } from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';
import Header from './components/Header'
import Footer from './components/Footer'
import Constants from './Constants'

export default class ZSMForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currUser: {},
      submitSuccess: false
    };
  }

  componentDidMount() {
    if (this.props.location.state && this.props.location.state.selUser) {
      let url = `/api/users/${this.props.location.state.selUser}`;
      axios.get(url).then((res) => {
        this.setState({currUser: res.data.data[0]});
      });
    }
  }

  getAvailabilityValues(day, time) {
    let avail_days = this.state.currUser["Seva_Availability_" + time].split(",");
    if (avail_days.includes(day)) {
      return true;
    }
    else {
      return false;
    }
  }

  sortDays(a,b){
    var daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b); // basic sort function that compares the indexes of the two days
  }

  setAvailabilityValues(day, time, data) {
    var avail_days = this.state.currUser["Seva_Availability_" + time].split(",");
    if (data.checked) {
      avail_days.push(day);
    }
    else {
      avail_days.splice(avail_days.indexOf(day), 1);
    }
    this.setState({currUser: {...this.state.currUser, ["Seva_Availability_"+time] : avail_days.sort(this.sortDays).toString() }});
  }

  handleSubmit() {
    let body = {
      currUser: this.state.currUser
    }
    let url = `/api/users/${this.props.location.state.selUser}`;
    axios.put(url, body).then((res) => {
      if (res.data.data) {
        this.setState({submitSuccess: true});
      }
    });
  }

  render() {
    if (!this.props.location.state || !this.props.location.state.selUser) {
      return <Redirect to="/" />
    }
    else if (this.state.submitSuccess) {
      return <Redirect push to={{
        pathname: '/submit',
        state: { submitSuccess: true}
      }} />
    } else {
      return (
        <div>
          <Header></Header>
          <Container>
            {Object.keys(this.state.currUser).length > 0 ?
              <div className="formPage">
                <List>
                  <List.Item>
                    <List.Content as='div'>
                      <List.Header as='h1'>{this.state.currUser.First_Name + " " + this.state.currUser.Last_Name}</List.Header>
                      <Grid columns={2} divided stackable className="headerCol">
                        <Grid.Row>
                          <Grid.Column className="searchCol">
                            <List.Description as='p'><strong>Phone: </strong>{this.state.currUser.Cell_Phone}</List.Description>
                            <List.Description as='p'><strong>Email: </strong>{this.state.currUser.Email}</List.Description>
                          </Grid.Column>
                          <Grid.Column className="searchCol">
                          <List.Description as='p'><strong>Zone: </strong>{this.state.currUser.Zone_Name}</List.Description>
                            <List.Description as='p'><strong>Address: </strong>{this.state.currUser.Address + ", " + this.state.currUser.City + ", " + this.state.currUser.State + " " + this.state.currUser.Zipcode}</List.Description>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </List.Content>
                  </List.Item>
                </List>
                <Divider></Divider>
              
                <Form className="formCont">
                  <Form.Field
                    id='form-textarea-control-current-seva'
                    control={TextArea}
                    label='Current Seva:'
                    value={this.state.currUser.Seva}
                    onChange={(event) => this.setState({currUser: {...this.state.currUser, Seva: event.target.value}})}
                    placeholder="Please type 'None' if you do not currently have an assigned seva"
                  />
                  <Form.Group widths='equal'>
                    <Form.Field
                      control={Select}
                      options={Constants.workStatusOptions}
                      label={{ children: 'Work Status:', htmlFor: 'form-select-control-work-status' }}
                      value={this.state.currUser.Work_Status}
                      onChange={(event, data) => this.setState({currUser: {...this.state.currUser, Work_Status: data.value}})}
                      placeholder='Work Status'
                      search
                      searchInput={{ id: 'form-select-control-work-status' }}
                    />
                    <Form.Field
                      control={Select}
                      options={Constants.occupationOptions}
                      label={{ children: 'Occupation:', htmlFor: 'form-select-control-work-schedule' }}
                      placeholder='Occupation'
                      value={this.state.currUser.Occupation}
                      onChange={(event, data) => this.setState({currUser: {...this.state.currUser, Occupation: data.value}})}
                      search
                      searchInput={{ id: 'form-select-control-work-schedule' }}
                    />
                  </Form.Group>
      
                  <Form.Field className="avail-table">
                    <label>Availability for Seva:</label>
                    <Table celled unstackable>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell></Table.HeaderCell>
                          <Table.HeaderCell>Mon</Table.HeaderCell>
                          <Table.HeaderCell>Tue</Table.HeaderCell>
                          <Table.HeaderCell>Wed</Table.HeaderCell>
                          <Table.HeaderCell>Thu</Table.HeaderCell>
                          <Table.HeaderCell>Fri</Table.HeaderCell>
                          <Table.HeaderCell>Sat</Table.HeaderCell>
                          <Table.HeaderCell>Sun</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
      
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>Morning</Table.Cell>
                          <Table.Cell><Checkbox checked={this.getAvailabilityValues("Monday", "Morning")} onChange={(event, data) => this.setAvailabilityValues('Monday', 'Morning', data)}/></Table.Cell>
                          <Table.Cell><Checkbox checked={this.getAvailabilityValues("Tuesday", "Morning")} onChange={(event, data) => this.setAvailabilityValues('Tuesday', 'Morning', data)}/></Table.Cell>
                          <Table.Cell><Checkbox checked={this.getAvailabilityValues("Wednesday", "Morning")} onChange={(event, data) => this.setAvailabilityValues('Wednesday', 'Morning', data)}/></Table.Cell>
                          <Table.Cell><Checkbox checked={this.getAvailabilityValues("Thursday", "Morning")} onChange={(event, data) => this.setAvailabilityValues('Thursday', 'Morning', data)}/></Table.Cell>
                          <Table.Cell><Checkbox checked={this.getAvailabilityValues("Friday", "Morning")} onChange={(event, data) => this.setAvailabilityValues('Friday', 'Morning', data)}/></Table.Cell>
                          <Table.Cell><Checkbox checked={this.getAvailabilityValues("Saturday", "Morning")} onChange={(event, data) => this.setAvailabilityValues('Saturday', 'Morning', data)}/></Table.Cell>
                          <Table.Cell><Checkbox checked={this.getAvailabilityValues("Sunday", "Morning")} onChange={(event, data) => this.setAvailabilityValues('Sunday', 'Morning', data)}/></Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>Afternoon</Table.Cell>
                          <Table.Cell><Checkbox checked={this.getAvailabilityValues("Monday", "Afternoon")} onChange={(event, data) => this.setAvailabilityValues('Monday', 'Afternoon', data)}/></Table.Cell>
                          <Table.Cell><Checkbox checked={this.getAvailabilityValues("Tuesday", "Afternoon")} onChange={(event, data) => this.setAvailabilityValues('Tuesday', 'Afternoon', data)}/></Table.Cell>
                          <Table.Cell><Checkbox checked={this.getAvailabilityValues("Wednesday", "Afternoon")} onChange={(event, data) => this.setAvailabilityValues('Wednesday', 'Afternoon', data)}/></Table.Cell>
                          <Table.Cell><Checkbox checked={this.getAvailabilityValues("Thursday", "Afternoon")} onChange={(event, data) => this.setAvailabilityValues('Thursday', 'Afternoon', data)}/></Table.Cell>
                          <Table.Cell><Checkbox checked={this.getAvailabilityValues("Friday", "Afternoon")} onChange={(event, data) => this.setAvailabilityValues('Friday', 'Afternoon', data)}/></Table.Cell>
                          <Table.Cell><Checkbox checked={this.getAvailabilityValues("Saturday", "Afternoon")} onChange={(event, data) => this.setAvailabilityValues('Saturday', 'Afternoon', data)}/></Table.Cell>
                          <Table.Cell><Checkbox checked={this.getAvailabilityValues("Sunday", "Afternoon")} onChange={(event, data) => this.setAvailabilityValues('Sunday', 'Afternoon', data)}/></Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>Evening</Table.Cell>
                          <Table.Cell><Checkbox checked={this.getAvailabilityValues("Monday", "Evening")} onChange={(event, data) => this.setAvailabilityValues('Monday', 'Evening', data)}/></Table.Cell>
                          <Table.Cell><Checkbox checked={this.getAvailabilityValues("Tuesday", "Evening")} onChange={(event, data) => this.setAvailabilityValues('Tuesday', 'Evening', data)}/></Table.Cell>
                          <Table.Cell><Checkbox checked={this.getAvailabilityValues("Wednesday", "Evening")} onChange={(event, data) => this.setAvailabilityValues('Wednesday', 'Evening', data)}/></Table.Cell>
                          <Table.Cell><Checkbox checked={this.getAvailabilityValues("Thursday", "Evening")} onChange={(event, data) => this.setAvailabilityValues('Thursday', 'Evening', data)}/></Table.Cell>
                          <Table.Cell><Checkbox checked={this.getAvailabilityValues("Friday", "Evening")} onChange={(event, data) => this.setAvailabilityValues('Friday', 'Evening', data)}/></Table.Cell>
                          <Table.Cell><Checkbox checked={this.getAvailabilityValues("Saturday", "Evening")} onChange={(event, data) => this.setAvailabilityValues('Saturday', 'Evening', data)}/></Table.Cell>
                          <Table.Cell><Checkbox checked={this.getAvailabilityValues("Sunday", "Evening")} onChange={(event, data) => this.setAvailabilityValues('Sunday', 'Evening', data)}/></Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </Form.Field>
      
                  <Form.Field>
                    <label>Skills:</label>
                    <Dropdown placeholder='Skills' fluid multiple selection options={Constants.skills} 
                              value={this.state.currUser.Skills.split(",")}
                              onChange={(event, data) => this.setState({currUser: {...this.state.currUser, Skills: data.value.toString()}})}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Interests:</label>
                    <Dropdown placeholder='Interests' fluid multiple selection options={Constants.skills} 
                              value={this.state.currUser.Interests.split(",")}
                              onChange={(event, data) => this.setState({currUser: {...this.state.currUser, Interests: data.value.toString()}})}
                    />
                  </Form.Field>
      
                  <Form.Group widths='equal'>
                    <Form.Input fluid label='Date of Birth:' type="date" 
                                value={this.state.currUser.DOB}
                                onChange={(event) => this.setState({currUser: {...this.state.currUser, DOB: event.target.value}})}
                    />
                    <Form.Field
                      control={Select}
                      options={Constants.tshirtOptions}
                      label={{ children: 'Shirt Size:', htmlFor: 'form-select-control-tshirt-options' }}
                      placeholder='Adult Sizes'
                      search
                      searchInput={{ id: 'form-select-control-tshirt-options' }}
                      value={this.state.currUser.Shirt_Size}
                      onChange={(event, data) => this.setState({currUser: {...this.state.currUser, Shirt_Size: data.value}})}
                    />
                  </Form.Group>
                  <Form.Input fluid label='Specialized Skills &amp; Licenses:' placeholder="Please type 'None' if you don't have any"
                              value={this.state.currUser.Licenses}
                              onChange={(event) => this.setState({currUser: {...this.state.currUser, Licenses: event.target.value}})} 
                  />
                  <Button onClick={() => {window.location.href="/"}}>Back</Button>
                  <Button onClick={() => this.handleSubmit()} primary>Submit</Button>
                </Form>
              </div>
            : ""}
          </Container>
          <Footer></Footer>
        </div>
      );
    }
  }
}
