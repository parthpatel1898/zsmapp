import React from "react";
import { Container, Grid, Input, Button, Divider, List, Dropdown, Message } from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isListVisible: false,
      showForm: false,
      addressSuggestions: [],
      phoneQuery: "",
      addressQuery: "",
      addressSelected: false,
      searchQuery: "",
      searchResults: [],
      redirect: false,
      selUser: -1
    };
  }

  componentDidMount() {
    
  }

  handleAutofillAddress(query) {
    this.setState({addressSelected: false});
    this.setState({addressQuery: query});
    if (query.length >= 5) {
      let url = `/api/users/searchAddress/${query}`;
      axios.get(url).then((res) => {
        this.setState({addressSuggestions: []});
        res.data.data.forEach(address => {
          this.setState({ addressSuggestions: [...this.state.addressSuggestions, {value: address.Address, text: address.Address + ", " + address.City + ", " + address.State + " " + address.Zipcode}] })
        });
      });
    }
    else {
      this.setState({addressSuggestions: []});
    }
  }

  handleSearchAddress() {
    this.setState({searchQuery: this.state.addressQuery});
    let url = `/api/users/address/${this.state.addressQuery}`;
    axios.get(url).then((res) => {
      this.setState({addressQuery: ""});
      this.setState({isListVisible: true, searchResults: res.data.data});
    });
    
  }

  handleSearchPhone() {
    this.setState({searchQuery: this.state.phoneQuery});
    let url = `/api/users/searchPhone/${this.state.phoneQuery}`;
    axios.get(url).then((res) => {
      this.setState({phoneQuery: ""});
      this.setState({isListVisible: true, searchResults: res.data.data});
    });
  }

  handleOpen(id) {
    this.setState({selUser: id, redirect: true});
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={{
        pathname: '/form',
        state: { selUser: this.state.selUser }
      }} />
    }
    else {
      return (
        <div>
          <Header></Header>
          <Container>
            <div className="homePage">
              <Grid columns={2} divided stackable>
                <Grid.Row>
                  <Grid.Column className="searchCol">
                    <h2>By Phone Number</h2>
                    <Input type="number" placeholder="Ex: 123456790, only enter digits" value={this.state.phoneQuery} onChange={(event)=> {this.setState({phoneQuery: event.target.value})}} />
                    <Button primary disabled={this.state.phoneQuery.length < 7} onClick={() => this.handleSearchPhone()}>Search</Button>
                  </Grid.Column>
                  <Grid.Column className="searchCol">
                    <h2>By Home Address</h2>
                    <Dropdown
                      placeholder='Enter Address'
                      search
                      selection
                      value={this.state.addressQuery}
                      noResultsMessage={this.state.addressQuery.length > 5 ? "No results found" : "Type more characters for autofill options"}
                      onSearchChange={(event) => this.handleAutofillAddress(event.target.value)}
                      onChange={(event, data) => this.setState({addressQuery: data.value, addressSelected: true})}
                      options={this.state.addressSuggestions}
                    />
                    <Button disabled={!this.state.addressSelected} onClick={() => this.handleSearchAddress()} primary>Search</Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Divider></Divider>
              {this.state.isListVisible ? 
                <List divided relaxed>
                  <List.Item>
                    <List.Content className="searchQueryCont">
                      <List.Description as='p'><strong>Search Query: </strong>{this.state.searchQuery}</List.Description>
                      {this.state.searchResults.length === 0 ?
                        <List.Description as='p'>No results found :(</List.Description>
                      : ""}
                    </List.Content>
                  </List.Item>
                    
                  {this.state.searchResults.map((user) => {
                    return (
                      <List.Item key={user.id}>
                        <List.Content as='a' onClick={() => {this.handleOpen(user.id)}}>
                          <List.Header as='p'>{user.First_Name + " " + user.Last_Name}</List.Header>
                          <List.Description as='p'><strong>Zone: </strong>{user.Zone_Name}</List.Description>
                          <List.Description as='p'><strong>Phone Number: </strong>{user.Cell_Phone}</List.Description>
                          <List.Description as='p'><strong>Email: </strong>{user.Email}</List.Description>
                          <List.Description as='p'><strong>Address: </strong>{user.Address + ", " + user.City + ", " + user.State + " " + user.Zipcode}</List.Description>
                        </List.Content>
                      </List.Item>
                    );
                  })}
                </List>
              : ""}
            </div>
          </Container>
          <Footer></Footer>
        </div>
        
      );
    }
  }
}
