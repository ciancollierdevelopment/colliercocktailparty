import React, { Component } from 'react';
import MenuItem from './components/MenuItem.jsx';
import NameBar from './components/NameBar.jsx';
import NameForm from './components/NameForm.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Alert} from 'reactstrap';
import axios from 'axios';
const cocktails = require('./Cocktails');

class App extends Component {
  state = {
    username: "",
    alert_visible: false,
    alert_color: "",
    alert_message: "",
    alert_heading: ""
  }

  changeName = (newName) => {
    this.setState({
      username: newName
    })
  }

  submitOrder = cocktail => {
    axios.post("/api/add", {name: this.state.username, order: cocktail})
      .then(res => {
        this.setState({alert_visible: true, alert_color: "success", alert_message: "Your order has been placed, see you at the party!", alert_heading: "Thanks! "})
      })
      .catch(err => {
        this.setState({alert_visible: true, alert_color: "danger", alert_message: "Your order didn't go through, please try again!", alert_heading: "Error: "})
      });
  }

  onDismiss = () => {
    this.setState({alert_visible: false});
  }

  render() {
    if (this.state.username != "") {
      return (
        <div className="App">
          <Alert className="alerts" color={this.state.alert_color} isOpen={this.state.alert_visible} toggle={this.onDismiss}>
            <strong>{this.state.alert_heading}</strong>{this.state.alert_message}
          </Alert>
          <NameBar name={this.state.username} handler={() => this.changeName("")} />
          <div className="row">
            {
              cocktails.map(cocktail => (
                <MenuItem key={cocktail.name} cocktail={cocktail} orderHandler={() => this.submitOrder(cocktail.name)} />
              ))
            }
          <div className="col-sm"></div>
        </div>
      </div>
    );
  }
  else {
    return <NameForm changeName={this.changeName} />
  }
  }
}

export default App;
